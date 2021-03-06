const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const db = require('./database/configuration.js')
const queries = require('./database/queries')
const user = require('./database/user')
const bcrypt = require('bcrypt')

const port = 3005

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(cookieSession({
  name: 'user-session',
  keys: ['key1', 'key2'],
  maxAge: 0 * 60 * 60 * 1000
}))

app.use(express.static(path.join(__dirname, 'public')))
app.locals.basedir = path.join(__dirname, 'views')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.render('index', {title: 'Welcome Stranger'})
})

app.get('/signup', (request, response) => {
  response.render('signup')
})

app.post('/signup', (request, res) => {
  if(!user.passwordCompare(request.body.password, request.body.confirmPassword)) {
    res.render('signup', {error: 'Passwords do not match'})
    return
  }
  if(!user.absentCredentials(request.body.password, request.body.confirmPassword)) {
    res.render('signup', {error: 'Please provide an email and password'})
    return
  }
  const newUser = {
    email: request.body.email,
    password: request.body.password
  }
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    queries.signUp(newUser)
    .then(() => {
      newUser.password = hash
      request.session.user = newUser.email
      res.render('index', {title: 'Thanks for signing up ' + newUser.email, userEmail: newUser.email})
    })
  })
})

app.get('/login', (request, response) => {
  response.render('login')
})

app.post('/login', (request, response) => {
  if(!request.body.email || ! request.body.password) {
    response.render('login', {error: 'Please enter an username and password'})
    return
  }
  const userEmail = request.body.email
  const userPassword = request.body.password
  queries.getHash(userEmail)
  .then(hash => {
    bcrypt.compare(userPassword, hash.password, function(err, res) {
      if(err) {
        response.render('login', {error: 'Incorrect username or password'})
        return
      }
      request.session.user = userEmail
      response.render('index', {userEmail: userEmail})
    })
  })
})

app.get('/logout', (request, response) => {
  request.session = null
  response.clearCookie('user-session')
  response.redirect('/')
})

app.use(queries.checkUserSession)

app.get('/home', (request, res) => {
  request.session.user.forEach(session => {
    const userEmail = session.email
    res.render('index', {title: 'Welcome back ' + userEmail})
  })
})

app.listen(port, () => console.log('Listening on port: ' + port))

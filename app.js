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
  if(user.passwordCompare(request.body.password, request.body.confirmPassword)) {
    if(request.body.email.includes('@')) {
      const newUser = {
        email: request.body.email,
        password: request.body.password
      }
      bcrypt.hash(newUser.password, 10, function(err, hash) {
        newUser.password = hash
        request.session.user = newUser.email
        queries.signUp(newUser)
      })
      res.render('index', {title: 'Thanks for signing up ' + newUser.email, userEmail: newUser.email})
    } else if(request.body.email.length == 0 || request.body.password.length == 0) {
        res.render('signup', {error: 'Please provide an email and a password to sign up'})
    } else {
      res.render('signup', {error: 'Please provide an email and a password to sign up'})
    }
  } else {
    res.render('signup', {error: 'Passwords do not match'})
  }
})

app.get('/login', (request, response) => {
  response.render('login')
})

app.post('/login', (request, response) => {
  if(!request.body.email || ! request.body.password) {
    response.render('login', {error: 'Incorrect username or password'})
    response.end
  }
  var userEmail = request.body.email
  var userPassword = request.body.password
  queries.getHash(userEmail)
  .then(hashPassword => {
    bcrypt.compare(userPassword, hashPassword.password, function(err, res) {
      if(res) {
        queries.confirmLogin(userEmail, hashPassword.password)
        .then(user => {
          userEmail = user.email
          request.session.user = userEmail
          response.render('index', {userEmail: request.session.user})
        })
      } else {
        response.render('login', {error: 'Incorrect username or password'})
      }
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

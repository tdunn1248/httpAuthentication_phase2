const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./database/configuration.js')
const queries = require('./database/queries')
const user = require('./database/user')
const pug = require('pug-cli')

const port = 3005

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.locals.basedir = path.join(__dirname, 'views')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // res.status(500)
  res.render('index', {title: 'Welcome Back Stranger'})
})

app.get('/signup', (req, res) => {
  res.render('signup')
})
app.post('/signup', (req, res) => {
  if(queries.passwordCompare(req.body.password, req.body.confirmPassword)) {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }
    queries.signUp(newUser)
    res.render('index', {title: 'Thanks for signing up username'})
  } else {
    // res.status(400)
    res.render('signup', {error: 'Passwords do not match'})
  }
})

app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/login', (req, res) => {
  queries.confirmPassword(req.body.email, req.body.password)
  .then((confirmed) => {
    if(confirmed) {
      res.render('index' , {title: 'Welcome back username' })
    } else {
      console.log(req.body.email);
      if(req.body.email == undefined || req.body.password == undefined) {
        res.render('login', {error: 'Incorrect email or password'})
      } else {
          res.render('login', {error: 'Please provide an email and a password to login'})
      }
    }
  })
})

app.listen(port, () => {
  console.log('Listening on port: ' + port)
})

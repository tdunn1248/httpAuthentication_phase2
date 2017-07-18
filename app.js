const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./database/configuration.js')
const queries = require('./database/queries')
const pug = require('pug-cli')

const port = 3005

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index')
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
    res.redirect('/')
  } else {
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
      res.render('index')
    } else {
      res.render('login', {error: 'Please provide an email and a password to login'})
    }
  })
})

app.listen(port, () => {
  console.log('Listening on port: ' + port)
})

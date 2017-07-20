const db = require('./configuration.js')

function signUp(user) {
  return db.none('INSERT INTO users(id, email, password) VALUES(default, $1, $2)', [user.email, user.password])
  .then(() => {
    console.log('User created')
  })
  .catch(error => {
    console.log(error.name)
    console.log(error.message);
  })
}

function getHash(email) {
    return db.oneOrNone("SELECT password FROM users WHERE email = $1", [email])
    .then(hashPassword => hashPassword)
}

function checkUserSession(req, res, next) {
  (!req.session.user) ? res.status(302).redirect('/login') : next()
}

module.exports = {signUp, checkUserSession, getHash}

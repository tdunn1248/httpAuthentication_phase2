const db = require('./configuration.js')

function signUp(user) {
  return db.none('INSERT INTO users VALUES(default, $1, $2)', [user.email, user.password])
  .then(() => {
    console.log('User created')
  })
  .catch(error => {
    console.log(error.name)
    console.log(error.message);
  })
}

function passwordCompare(password, confirmPassword) {
  return (password === confirmPassword) ? true : false
}

function confirmPassword(email, password) {
  return db.any("SELECT * FROM users WHERE users.email = $1 AND users.password = $2", [email, password])
  .then((user) => {
    if(user.length === 0 ) {
      return false
    } else {
      return true
    }
  })
}

module.exports = {signUp, passwordCompare, confirmPassword}

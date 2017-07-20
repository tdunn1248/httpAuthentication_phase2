const db = require('./configuration.js')

function passwordCompare(password, confirmPassword) {
  return (password === confirmPassword) ? true : false
}

function authEmail(email) {
  return db.any("SELECT * FROM users WHERE users.email = $1", [email])
  .then((user) => user ? true : false)
}

function absentCredentials(email, password) {
  return email && email.length !==0 && password && password.length !==0
}

module.exports = {passwordCompare, authEmail, absentCredentials}

// function emptyFields(email, password, confirmPassword) {
//   if(email.length == 0 || password.length == 0 || confirmPassword.length == 0) {
//     // all three fields empty
//   } else if ()
// }

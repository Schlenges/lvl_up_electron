const db = require('./config/db')

exports.getAll = () => new Promise((resolve, reject) => (
  db.all("SELECT * FROM skills", (err, rows) => {
    if(err) reject(err)
    else resolve(rows)
  })
))

module.exports = exports

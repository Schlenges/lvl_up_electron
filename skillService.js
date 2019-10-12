const db = require('./config/db')

exports.getAll = () => new Promise((resolve, reject) => (
  db.all("SELECT * FROM skills", (err, rows) => {
    if(err) reject(err)
    else resolve(rows)
  })
))

exports.add = (skill) => new Promise((resolve, reject) => (
  db.run("INSERT INTO skills(name) VALUES(?)", [skill], function(err) {
    if(err) reject(err)
    else resolve(this.lastID)
  })
))

module.exports = exports

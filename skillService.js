const db = require('./config/db')

exports.getAll = () => new Promise((resolve, reject) => (
  db.all("SELECT * FROM skills", (err, rows) => {
    if(err) reject(err)
    else resolve(rows)
  })
))

exports.add = ({name, maxLvl}) => new Promise((resolve, reject) => (
  db.run("INSERT INTO skills(name, max_lvl) VALUES(?, ?)", [name, maxLvl], function(err) {
    if(err) reject(err)
    else resolve(this.lastID)
  })
))

module.exports = exports

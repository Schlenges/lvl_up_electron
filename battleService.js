const db = require('./config/db')

exports.getAll = () => new Promise((resolve, reject) => (
  db.all("SELECT * FROM battles", (err, rows) => {
    if(err) reject(err)
    else resolve(rows)
  })
))

exports.getBySkill = (skillId) => new Promise((resolve, reject) => (
  db.all(`SELECT * FROM battles WHERE skill_id = ${skillId}`, (err, rows) => {
    if(err) reject(err)
    else resolve(rows)
  })
))

module.exports = exports
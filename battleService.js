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

exports.add = ({description, xp, skill_id}) => new Promise((resolve, reject) => (
  db.run("INSERT INTO battles (description, xp, skill_id) VALUES (?, ?, ?)", 
    [description, xp, skill_id], function(err) {
      if(err) reject(err)
      else resolve(this.lastID)
  })
))

module.exports = exports
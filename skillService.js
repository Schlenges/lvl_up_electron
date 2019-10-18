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

getById = (id) => new Promise((resolve, reject) => (
  db.get("SELECT * FROM skills WHERE id = ?", [id], (err, row) => {
    if(err) reject(err)
    else resolve(row)
  })
))

exports.updateXP = (xp, skillId) => new Promise((resolve, reject) => {
  _checkLvlUp(xp, skillId)
    .then(({newXp, newLvl}) => db.run(`
      UPDATE skills 
      SET curr_xp = ?, 
          curr_lvl = ? 
      WHERE id = ?
    `, [newXp, newLvl, skillId], (err) => {
      if(err) reject(err)
      else resolve({newXp, newLvl})
    }))
})

_checkLvlUp = (xp, skillId) => (
  getById(skillId)
    .then(skill => {
      let newXp = skill.curr_xp + xp
      let newLvl = skill.curr_lvl

      if(newXp >= 100){
        newLvl + 1 >= skill.max_lvl ? (newLvl = skill.max_lvl, newXp = 100) : (newLvl++, newXp -= 100)
      }

      return {newXp, newLvl}
    })
    .catch(err => console.log(err))
)

module.exports = exports

const sqlite3 = require('sqlite3').verbose()

db = new sqlite3.Database(':memory:', (err) => {
  if (err) return console.error(err.message)
  console.log('db connected')
})

/* exports.dbSetup = (db) => {
  let insertData = [
    "Programming",
    "Guitar",
    "Cooking"
  ]
  
  db.serialize(() => {
    db.run("CREATE TABLE skills (id INT, skill TEXT)")
  
    let sql = db.prepare("INSERT INTO skills VALUES (?, ?)")
    insertData.map((skill, i) => sql.run(i, skill))
    sql.finalize()
  })
} */

module.exports = db
const dbSetup = (db) => {
  let insertData = [
    "Programming",
    "Guitar",
    "Cooking"
  ]
  
  db.serialize(() => {
    db.run("CREATE TABLE skills (id INTEGER PRIMARY KEY, name TEXT)")
  
    let sql = db.prepare("INSERT INTO skills (name) VALUES (?)")
    insertData.map((skill) => sql.run(skill))
    sql.finalize()
  })
  
}

module.exports = dbSetup

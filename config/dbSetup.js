const dbSetup = (db) => {
  let insertData = [
    "Programming",
    "Guitar",
    "Cooking"
  ]
  
  db.serialize(() => {
    db.run("CREATE TABLE skills (id INT, name TEXT)")
  
    let sql = db.prepare("INSERT INTO skills VALUES (?, ?)")
    insertData.map((skill, i) => sql.run(i, skill))
    sql.finalize()
  })
  
}

module.exports = dbSetup

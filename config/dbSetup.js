const dbSetup = (db) => {
  let insertData = [
    {
      name: "JavaScript",
      curr_lvl: 5,
      max_lvl: 15,
      curr_xp: 100
    },
    {
      name: "Guitar",
      curr_lvl: 1,
      max_lvl: 10,
      curr_xp: 10
    },
    {
      name: "Pottery",
      curr_lvl: 0,
      max_lvl: 10,
      curr_xp: 40
    }
  ]
  
  db.serialize(() => {
    db.run(`CREATE TABLE skills (
      id INTEGER PRIMARY KEY NOT NULL, 
      name TEXT NOT NULL,
      curr_lvl INTEGER NOT NULL DEFAULT 0,
      max_lvl INTEGER NOT NULL,
      curr_xp INTEGER NOT NULL DEFAULT 0
      )`
    )
  
    let sql = db.prepare("INSERT INTO skills (name, curr_lvl, max_lvl, curr_xp) VALUES (?, ?, ?, ?)")
    insertData.map((skill) => sql.run(skill.name, skill.curr_lvl, skill.max_lvl, skill.curr_xp))

    db.run(`CREATE TABLE battles (
      id INTEGER PRIMARY KEY NOT NULL, 
      description TEXT NOT NULL,
      xp INTEGER NOT NULL,
      skill_id INTEGER NOT NULL,
      FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE
      )`
    )
    
    sql.finalize()
  })
  
}

module.exports = dbSetup

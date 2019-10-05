const sqlite3 = require('sqlite3').verbose()

db = new sqlite3.Database(':memory:', (err) => {
  if (err) return console.error(err.message)
  console.log('db connected')
})

module.exports = db
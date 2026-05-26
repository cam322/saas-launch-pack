const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
// serve frontend static build if present
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.static(path.join(__dirname, '..', 'public')))

const DB_DIR = path.join(__dirname, 'data')
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true })
const DB_PATH = path.join(DB_DIR, 'signups.db')
const db = new sqlite3.Database(DB_PATH)

// run migrations (schema.sql)
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
db.serialize(() => {
  db.exec(schema, (err) => {
    if (err) console.error('Failed to apply schema', err)
    else console.log('Schema ensured')
  })
})

app.post('/api/signup', (req, res) => {
  const { name, email } = req.body || {}
  if (!name || !email) return res.status(400).json({ message: 'name and email required' })

  const stmt = db.prepare('INSERT INTO signups (name, email) VALUES (?, ?)')
  stmt.run([name, email], function (err) {
    if (err) {
      console.error('DB insert error', err)
      if (err.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ message: 'email already registered' })
      return res.status(500).json({ message: 'db error' })
    }
    res.json({ id: this.lastID })
  })
})

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html')
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath)
  return res.status(404).json({ message: 'Not Found' })
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

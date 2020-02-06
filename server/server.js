const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('../db/db.json')
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../public'))

app.get('/notes', function (_, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html')) 
})


app.get('/api/notes', function (req, res) {
    res.json(db)
})

app.post('/api/notes', function (req, res) {
  const newChar = req.body;
//   console.log(newChar)
  db.push(newChar)
//   console.log(res.json(newChar))
})

function databaseId () {
    const idLength = db.map(db => db.id++)
    return (idLength.length)
}

app.post('/api/notes', (req, res) => {
    res.status(200)
        .send(`Note Updated \n`)
    db.push({"id":databaseId(),"title":req.body.title,"text":req.body.text})
    fs.writeFile(path.join(__dirname, `${db}`)), JSON.stringify(db, null, 5)
})


app.delete('/api/notes/:id', (req, res) => {
    db.splice(req.params.id, 1)
    res.status(200)
      .send(`${req.params.id} deleted \n`)
    fs.writeFile(path.join(__dirname, `${db}`)), JSON.stringify(db)
    
})

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))

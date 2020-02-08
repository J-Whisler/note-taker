const express = require('express')
const path = require('path')
let db = require('../db/db.json')
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join('../public')))

app.get('/notes', (_, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'), err => {
        if (err) {
            throw err
        } else {
            console.log('get /notes')
        }
    })
})


app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'), err => {
        if (err) {
            throw err
        } else {
            console.log('get /')
        }
    }) 
})


app.get('/api/notes', (_, res) => {
    res.json(db), err => {
        if (err) {
            throw err
        } else {
            console.log('get /api/notes')
        }
    }
})

app.get('/*/'), (_, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
    console.log('get /*/')
}

// app.post('/api/notes', (req, _) => {
//   const newChar = req.body;
// //   console.log(newChar)
//   db.push(newChar)
// //   console.log(res.json(newChar))
// fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db, null, 4), err => {
//     if (err) {
//         throw err
//     } else {
//         console.log('post /api/notes')
//         // console.log(database)
//     }
// })
// })

function databaseId () {
    let idMap = db.map(db => db.id)
    console.log('databaseID()')
    let newID = 0
    idMap.forEach(e => {newID = e})
    newID++
    return newID
    

}



app.post('/api/notes', (req, res) => {
    res.status(200)
        .send('Note Updated \n')
    db.push({"id": databaseId(), "title": req.body.title, "text": req.body.text})
    fs.writeFile(path.join(__dirname, '../db/db.json')), JSON.stringify(db, null, 5), err => {
        if (err) {
            throw err
        } else {
            console.log('post /api/notes')
        }
    }
})


app.delete('/api/notes/:id', (req, res) => {
    
    db = db.filter(num => num.id != req.params.id)
    res.status(200)
      .send(`${req.params.id} deleted \n`)

      fs.writeFile(path.join(__dirname, `../db/db.json`), JSON.stringify(db, null, 4), err => {
        if (err) {
            throw err
        } else {
            console.log('Delete')
            
        }
    })
})

    


app.listen(PORT, () => console.log(`Listening to port ${PORT}`))

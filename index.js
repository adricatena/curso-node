// import { createServer } from "http"
import express, { json } from 'express'

let notes = [
  {
    id: 1,
    content: 'HTML is not easy',
    date: '2022-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2022-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-05-30T19:20:14.298Z',
    important: true
  }
]

// const app = createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" })
//   response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port: ${PORT}`)

const app = express()

// Esto es un middleware
app.use(json()) // para que logre parsear correctamente el json que viene en el body de las peticiones

app.use((req, res, next) => {
  console.log(req)
  next()
})

app.get('/', (request, response) => {
  response.send('<h1>Hola mundo!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes) // equivalente a content-type... y stringifear los datos
})

app.get('/api/notes/:id', (request, response) => {
  const { id } = request.params
  const note = notes.find(note => note.id === Number(id))
  if (note) {
    response.send(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== Number(id))
  console.log(notes)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const { content, important } = req.body

  // aca deberiamos comprobar que content e important cumplan con todas las condiciones

  if (!content) {
    res.status(400).json({
      error: 'content is missing'
    })
  } else {
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    const newNote = {
      id: maxId + 1,
      content,
      important,
      date: new Date().toISOString()
    }
    notes.push(newNote)
    console.log({ newNote, notes })
    res.status(201).json(newNote)
  }
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

const PORT = 3001
// express corre de manera asincrona, le pasamos como callback la funcion a ejecutar cuando termine
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

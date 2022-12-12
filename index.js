// import { createServer } from "http"
import express from "express"

let notes = [
  {
    id: 1,
    content: "HTML is not easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
]

// const app = createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" })
//   response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port: ${PORT}`)

const app = express()

app.get("/", (request, response) => {
  response.send("<h1>Hola mundo!</h1>")
})

app.get("/api/notes", (request, response) => {
  response.json(notes) // equivalente a content-type... y stringifear los datos
})

app.get("/api/notes/:id", (request, response) => {
  const { id } = request.params
  const note = notes.find(note => note.id === Number(id))
  if (note) {
    response.send(note)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
// express corre de manera asincrona, le pasamos como callback la funcion a ejecutar cuando termine
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

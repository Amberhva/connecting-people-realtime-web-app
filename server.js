import * as path from 'path'

import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

const app = express()
const http = createServer(app)
const ioServer = new Server(http)

const port = process.env.PORT || 8000
let count = 0


// Stel ejs in als template engine en geef de 'views' map door

app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', function (req, res) {
  res.render('index')
})

// Route voor de community page
app.get('/community', function (req, res) {
  res.render('community')
})

// Route voor de chat
app.get('/chat', function (req, res) {
  res.render('chat')
})
app.use(express.static(path.resolve('public')))
// Start de socket.io server op
ioServer.on('connection', (socket) => {
  // Log de connectie naar console
  console.log(`user ${socket.id} connected`)
  count++
  ioServer.emit('usercount', count)

  // Luister naar een message van een gebruiker
  socket.on('message', (message) => {
    // Log het ontvangen bericht
    console.log(`user ${socket.id} sent message: ${message}`)

    // Verstuur het bericht naar alle clients
    ioServer.emit('message', message)
  }) 

  // Luister naar een disconnect van een gebruiker
  socket.on('disconnect', () => {
    // Log de disconnect
    console.log(`user ${socket.id} disconnected`)
    count--
    ioServer.emit('usercount', count)
  })
  socket.on('typing', (data) => {
    // Broadcast the 'typing' event and data to all connected clients except the sender
    socket.broadcast.emit('typing', data);
  });
})

http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})

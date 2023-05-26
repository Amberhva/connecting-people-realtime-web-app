// Importeer express uit de node_modules map
import express from 'express'

import * as path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'



// Maak een nieuwe express app aan
const app = express()

const http = createServer(app)
const ioServer = new Server(http)

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
// app.use(express.static('public'))

// Serveer client-side bestanden
app.use(express.static(path.resolve('public')))




// Start de socket.io server op
ioServer.on('connection', (client) => {
  // Log de connectie naar console
  console.log(`user ${client.id} connected`)

  // Stuur de history
  // client.emit('history', history)

  // Luister naar een message van een gebruiker
  client.on('message', (message) => {
    // Check de maximum lengte van de historie
    // while (history.length > historySize) {
    //   history.shift()
    // }
    // Voeg het toe aan de historie
    // history.push(message)

    // Verstuur het bericht naar alle clients
    ioServer.emit('message', message)
  })

  // Luister naar een disconnect van een gebruiker
  client.on('disconnect', () => {
    // Log de disconnect
    console.log(`user ${client.id} disconnected`)
  })
})


// Maak een route voor de index
app.get('/', function (req, res) {
  // res.send('Hello World!')
  res.render('index')
})

// Route voor de community page
app.get('/community', function (req, res) {
  // res.send('Hello World!')
  res.render('community')
})

// Route voor de chat
app.get('/chat', function (req, res) {
  // res.send('Hello World!')
  res.render('chat')
})

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
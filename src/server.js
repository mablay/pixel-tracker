const { port, host } = require('../config')
const middleware = require('./middleware')

const server = require('http').createServer(middleware)

server.on('clientError', (err, socket) => {
  if (err) return console.error(err)
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
server.listen(port, host)

// 🦄
console.log(`Mail Spy listening on ${host}:${port}`)

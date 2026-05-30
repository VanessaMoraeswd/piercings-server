const http = require('http')
const { handleRequest } = require('./routes')
const PORT = 3001
const server = http.createServer((req, res) => {
  handleRequest(req, res)
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

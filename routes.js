const {
  getPiercings,
  createPiercing,
  updatePiercing,
  deletePiercing
} = require('./controllers/piercingsController')

function handleRequest(req, res) {
  res.setHeader('Content-Type', 'application/json')
  const routeKey = `${req.method} ${req.url}`

  switch (true) {
    case routeKey === 'GET /api/piercings':
      getPiercings(req, res) //list piercings
      break

    case routeKey === 'POST /api/piercings':
      createPiercing(req, res) //create piercings
      break

    case req.url.startsWith('/api/piercings/') && req.method === 'PUT':
      updatePiercing(req, res)
      break

    case req.url.startsWith('/api/piercings/') && req.method === 'DELETE':
      deletePiercing(req, res)
      break

    default:
      res.statusCode = 404
      res.end(JSON.stringify({ message: 'Route not found' })) // 404 for routes not found
      break
  }
}

module.exports = { handleRequest }

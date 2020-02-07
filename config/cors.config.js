// para que admita peticiones de otros sitios

const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // que acepte peticiones de localhost:3000
  credentials: true // si se pusiera un *, adimitiría peticiones de todos sitios
})

module.exports = corsMiddleware
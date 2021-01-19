require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require ('helmet')
const cors = require ('cors')
const MOVIEDEX = require ('./moviedex.json')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
  
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
      return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
  })

  const validTypes = [`genre`, `country`, `avg_vote`]

  app.get('/types', function handleGetTypes(req, res) {
      res.json(validTypes)
  })

  app.get('/movie', function handleGetMovie (req, res) {
      let response = MOVIEDEX.movie;
  })

app.use((req, res) => {
  res.send('Hello, world!')
})

// filter our movies by genre if genre query param is present
if (req.query.genre) {
    response = response.filter(movie =>
      // case insensitive searching
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }

  // filter our movies by country if country query param is present
  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.includes(req.query.country)
    )
  }

  // filter our movies by avg_vote if avg_vote query param is present
  if (req.query.avg_vote) {
    response = response.filter(movie =>
      movie.avg_vote.includes(req.query.avg_vote)
    )
  }

  res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
  })
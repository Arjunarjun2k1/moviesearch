const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv')
const movieRoutes = require('./routes/movies')

env.config()
app.use(cors())
app.use(express.json())
app.use('/api/movies',movieRoutes)

const port = process.env.PORT || 3001
app.listen(port,'localhost',()=>{
    console.log(process.env.OMDBAPI)
    console.log(`Listening on ${port}`)
})
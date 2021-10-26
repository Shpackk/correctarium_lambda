require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const priceRouter = require('./routes/priceRouter')

app.use(express.json())
app.use(priceRouter)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
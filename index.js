const express = require('express')
const app = express()
const format = require('date-format')
const swaggerUi = require('swagger-ui-express')
const fs = require("fs")
const YAML = require('yaml')
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.status(201).send('Test backend Naty')
})

app.get("/api/v1/instagram", (req, res) => {
  const instaSocial = {
    username: "Nombre de Usuario para intagram",
    followers: 66,
    follows: 70,
    date: format.asString("dd-MM-yy hh:mm:ss", new Date())
  }

  res.status(200).json(instaSocial)
})

app.get("/api/v1/facebook", (req, res) => {
  const faceSocial = {
    username: "Nombre de Usuario para facebook",
    followers: 76,
    follows: 80,
    date: format.asString("dd-MM-yy hh:mm:ss", new Date())
  }

  res.status(200).json(faceSocial)
})

app.get("/api/v1/linkedin", (req, res) => {
  const linkSocial = {
    username: "Nombre de Usuario para linkedin",
    followers: 6,
    follows: 90,
    date: format.asString("dd-MM-yy hh:mm:ss", new Date())
  }

  res.status(200).json(linkSocial)
})

app.get("/api/v1/:token", (req, res) => {
  const tokenReq = req.params.token;
  res.status(200).json({param: tokenReq})
})




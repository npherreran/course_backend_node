const express = require("express")

const app = express()
const swaggerUi = require('swagger-ui-express')
const fs = require("fs")
const YAML = require('yaml')
const file  = fs.readFileSync('swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
const fileUpload = require('express-fileupload')

const PORT = 4000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(fileUpload())

let courses = [
    {
        id: "11",
        name: "Learn Reactjs",
        price: 50.990
    },
    {
        id: "12",
        name: "Learn Angular",
        price: 40.990
    },
    {
        id: "13",
        name: "Learn Vue",
        price: 10.990
    },
]

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))

app.get('/', (req, res) => {
    res.status(201).send('Test documentation naty')
})

app.get('/api/v1/app', (req, res) => {
    res.status(200).send('hello from app docs')
})

app.get('/api/v1/appobject', (req, res) => {
    res.status(200).send(courses[0])
})
app.get('/api/v1/courses', (req, res) => {
    res.status(200).send(courses)
})
app.get('/api/v1/mycourse/:courseID', (req, res) => {
    const myCourse = courses.find(course => course.id === req.params.courseID)
    res.status(200).send(myCourse)
})
app.post('/api/v1/addcourse', (req, res) => {
    console.log(req.body)
    courses.push(req.body)
    res.status(201).send(true)
})
app.get('/api/v1/coursequery', (req, res) => {
   let location = req.query.location
   let device = req.query.device

   res.status(200).send({location, device})
})
app.post('/api/v1/courseupload', (req, res) => {
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"

    file.mv(path, (err) => {
        res.send(true)
    })
})


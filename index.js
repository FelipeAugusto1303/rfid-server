const express = require('express')

const app = express()
app.use(express.json())

var tags = null

app.get('/', (req, res) => {
  res.send(`
    <html>
        <head>RFID tags</head>
        <body>
            <h1>Tags lidas</h1>
            <p>${JSON.stringify(tags)}</p>
        </body>
    </html>`)
})

app.post('/tags-reader', (req, res) => {
  console.log(req.body)
  tags = req.body
  res.status(201).send('OK!')
})

app.listen(5001)

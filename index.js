const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: '*',
  })
)

var tags = []

app.get('/', (req, res) => {
  res.status(200).send(tags)
})

app.post('/tags-reader', (req, res) => {
  req.body.forEach((element) => {
    if (tags.length === 0) {
      tags.push(element)
    } else if (tags.some((tag) => tag.reading_epc_hex === element.reading_epc_hex)) {
      const index = tags.findIndex((obj) => {
        return obj.reading_epc_hex === element.reading_epc_hex
      })
      tags.splice(index, 1, element)
    } else {
      tags.push(element)
    }
  })

  // clearArray(tags)
  console.log(tags)
  res.status(201).send('OK!')
})

const clearArray = (array) => {
  Date.prototype.removeHours = function (h) {
    this.setTime(this.getTime() - h * 60 * 60 * 1000)
    return this
  }
  array.forEach((element) => {
    const time = new Date().getTime() - new Date(element.reading_timestamp).removeHours(1).getTime()
    console.log(time)
    if (Math.round(time / 1000) > 120) {
      const index = tags.findIndex((obj) => {
        return obj.reading_epc_hex === element.reading_epc_hex
      })
      tags.splice(index, 1)
    }
  })
}

app.listen(5001)

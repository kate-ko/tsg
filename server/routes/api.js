const express = require('express')
const router = express.Router()
const path = require('path')
const csv = require('csvtojson')

const imagesMetadataCSVFile = path.resolve(`./public/files/images_metadata.csv`)

router.get("/images/:name", (req, res) => {
  const name = req.params.name
  res.sendFile(path.resolve(`./public/files/image_files/${name}.jpg`) );
});

router.post('/get-images', async (req, res) => {
  let key = Object.keys(req.body)[0]
  let sensors = req.body[key]
  let imagesArray = []

  try {
    imagesArray = await csv().fromFile(imagesMetadataCSVFile);
  } catch (error) {
    console.log(error)
  }

  imagesArray = imagesArray.filter( element => sensors.includes(element.Sensor))
  imagesArray.forEach(obj => obj.ImgURL = `/images/${obj.Name}`);
  response = { response: imagesArray }
  res.json(response)
})

module.exports = router


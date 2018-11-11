const express = require('express')
const router = express.Router()
const path = require('path')
const csv = require('csvtojson')

const imagesMetadataCSVFile = path.resolve(`./public/files/images_metadata.csv`)

router.get("/images/:name", (req, res) => {
  const name = req.params.name
  res.sendFile(path.resolve(`./public/files/image_files/${name}.jpg`));
});

// get all the images
router.get('/get-images', async (req, res) => {
  let imagesArray = []
  try {
    imagesArray = await csv().fromFile(imagesMetadataCSVFile);
  } catch (error) {
    console.log(error)
  }
  imagesArray.forEach(obj => obj.ImgURL = `/images/${obj.Name}`);
  res.json({imagesArray})
})

module.exports = router


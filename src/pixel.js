const fs = require('fs')
// pixel file is 68 byte, we can keep it in RAM
const img = fs.readFileSync('assets/pixel.png')

// serves transparent pixel
function pixel (req, res) {
  res.writeHead(200, { 'Content-Type': 'image/png' })
  res.end(img)
}

module.exports = pixel

// const { writeFile } = require('fs');

const mergeImages = require('merge-image');
const { Canvas, Image } = require('canvas');

mergeImages(['./images/back/jeomoon-back.png', './images/first/first-1.png'], {
  Canvas: Canvas,
  Image: Image,
}).then((b64) => (document.getElementById('b645').src = b64));

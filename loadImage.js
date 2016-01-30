var basename = require("basename");

function loadImage(filename, callback) {
    var image = new Image();
    image.onload = function() {
        var width = image.width;
        var height = image.height;

        var bufferCanvas = document.createElement("canvas");
        var buffer = bufferCanvas.getContext("2d");
        bufferCanvas.width = width;
        bufferCanvas.height = height;
        buffer.drawImage(image, 0, 0);
        var contents = buffer.getImageData(0, 0, width, height);
        var data = contents.data;
        buffer.putImageData(contents, 0, 0);
        image.onload = function() {
            image._name = basename(filename);
            callback(null, image);
        };
        image.src = bufferCanvas.toDataURL();
    };
    image.src = filename;
}

module.exports = loadImage;

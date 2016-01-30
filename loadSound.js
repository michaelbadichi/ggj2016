var basename = require("basename");

function loadSound(filename, callback) {
    var audio = new Audio();
    // audio.onload = function() {
    //     audio._name = basename(filename);
    //     callback(null, audio);
    // };
    audio.src = filename;
    audio.preload = "auto";
    audio.volume = 1.0;
    audio._name = basename(filename);
    callback(null, audio);
}

module.exports = loadSound;

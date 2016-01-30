var async = require("async");
var _ = require("lodash");

var loadImage = require("./loadImage");
var loadSound = require("./loadSound");

function loadAssets(images, sounds, callback) {
    async.map(images, loadImage, function(err, loadedImages) {
        if (err) {
            callback(err);
            return;
        }
        var indexedImages = _.indexBy(loadedImages, "_name");
        async.map(sounds, loadSound, function(err, loadedSounds) {
            var indexedSounds = _.indexBy(loadedSounds, "_name");
            callback(null, _.extend({}, indexedImages, indexedSounds));
        });
    });
}

module.exports = loadAssets;

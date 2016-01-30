var drawAt = require("./drawAt");

function Background(world, assetName) {
    this._world = world;
    this._image = world.assets[assetName];
}

Background.prototype.update = function(interval) {
};

Background.prototype.draw = function() {
    drawAt(this._world, this._image, 0, 0);
};

module.exports = Background;

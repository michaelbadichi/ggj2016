var drawAt = require("./drawAt");

function ParallaxLayer( world, assetName, speed, y, opacity, scale ) {
    this._world = world;
    this._image = this._world.assets[assetName];
    this._speed = speed;
    this._opacity = opacity;
    this._scale = scale;
    this._x = 0;
    this._y = y;
}

ParallaxLayer.prototype.update = function( interval ) {
    this._x -= this._speed * interval / 1000;
    if( this._x < -this._image.width ) {
        this._x += this._image.width;
    }
}

ParallaxLayer.prototype.draw = function() {
    var x = this._x;
    drawAt(this._world, this._image, x, this._y, this._opacity, this._scale );
    while( ( this._image.width * this._scale ) + x < this._world.canvas.width ) {
        x += ( this._scale * this._image.width ) - 1;
        drawAt(this._world, this._image, x, this._y, this._opacity, this._scale );
    }
}

module.exports = ParallaxLayer;

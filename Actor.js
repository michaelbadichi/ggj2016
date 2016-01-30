var Sprite = require("./Sprite");

function Actor(world, options) {
    this._sprite = options.sprite;
    this._x = options.x || 0;
    this._y = options.y || 0;
    this._vx = options.vx || 0;
    this._vy = options.vy || 0;
    this._anchorBottom = options.anchorBottom;
    this._world = world;
}

Actor.prototype.update = function(interval) {
    this._sprite.update(interval);
    this._x += this._vx * interval / 1000;
    this._y += this._vy * interval / 1000;
    if (this.outOfCanvas()) {
        this._world.removeObject(this);
    }
};

Actor.prototype.outOfCanvas = function() {
    var x = this._x;
    var y = this._y;
    var w = this._sprite.frameWidth();
    var h = this._sprite.height();
    var ww = this._world.canvas.width;
    var hh = this._world.canvas.height;
    return x < -w || x >= ww || y < -h || y >= hh;
};

Actor.prototype.draw = function() {
    var x = this._x;
    var y = this._y;
    if (this._anchorBottom) {
        y -= this._sprite.height();
    }
    this._sprite.draw(x, y);
};

Actor.prototype.play = function() {
    this._sprite.play.apply(this._sprite, arguments);
};

module.exports = Actor;

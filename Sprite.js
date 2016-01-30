var _ = require("lodash");

function Sprite(world, options) {
    this._world = world;
    this._strips = {};
    this._idleStripName = options.idleStripName;
    this._currentItem = null;
    this._currentFrame = 0;
    this._timer = 0;
    this._playQueue = [];
    if (options.strips) {
        for (var name in options.strips) {
            this.defineAnimationStrip(name, options.strips[name]);
        }
    }
}

Sprite.prototype.defineAnimationStrip = function(name, props) {
    props.image = this._world.assets[props.assetName];
    this._strips[name] = props;
};

Sprite.prototype.play = function(stripName, options) {
    var strip = this._strips[stripName];
    if (!strip) {
        throw new Error("no animation with name " + stripName);
    }
    options = Object(options);
    this._playQueue.push({
        strip: stripName,
        loop: optionValue(options.loop, strip.loop),
        reverse: optionValue(options.reverse, strip.reverse)
    });
};

function optionValue(override, initial) {
    return _.isUndefined(override) ? initial : override;
}

Sprite.prototype.nextAnimation = function() {
    this._timer = 0;
    if (this._playQueue.length === 0) {
        this._currentItem = null;
        return;
    }
    this._currentItem = this._playQueue[0];
    this._playQueue = this._playQueue.slice(1);
};

Sprite.prototype.update = function(interval) {
    this._timer += interval;
    var strip = this._currentStrip();
    var frameTicks = 1000 / strip.speed;
    while (this._timer >= frameTicks) {
        var nextFrame = this._currentFrame + 1;
        if (nextFrame < strip.numFrames) {
            this._currentFrame = nextFrame;
        } else {
            this._currentFrame = 0;
            if (!this._currentItem || !this._currentItem.loop) {
                this.nextAnimation();
            }
            strip = this._currentStrip();
            frameTicks = 1000 / strip.speed;
        }
        this._timer -= frameTicks;
    }
};

Sprite.prototype.draw = function(x, y) {
    var strip = this._currentStrip();
    if (!inRange(this._currentFrame, 0, strip.numFrames)) {
        throw new Error("current frame number out of range");
    }
    var reverse = strip.reverse;
    if (this._currentItem) {
        reverse = optionValue(this._currentItem.reverse, reverse);
    }
    var image = strip.image;
    var frameNumber = reverse ? strip.numFrames - this._currentFrame - 1 : this._currentFrame;
    var sw = this.frameWidth();
    var sh = this.height();
    var sx, sy;
    if (!strip.topleft && !strip.bottomright) {
        sx = frameNumber * sw;
        sy = 0;
    } else {
        sx = strip.topleft.x + sw * frameNumber;
        sy = strip.topleft.y;
    }
    var dx = x;
    var dy = y;
    var dw = sw;
    var dh = sh;
    this._world.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
};

Sprite.prototype._currentStrip = function() {
    var name;
    if (this._currentItem) {
        name = this._currentItem.strip;
    } else {
        name = this._idleStripName;
    }
    var strip = this._strips[name];
    if (!strip) {
        throw new Error("no strip with name " + name);
    }
    return strip;
};

function inRange(x, lo, hi) {
    return x >= lo && x < hi;
}

Sprite.prototype.frameWidth = function() {
    var strip = this._currentStrip();
    var image = strip.image;
    if (!strip.topleft && !strip.bottomright) {
        return image.width / strip.numFrames;
    } else {
        return strip.bottomright.x - strip.topleft.x;
    }
};

Sprite.prototype.height = function() {
    return this._currentStrip().image.height;
};

module.exports = Sprite;

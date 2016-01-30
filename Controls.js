var _ = require("lodash");
var drawAt = require("./drawAt");
var EventEmitter = require("events").EventEmitter;
var util = require("util");

function Controls(world, buttons) {
    EventEmitter.call(this);

    _.each(buttons, function(button, i) {
        var col = i % 4;
        var row = Math.floor(i / 4);
        var xs = [24, 182, 344, 506];
        var ys = [world.canvas.height - 120];
        if (!xs[col] || !ys[row]) {
            throw new Error("too many buttons");
        }
        button.left = xs[col];
        button.top = ys[row];
        button.right = button.left + 110;
        button.bottom = button.top + 110;
    });
    this._buttons = buttons;
    
    this._buttonHeight = 135;

    this._captured = null;
    this._world = world;

    this._world.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this._world.canvas.addEventListener("mouseup", this.releaseCapture.bind(this));
    this._world.canvas.addEventListener("mouseleave", this.releaseCapture.bind(this));
}

util.inherits(Controls, EventEmitter);

Controls.prototype.onMouseDown = function(event) {
    if (this._captured) {
        this.releaseCapture(event);
    }
    var button = this.findButton(event);
    if (!button) {
        return;
    }
    button.down = true;
    this.emit("down:" + button.name);
    this._captured = button;
};

Controls.prototype.releaseCapture = function(event) {
    if (!this._captured) {
        return;
    }
    this._captured.down = false;
    this.emit("up:" + this._captured.name);
    this._captured = null;
};

Controls.prototype.findButton = function(event) {
    var x = event.pageX - this._world.canvas.offsetLeft;
    var y = event.pageY - this._world.canvas.offsetTop;

    var found = null;
    this._buttons.forEach(function(button) {
        if (x < button.left || x >= button.right ||
            y < button.top || y >= button.bottom) {
            return;
        }
        found = button;
    });
    return found;
};

Controls.prototype.update = function(interval) {
};

Controls.prototype.draw = function() {
    this._buttons.forEach(function(button) {
        drawAt(this._world, this._world.assets[button.image], button.left, button.top);
    }.bind(this));
        
    this._buttons.forEach(function(button) {
        var w = button.right - button.left;
        var h = button.bottom - button.top;
        this._world.context.strokeStyle = "red";
        this._world.context.strokeRect(button.left, button.top, w, h);
        if (button.down) {
            this._world.context.fillStyle = "rgba(255,255,255,0.4)";
            this._world.context.fillRect(button.left, button.top, w, h);
        }
    }.bind(this));
}

module.exports = Controls;

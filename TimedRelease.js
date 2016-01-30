var _ = require("lodash");

function TimedRelease(world, resetAfter, spec) {
    this._world = world;
    this._spec = spec;
    this._upcoming = _.clone(spec);
    this._timer = 0;
    this._resetAfter = resetAfter;
}

TimedRelease.prototype.update = function(interval) {
    var before = this._timer;
    this._timer += interval;
    if (this._resetAfter > before && this._resetAfter <= this._timer) {
        this._upcoming = _.clone(this._spec);
        this._timer = 0;
    }
    var dead = [];
    _.each(this._upcoming, function(s) {
        if (s.time > before && s.time <= this._timer) {
            this._world.addObject(s.object());
            dead.push(s);
        }
    }.bind(this));
    this._upcoming = _.difference(this._upcoming, dead);
};

TimedRelease.prototype.draw = function() {
};

module.exports = TimedRelease;

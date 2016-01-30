var drawAt = require("./drawAt");

var obstacles = {
    highWindow: [
        [ 258, 200 ],
        [ 321, 200 ],
        [ 391, 200 ],
        [ 450, 200 ],
        [ 1054, 235 ],
        [ 1116, 235 ],
        [ 1176, 235 ],
        [ 2163, 257 ],
        [ 2214, 257 ],
        [ 2271, 257 ],
        [ 3164, 203 ],
        [ 3206, 203 ],
        [ 3246, 203 ],
        [ 3289, 203 ],
        [ 4023, 189 ],
        [ 4084, 189 ],
        [ 4153, 189 ],
        [ 4214, 189 ]
    ],
    lowWindowObstacleLocations: [
        [ 258, 281 ],
        [ 380, 281 ],
        [ 416, 281 ],
        [ 447, 281 ],
        [ 1055, 301 ],
        [ 1117, 301 ],
        [ 1178, 301 ],
        [ 2165, 317 ],
        [ 2219, 317 ],
        [ 2271, 317 ],
        [ 3164, 239 ],
        [ 3164, 274 ],
        [ 3206, 239 ],
        [ 3206, 275 ],
        [ 3247, 239 ],
        [ 3247, 275 ],
        [ 3290, 239 ],
        [ 3290, 274 ],
        [ 4024, 272 ],
        [ 4060, 272 ],
        [ 4095, 272 ],
        [ 4215, 272 ]
    ],
    door: [
        [ 47, 345 ],  
        [ 860, 338 ],  
        [ 902, 338 ],  
        [ 2506, 344 ] 
    ],
    footsteps: [
        [ 319, 308, 357, 355 ],
        [ 1680, 310, 1680, 363 ],
        [ 1720, 310, 1720, 363 ],
        [ 1760, 310, 1760, 363 ],
        [ 1800, 310, 1800, 363 ],
        [ 1840, 310, 1840, 363 ],
        [ 1880, 310, 1880, 363 ],
        [ 1920, 310, 1920, 363 ],
        [ 1960, 310, 1960, 363 ],
        [ 2000, 310, 2000, 363 ],
        [ 2035, 310, 2035, 363 ],
        [ 4153, 300, 4117, 345 ]
    ],
    bench: [
        [ 760, 353 ],  
        [ 1594, 336 ],  
        [ 2366, 350 ],  
        [ 2695, 343 ],  
        [ 2826, 345 ],  
        [ 3054, 318 ],  
        [ 3955, 353 ] 
    ]
};

function Obstacle( world, assetName, speed, y, opacity, scale ) {
    this._world = world;
    this._image = this._world.assets[assetName];
    this._speed = speed;
    this._opacity = opacity;
    this._scale = scale;
    this._x = 0;
    this._y = y;
}

Obstacle.prototype.update = function( interval ) {
    
}

Obstacle.prototype.draw = function() {
    var x = this._x;
    drawAt(this._world, this._image, x, this._y, this._opacity, this._scale );
}

module.exports = Obstacle;

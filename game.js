var ParallaxLayer = require("./ParallaxLayer");
var Sprite = require("./Sprite");
var Background = require("./Background");
var Controls = require("./Controls");
var trace = require("./trace");
var loadAssets = require("./loadAssets");
var Actor = require("./Actor");
var World = require("./World");
var TimedRelease = require("./TimedRelease");

var world;

function main() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.lineWidth = 1;
    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
    trace("loading assets");
    loadAssets([
        "resources/controls.jpg",
        "resources/background.png",
        "resources/parallax0.png",
        "resources/parallax1.png",
        "resources/parallax2.png",
        "resources/parallax3.png",
        "resources/road.png",
        "resources/player-walk.png",
        "resources/player-jump.png",
        "resources/player-bend.png",
        "resources/axe.png",
        "resources/hole.png",
        "resources/fish.png",
        "resources/bomb.png",
        "resources/button1.png",
        "resources/button2.png",
        "resources/button3.png",
        "resources/button4.png",
        "resources/voodoo1.png",
        "resources/voodoo2.png",
        "resources/voodoo3.png",
        "resources/voodoo4.png",
    ], [
        "resources/game-music.mp3"
    ], function(err, assets) {
        if (err) {
            trace(err.toString());
            return;
        }
        trace("assets loaded");

        world = new World({
            canvas: canvas,
            context: context,
            assets: assets,
            lastUpdate: null
        });

        world.addObject(new Background(world, "background"));

        world.addObject(new ParallaxLayer(world, "parallax0", 20, 30, 0.5, 0.7));
        world.addObject(new ParallaxLayer(world, "parallax0", 40, 0, 1.0, 1.0));
        world.addObject(new ParallaxLayer(world, "parallax1", 60, 180, 1.0, 1.0));
        world.addObject(new ParallaxLayer(world, "parallax2", 80, 140, 1.0, 1.0));
        world.addObject(new ParallaxLayer(world, "parallax3", 120, 30, 1.0, 1.0));
        world.addObject(new ParallaxLayer(world, "road", 180, 70, 1.0, 1.0));

        var sprites = require("./sprites")(world);

        var player = new Actor(world, {
            x: (world.canvas.width-124)/2,
            y: 500,
            anchorBottom: true,
            sprite: sprites.player
        });
        world.addObject(player);

        var voodoo = new Actor(world, {
            x: 0,
            y: 545,
            sprite: sprites.voodoo
        });
        world.addObject(voodoo);

        var tr = new TimedRelease(world, 45000, [
            {
                time: 5000,
                object: function() {
                    return new Actor(world, {
                        x: world.canvas.width - 1,
                        y: 330,
                        vx: -100,
                        sprite: sprites.axe
                    });
                }
            },
            {
                time: 15000,
                object: function() {
                    return new Actor(world, {
                        x: world.canvas.width - 1,
                        y: 450,
                        vx: -180,
                        sprite: sprites.hole
                    });
                }
            },
            {
                time: 25000,
                object: function() {
                    return new Actor(world, {
                        x: world.canvas.width - 1,
                        y: 310,
                        vx: -100,
                        sprite: sprites.fish
                    });
                }
            },
            {
                time: 30000,
                object: function() {
                    return new Actor(world, {
                        x: (world.canvas.width-96.33)/2+160,
                        y: 40,
                        vy: 100,
                        sprite: sprites.bomb
                    });
                }
            }
        ]);
        world.addObject(tr);

        var controls = new Controls(world, [
            {
                name: "bend",
                image: "button1",
                animation: "voodoo1"
            },
            {
                name: "jump",
                image: "button2",
                animation: "voodoo2"
            },
            {
                name: "bend2",
                image: "button3",
                animation: "voodoo3"
            },
            {
                name: "jump2",
                image: "button4",
                animation: "voodoo4"
            }
        ]);
        controls.on("down:bend", function() {
            voodoo.play("voodoo1");
            voodoo.play("voodoo1", {reverse: true});
            player.play("bend");
        });
        controls.on("down:jump", function() {
            voodoo.play("voodoo2");
            voodoo.play("voodoo2", {reverse: true});
            player.play("jump");
        });
        controls.on("down:bend2", function() {
            voodoo.play("voodoo3");
            voodoo.play("voodoo3", {reverse: true});
            player.play("bend");
        });
        controls.on("down:jump2", function() {
            voodoo.play("voodoo4");
            voodoo.play("voodoo4", {reverse: true});
            player.play("jump");
        });


        world.addObject(controls);
        world.start();
    });
}

main();

var Sprite = require("./Sprite");

module.exports = function(world) {
    return {
        player: new Sprite(world, {
            idleStripName: "walk",
            strips: {
                walk: {
                    assetName: "player-walk",
                    numFrames: 5,
                    speed: 10
                },
                jump: {
                    assetName: "player-jump",
                    numFrames: 6,
                    speed: 8
                },
                bend: {
                    assetName: "player-bend",
                    numFrames: 8,
                    speed: 10
                }
            }
        }),
        axe: new Sprite(world, {
            idleStripName: "roll",
            strips: {
                roll: {
                    assetName: "axe",
                    numFrames: 4,
                    speed: 7
                }
            }
        }),
        hole: new Sprite(world, {
            idleStripName: "open",
            strips: {
                open: {
                    assetName: "hole",
                    numFrames: 3,
                    speed: 3,
                    loop: false,
                    reverse: true
                }
            }
        }),
        fish: new Sprite(world, {
            idleStripName: "swim",
            strips: {
                swim: {
                    assetName: "fish",
                    numFrames: 6,
                    speed: 8
                }
            }
        }),
        bomb: new Sprite(world, {
            idleStripName: "burn",
            strips: {
                burn: {
                    assetName: "bomb",
                    numFrames: 3,
                    speed: 5
                }
            }
        }),
        voodoo: new Sprite(world, {
            idleStripName: "idle",
            strips: {
                idle: {
                    assetName: "controls",
                    numFrames: 1,
                    speed: 10
                },
                voodoo1: {
                    assetName: "voodoo1",
                    numFrames: 4,
                    speed: 10
                },
                voodoo2: {
                    assetName: "voodoo2",
                    numFrames: 3,
                    speed: 10
                },
                voodoo3: {
                    assetName: "voodoo3",
                    numFrames: 3,
                    speed: 10
                },
                voodoo4: {
                    assetName: "voodoo4",
                    numFrames: 4,
                    speed: 10
                }
            }
        })

    };
};

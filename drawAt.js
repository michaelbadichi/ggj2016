function drawAt(world, image, x, y, opacity, scale) {
    if( opacity === null || opacity === undefined ) {
        opacity = 1.0;
    }
    scale = scale || 1.0;

    world.context.save();
    world.context.globalAlpha = opacity;
    world.context.drawImage(image, x, y, image.width * scale, image.height * scale);
    world.context.restore();
}

module.exports = drawAt;

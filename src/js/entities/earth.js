var Earth = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'earth');

    this.anchor.setTo(0.5, 0.5);
    this.scale.set(0.6, 0.6);
    this.radious = (this.width * 0.5) * 0.95;

    game.add.existing(this);
};

Earth.prototype = Object.create(Phaser.Sprite.prototype);
Earth.prototype.constructor = Earth;

Earth.prototype.update = function() {

};

module.exports = Earth;

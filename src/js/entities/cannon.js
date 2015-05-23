var Cannon = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'cannon');

    this.anchor.setTo(0.5, 1.2);
    this.scale.set(0.25, 0.25);
    this.radious = this.width * 0.5;

    game.add.existing(this);
};

Cannon.prototype = Object.create(Phaser.Sprite.prototype);
Cannon.prototype.constructor = Cannon;

Cannon.prototype.update = function() {

};

module.exports = Cannon;

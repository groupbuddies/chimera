var PlanetMocha = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'mocha');

    this.anchor.setTo(0.5, 0.5);
    this.scale.set(0.2, 0.2);

    game.add.existing(this);
};

PlanetMocha.prototype = Object.create(Phaser.Sprite.prototype);
PlanetMocha.prototype.constructor = PlanetMocha;

PlanetMocha.prototype.update = function() {

};

module.exports = PlanetMocha;

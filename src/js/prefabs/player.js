(function() {
  'use strict';

  function Player(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'player', frame);

    this.anchor.set(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
  }

  Player.prototype.constructor = Player;

  Player.prototype = Object.create(Phaser.Sprite.prototype);

  Player.prototype.create = function() {

  };

  Player.prototype.update = function() {

  };
})();

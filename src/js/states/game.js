(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width * 1.1
        , y = this.game.height / 2;

      this.earth = this.add.sprite(x, y, 'circle');
      this.earth.anchor.setTo(0.5, 0.5);

      this.player = this.game.add.group();
      this.player.position.x = 0;
      this.player.position.y = this.game.height * 0.5;
      this.moon = this.player.create(0, 0, 'circle');
      this.canon = this.player.create(0, 0, 'canon');
      this.player.setAll('anchor.x', 0.5)
      this.player.setAll('anchor.y', 0.5)
      this.moon.scale.set(0.3, 0.3);
      this.canon.position.x = this.moon.width * 0.5;

      this.keyShoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.keyShoot.onDown.add(this.fire, this);
    },

    update: function () {
      this.earth.angle = (this.game.time.now) * 0.0005 * (180 / Math.PI);
    },

    fire: function() {
      // only one coffee at a time
      if (!!this.coffee && this.coffee.exists) {
        return;
      }

      this.coffee = this.add.sprite(this.canon.world.x, this.canon.world.y, 'java');
      this.coffee.anchor.setTo(0.5, 0.5);
      this.coffee.scale.set(0.1, 0.1);
      this.coffee.checkWorldBounds = true;
      this.coffee.outOfBoundsKill = true;
      this.game.physics.enable(this.coffee, Phaser.Physics.ARCADE);
      this.coffee.body.velocity.x = 500;
    },
  };

  window['chimera'] = window['chimera'] || {};
  window['chimera'].Game = Game;

}());

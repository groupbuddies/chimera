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

      this.moon = this.add.sprite(0, y, 'circle');
      this.moon.anchor.setTo(0.5, 0.5);
      this.moon.scale.set(0.3, 0.3);
    },

    update: function () {
      this.earth.angle = (this.game.time.now) * 0.0005 * (180 / Math.PI);
    },
  };

  window['chimera'] = window['chimera'] || {};
  window['chimera'].Game = Game;

}());

(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.line = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width * 1.1
        , y = this.game.height / 2;

      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.target = { x: this.game.width, y: this.game.height / 2 };

      this.earth = this.add.sprite(x, y, 'circle');
      this.earth.anchor.setTo(0.5, 0.5);

      this.moon = this.add.sprite(0, y, 'circle');
      this.moon.anchor.setTo(0.5, 0.5);
      this.moon.scale.set(0.3, 0.3);

      this.keyShoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.keyShoot.onDown.add(this.fire, this);

      this.lineProperties = this.add.bitmapData(this.game.width, this.game.height);
      this.lineProperties.ctx.beginPath();
      this.lineProperties.ctx.lineWidth = '4';
      this.lineProperties.ctx.strokeStyle = 'white';
      this.lineProperties.ctx.stroke();

      this.line = this.add.sprite(0, 0, this.lineProperties);
    },

    update: function () {
      this.earth.angle = (this.game.time.now) * 0.0005 * (180 / Math.PI);
      this.trajectoryLine();
      this.moveTarget();

    },

    fire: function() {
      // only one coffee at a time
      if (!!this.coffee && this.coffee.exists) {
        return;
      }

      this.coffee = this.add.sprite(this.moon.position.x, this.moon.position.y, 'java');
      this.coffee.anchor.setTo(0.5, 0.5);
      this.coffee.scale.set(0.1, 0.1);
      this.coffee.checkWorldBounds = true;
      this.coffee.outOfBoundsKill = true;
      this.game.physics.enable(this.coffee, Phaser.Physics.ARCADE);
      this.coffee.body.velocity.x = 500;
    },

    trajectoryLine: function() {
      this.lineProperties.clear();
      this.lineProperties.ctx.beginPath();
      this.lineProperties.ctx.moveTo(this.moon.x, this.moon.y);
      this.lineProperties.ctx.lineTo(this.target.x, this.target.y);
      this.lineProperties.ctx.stroke();
      this.lineProperties.ctx.closePath();
      this.lineProperties.render();
    },

    moveTarget: function() {
      var margin = 50;

      if (this.cursors.down.isDown) {
        if (this.target.y < this.earth.y + this.earth.height / 2 + margin)
          this.target.y += 2;
      }

      if (this.cursors.up.isDown) {
        if (this.target.y > this.earth.y - this.earth.height / 2 - margin)
          this.target.y -= 2;
      }
    }
  };

  window['chimera'] = window['chimera'] || {};
  window['chimera'].Game = Game;

}());

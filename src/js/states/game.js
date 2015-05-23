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

      this.target = { x: this.game.width * 1.1, y: this.game.height / 2 };

      this.earth = this.add.sprite(x, y, 'circle');
      this.earth.anchor.setTo(0.5, 0.5);
      this.game.physics.enable(this.earth, Phaser.Physics.ARCADE);

      this.player = this.game.add.group();
      this.player.position.x = 0;
      this.player.position.y = this.game.height * 0.5;
      this.moon = this.player.create(0, 0, 'circle');
      this.canon = this.player.create(0, 0, 'canon');
      this.player.setAll('anchor.x', 0.5)
      this.player.setAll('anchor.y', 0.5)
      this.moon.scale.set(0.3, 0.3);
      this.canon.position.x = this.moon.width * 0.5;

      this.houses = [];
      this.pums   = [];

      for(var i=0; i<5; i++){
        var house   = this.add.sprite(0, 0, 'house');
        var pum     = this.add.sprite(0, 0, 'pum');
        house.angle = 180-40*i;
        pum.angle   = 180-40*i;
        house.scale.set(0.2, 0.2);
        pum.scale.set(0.2, 0.2);
        house.anchor.setTo(-3,0);
        pum.anchor.setTo(-3,0);
        this.houses.push(house);
        this.pums.push(pum);
        this.earth.addChild(house);
        this.earth.addChild(pum);
      }

      this.keyShoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.keyShoot.onDown.add(this.fire, this);

      this.lineProperties = this.add.bitmapData(this.game.width, this.game.height);
      this.lineProperties.ctx.beginPath();
      this.lineProperties.ctx.lineWidth = '1';
      this.lineProperties.ctx.setLineDash([2, 4]);
      this.lineProperties.ctx.strokeStyle = 'white';
      this.lineProperties.ctx.stroke();

      this.line = this.add.sprite(0, 0, this.lineProperties);
      this.trajectoryLine();
    },

    update: function () {
      this.earth.angle = (this.game.time.now) * 0.0005 * (180 / Math.PI);
      this.trajectoryLine();
      this.movePlayer();
      this.updatePlayerAngle();
      this.checkCoffeeCollision();
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

      var tween = this.game.add.tween(this.coffee).to({
        x: [this.canon.world.x, this.game.width * 0.66, this.target.x, this.target.x],
        y: [this.canon.world.y, this.target.y, this.target.y, this.target.y],
      }, 2000,Phaser.Linear , true).interpolation(function(v, k){
        return Phaser.Math.bezierInterpolation(v, k);
      });
    },

    trajectoryLine: function() {
      var maxHeight = this.target.y - this.earth.y / 2;

      this.lineProperties.clear();
      this.lineProperties.ctx.beginPath();
      this.lineProperties.ctx.moveTo(this.canon.world.x, this.canon.world.y);
      this.lineProperties.ctx.bezierCurveTo(
        this.game.width * 0.66, this.target.y, //controll 1
        this.target.x, this.target.y, // controll 2
        this.target.x, this.target.y
      );
      this.lineProperties.ctx.stroke();
      this.lineProperties.ctx.closePath();
      this.lineProperties.render();
    },

    movePlayer: function() {
      var velocity = 6;
      var margin = 80;

      if (this.cursors.down.isDown) {
        if (this.target.y < this.earth.y + this.earth.height / 2 + margin)
          this.target.y += velocity;
      }

      if (this.cursors.up.isDown) {
        if (this.target.y > this.earth.y - this.earth.height / 2 - margin)
          this.target.y -= velocity;
      }
    },

    updatePlayerAngle: function() {
      var angle = Math.atan2(this.target.y - this.player.y, this.target.x - this.player.x );
      angle = angle * (180/Math.PI);

      if (angle < 0) {
        angle = 360 - (-angle);
      }

      this.player.angle = angle;
    },

    checkCoffeeCollision: function() {
      if (!this.coffee || !this.coffee.exists) {
        return;
      }

      this.game.physics.arcade.collide(this.coffee, this.earth, undefined, function() {
        this.coffee.kill();
      }, this);
    }
  };

  window['chimera'] = window['chimera'] || {};
  window['chimera'].Game = Game;

}());

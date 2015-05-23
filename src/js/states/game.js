(function() {
  'use strict';

  function Game() {
    this.cannon = null;
    this.line = null;
  }

  Game.prototype = {

    create: function () {
      // this.bg = this.add.bitmapData(this.game.width, this.game.height);
      // var gradient = this.bg.ctx.createRadialGradient(
      //     this.game.width* 0.5,
      //     this.game.height * 0.5,
      //     200,
      //     this.game.width*0.5,
      //     this.game.height*0.5,
      //     400);
      // gradient.addColorStop(0, "#3B3352");
      // gradient.addColorStop(1, "#241C3D");
      // this.bg.ctx.fillStyle = gradient;
      // this.bg.ctx.fillRect(0, 0, this.game.width, this.game.height);
      // this.game.add.sprite(0, 0, this.bg);
      
      this.bg = this.add.sprite(0, 0, 'bg');

      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.target = { x: this.game.width * 1.1, y: this.game.height / 2 };

      this.earth = this.add.sprite(this.game.width * 1.8, this.game.height * 0.5, 'earth');
      this.earth.scale.set(1.2, 1.2)
      this.earth.anchor.setTo(0.5, 0.5);
      this.game.physics.enable(this.earth, Phaser.Physics.ARCADE);

      this.mocha = this.add.sprite(0, this.game.height * 0.5, 'mocha');
      this.mocha.anchor.setTo(0.5, 0.5);
      this.mocha.scale.set(0.4, 0.4);
      this.mocha.angle = 90;

      this.cannon = this.add.sprite(0, 0, 'cannon');
      this.cannon.position.x = this.mocha.height * 0.45;
      this.cannon.position.y = this.game.height * 0.5;
      this.cannon.scale.set(0.5, 0.5);
      this.cannon.anchor.set(0.5, 1.2);

      this.housesArr = [];
      this.pumsArr   = [];
      this.houses = this.game.add.group();
      this.pums   = this.game.add.group();

      for(var i=0; i<5; i++){
        var house   = this.add.sprite(0, 0, 'house');
        var pum     = this.add.sprite(0, 0, 'pum');
        house.angle = 180-40*i;
        pum.angle   = 180-40*i;
        this.housesArr.push(house);
        this.houses.add(house);
        this.pumsArr.push(pum);
        this.pums.add(pum);
      }

      this.houses.setAll('scale',  {x:0.2, y:0.2});
      this.houses.setAll('anchor', {x: -3, y:  0});
      this.pums.setAll('scale',    {x:0.2, y:0.2});
      this.pums.setAll('anchor',   {x: -3, y:  0});
      this.pums.setAll('visible',  false);


      for(var i=0; i<5; i++){
        this.earth.addChild(this.housesArr[i]);
        this.earth.addChild(this.pumsArr[i]);
      }

      this.keyShoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.keyShoot.onDown.add(this.fire, this);

      this.lineProperties = this.add.bitmapData(this.game.width, this.game.height);
      this.lineProperties.ctx.beginPath();
      this.lineProperties.ctx.lineWidth = '2';
      this.lineProperties.ctx.setLineDash([5, 6]);
      this.lineProperties.ctx.strokeStyle = 'black';
      this.lineProperties.ctx.stroke();

      this.line = this.add.sprite(0, 0, this.lineProperties);
      this.trajectoryLine();

      this.sounds = {
        soundtrack: this.game.add.audio('soundtrack', 0.3, true),
        actions: {
            fire: this.game.add.audio('fire'),
            hit:  this.game.add.audio('hit'),
            hit:  this.game.add.audio('earth_hit'),
            miss: this.game.add.audio('miss')
        }
      };
      this.sounds.soundtrack.play();

      this.game.world.bringToTop(this.mocha);
      this.game.world.bringToTop(this.earth);
    },

    update: function () {
      this.earth.angle = (this.game.time.now) * 0.00008 * (180 / Math.PI);
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

      this.coffee = this.add.sprite(this.cannonTip().x, this.cannonTip().y, 'coffee');
      this.coffee.anchor.setTo(0.5, 1);
      this.coffee.rotation = Math.PI * 0.5;
      this.coffee.scale.set(0.3, 0.3);
      this.coffee.checkWorldBounds = true;
      this.coffee.outOfBoundsKill = true;
      this.game.physics.enable(this.coffee, Phaser.Physics.ARCADE);

      var tween = this.game.add.tween(this.coffee).to({
        x: [this.cannonTip().x, this.game.width * 0.66, this.target.x, this.target.x],
        y: [this.cannonTip().y, this.target.y, this.target.y, this.target.y],
      }, 2000,Phaser.Linear , true).interpolation(function(v, k){
        return Phaser.Math.bezierInterpolation(v, k);
      });

      this.playFx(this.sounds.actions.fire);
    },

    playFx: function(sound){
        sound.play();
    },

    trajectoryLine: function() {
      var maxHeight = this.target.y - this.earth.y / 2;

      this.lineProperties.clear();
      this.lineProperties.ctx.beginPath();
      this.lineProperties.ctx.moveTo(this.cannonTip().x, this.cannonTip().y);
      this.lineProperties.ctx.bezierCurveTo(
        this.game.width * 0.8, this.target.y, //controll 1
        this.target.x, this.target.y, // controll 2
        this.target.x, this.target.y
      );
      this.lineProperties.ctx.stroke();
      this.lineProperties.ctx.closePath();
      this.lineProperties.render();
    },

    cannonTip: function() {
      return {
        x: (this.cannon.world.x + Math.sin(this.cannon.angle * Math.PI/180) * this.cannon.height * 1.2),
        y: (this.cannon.world.y - Math.cos(this.cannon.angle * Math.PI/180) * this.cannon.width * 1.2)
      };
    },

    movePlayer: function() {
      var velocity = 6;
      var margin = 60;

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
      var angle = Math.atan2(this.target.y - this.cannon.y, this.target.x - this.cannon.x );
      angle = angle * (180/Math.PI);

      if (angle < 0) {
        angle = 360 - (-angle);
      }

      this.cannon.angle = 90 + angle;
    },

    checkCoffeeCollision: function() {
      if (!this.coffee || !this.coffee.exists) {
        return;
      }

      this.game.physics.arcade.collide(this.coffee, this.earth, undefined, function() {
        this.coffee.kill();
        this.playFx(this.sounds.actions.earch_hit);
      }, this);
    }
  };

  window['chimera'] = window['chimera'] || {};
  window['chimera'].Game = Game;

}());

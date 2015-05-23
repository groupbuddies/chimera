var Earth = require('../entities/earth');
var Line = require('../entities/line');
var Earth = require('../entities/earth');
var Cannon = require('../entities/cannon');
var Keyboard = require('../entities/keyboard');
var PlanetMocha = require('../entities/planet_mocha');

var Game = function () {
};

module.exports = Game;

Game.prototype = {

  create: function () {
    var width = this.game.width;
    var height = this .game.height;

    this.target = { x: width * 0.5, y: 0 - height * 0.1 };

    this.background = this.add.sprite(0, 0, 'background');
    this.background.scale.set(0.5, 0.5);

    this.earth = new Earth(this.game, width / 2, 0 - height * 0.25);
    this.mochaPlanet = new PlanetMocha(this.game, width * 0.5, height);
    this.cannon = new Cannon(this.game, width * 0.5, height - this.mochaPlanet.height * 0.45);

    this.line = new Line(this, this.game, 0, 0, this.target, this.cannon);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.keyboard = new Keyboard(this.cursors, this.target, this.earth);
  },

  update: function () {
    this.keyboard.update();
  }
};

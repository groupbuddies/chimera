var Preloader = function (game) {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(320, 240, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.loadResources();
  },

  loadResources: function() {
    this.load.image('player', 'assets/player.png');
    this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');

    this.load.image('pum'          , 'assets/pum.png');
    this.load.image('meteor'       , 'assets/pum.png');
    this.load.image('earth'        , 'assets/earth.png');
    this.load.image('mocha'        , 'assets/mocha.png');
    this.load.image('coffee'       , 'assets/coffee.png');
    this.load.image('cannon'       , 'assets/cannon.png');
    this.load.image('pinpoint'     , 'assets/location.png');
    this.load.image('background'   , 'assets/background.png');
    this.load.spritesheet('flames' , 'assets/flames.png', 36, 62, 3);

    this.loadSounds([
      'hit',
      'miss',
      'fire',
      'earth_hit',
      'meteor_hit',
      'soundtrack'
    ]);
  },

  loadSounds: function(sounds){
    sounds.forEach(function(sound){
      this.load.audio(sound, 'assets/audio/'+ sound +'.mp3');
    }, this);
  },

  create: function () {
    this.asset.cropEnabled = false;
  },

  update: function () {
    if (!!this.ready) {
      this.game.state.start('Game');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};

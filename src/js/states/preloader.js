(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      this.loadResources();
    },

    loadResources: function () {
      this.load.image('earth'      , 'assets/earth.svg');
      this.load.image('mocha'      , 'assets/mocha.svg');
      this.load.image('coffee'     , 'assets/coffee.png');
      this.load.image('cannon'     , 'assets/cannon.png');
      this.load.image('pinpoint'   , 'assets/location.png');
      this.load.image('pum'        , 'assets/explode.png');
      this.load.image('bg'         , 'assets/background.png');
      this.load.image('smile'      , 'assets/success.png');
      this.load.image('ship'       , 'assets/ship.svg');
      this.load.image('red'       , 'assets/red.png');
      this.load.image('orange'       , 'assets/orange.png');
      this.load.image('yellow'       , 'assets/yellow.png');

      this.load.spritesheet('shipFlame'  , 'assets/ship-flame.png', 216, 72, 3);
      this.load.spritesheet('flames' , 'assets/flames.png', 62, 36, 3);
      this.load.spritesheet('commet' , 'assets/comet-flame.png', 262, 127, 3);
      this.load.spritesheet('commet-purple', 'assets/comet-flame-purple.png', 262, 127, 3);

      this.loadSounds(['fire',
        'hit',
        'earth_hit',
        'junk_hit',
        'miss',
        'new_pin',
        'soundtrack',
        'ship_hit'
      ]);
    },

    loadSounds: function(sounds){
        sounds.forEach(function(s){
            this.load.audio(s, 'assets/audio/'+s+'.mp3');
        }, this);
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('game');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['chimera'] = window['chimera'] || {};
  window['chimera'].Preloader = Preloader;

}());

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
      this.load.image('player', 'assets/player.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');

      this.load.image('circle', 'assets/circle.png');
      this.load.image('earth', 'assets/earth.png');
      this.load.image('mocha', 'assets/mocha.png');
      this.load.image('java', 'assets/java.png');
      this.load.image('cannon', 'assets/cannon.png');
      this.load.image('house'  , 'assets/target_house.png');
      this.load.image('pum'    , 'assets/pum.png');

      this.loadSounds(['fire',
        'hit',
        'earth_hit',
        'miss',
        'soundtrack'
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

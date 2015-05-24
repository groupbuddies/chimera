$(function() {
  'use strict';

  var game
    , ns = window['chimera'];

  game = new Phaser.Game(640, 480, Phaser.CANVAS, 'chimera-game');

  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  // game.state.add('story', ns.story);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */


  var started = false;
  var bootGame = function() {
    if (started) {
      return;
    }
    started = true;
    $(window).unbind('keypress');

    $('#intro').fadeOut(500, function() {
      game.state.start('boot');
    });
  }

  setTimeout(bootGame, 20000);
  $(window).keypress(function(e) {
    if (e.keyCode == 32) {
      bootGame();
    }
  })
});

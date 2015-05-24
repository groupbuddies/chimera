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


  var bootGame = function() {
    $(window).unbind('keypress');
    clearTimeout(bootGame);

    $('#intro').fadeOut(500, function() {
      game.state.start('game');
    });
  }

  setTimeout(bootGame, 20000);
  $(window).keypress(function(e) {
    if (e.keyCode == 32) {
      bootGame();
    }
  })
});

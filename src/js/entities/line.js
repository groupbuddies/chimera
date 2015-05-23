var Line = function (context, game, x, y, target, cannon) {
  this.target = target;
  this.cannon = cannon;

  this.lineProperties = context.add.bitmapData(game.width, game.height);
  this.lineProperties.ctx.beginPath();
  this.lineProperties.ctx.lineWidth = '2';
  this.lineProperties.ctx.setLineDash([2, 15]);
  this.lineProperties.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  this.lineProperties.ctx.stroke();

  Phaser.Sprite.call(this, game, x, y, this.lineProperties);

  game.add.existing(this);
};

Line.prototype = Object.create(Phaser.Sprite.prototype);
Line.prototype.constructor = Line;

Line.prototype.update = function() {
  this.lineProperties.clear();
  this.lineProperties.ctx.beginPath();
  this.lineProperties.ctx.moveTo(this.cannon.x, this.cannon.y);
  this.lineProperties.ctx.lineTo(this.target.x, this.target.y);
  this.lineProperties.ctx.stroke();
  this.lineProperties.ctx.closePath();
  this.lineProperties.render();
};

module.exports = Line;

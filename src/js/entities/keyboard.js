var Keyboard = function(cursors, target, earth) {
  this.earth = earth;
  this.velocity = 6;
  this.margin = 60;
  this.cursors = cursors;
  this.target = target;
};

Keyboard.prototype.update = function() {
  if (this.cursors.down.isDown) {
    this.onDown();
  }

  if (this.cursors.up.isDown) {
    this.onUp();
  }
};

Keyboard.prototype.onUp = function() {
  if (this.target.y < this.earth.y + this.earth.height / 2 + this.margin) {
    this.target.y += this.velocity;
  }
};

Keyboard.prototype.onDown = function() {
  if (this.target.y > this.earth.y - this.earth.height / 2 - this.margin) {
    this.target.y -= this.velocity;
  }
};

module.exports = Keyboard;

// Enemies our player must avoid
var randomNum = function(fator, minimo){
   return (Math.floor((Math.random() * fator))+minimo);
}

var Enemy = function() {
   // Variables applied to each of our instances go here,
   // we've provided one for you to get started

   // The image/sprite for our enemies, this uses
   // a helper we've provided to easily load images
   this.sprite = 'images/enemy-bug.png';
   this.x = 0;
   this.y = (randomNum(3,0)*85)+60;
   this.speed = randomNum(150,200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   this.x += (this.speed * dt);
   // console.log(this.x);
   if(this.x > 505){
      this.x = -80;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
   this.sprite = 'images/char-horn-girl.png';
   this.x = 300;
   this.y = 400;
};

Player.prototype.update = function(x = 0, y = 0) {
   this.x += ((this.x + x) > 420) || ((this.x + x) < -5) ? 0 : x;
   this.y += ((this.y + y) > 410) || ((this.y + y) < -12) ? 0 : y;
   if(this.y === -10) this.resetPlayer();
};

Player.prototype.handleInput = function(inputKey) {
   switch (inputKey) {
      case 'left':
         this.update(-101, 0);
         break;
      case 'right':
         this.update(101, 0);
         break;
      case 'up':
         this.update(0, -82);
         break;
      case 'down':
         this.update(0, 82);
         break;
      default:
         this.update(0, 0);
         break;
   }
};

Player.prototype.render = function(){
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayer = function(){
  this.x = 300;
  this.y = 400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(var i = 0; i < 3; i++){
   allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
   var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };

   player.handleInput(allowedKeys[e.keyCode]);
});

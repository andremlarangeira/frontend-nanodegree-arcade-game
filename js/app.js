
/*guarda a maior pontuação alcançada*/
var recorde = 0;

/*calcula um numero randomico para ser usado na velocidade do inimigo
  para que os inimigos tenham velocidade variada*/
var randomNum = function(fator, minimo) {
   return (Math.floor((Math.random() * fator)) + minimo);
}


// Enemies our player must avoid

/*adicionado o parametro linha ao construtor para determinar em qual
  linha da tela o inimigo sera adicionado*/
var Enemy = function(linha) {
   // Variables applied to each of our instances go here,
   // we've provided one for you to get started

   // The image/sprite for our enemies, this uses
   // a helper we've provided to easily load images
   this.sprite = 'images/enemy-bug.png';
   this.x = -80;
   this.y = (linha * 85) + 60;

   /*faz uma chamada a função randomNum para determinar a velocidade
     de cada inimigo*/
   this.speed = randomNum(250, 300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   this.x += ((this.speed + (player.score * 65)) * dt);
   // console.log(this.x);
   if (this.x > 505) {
      this.x = -80;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/* cria a classe Player e inicializa as propriedades da classe */
var Player = function() {
   this.sprite = 'images/char-horn-girl.png';
   this.x = 300;
   this.y = 400;
   this.score = 0;
   this.life = 3;
};


Player.prototype.update = function(x = 0, y = 0) {
   /*adiciona a movimentacao para o personagem e verefica se ele está nos limites da tela
     para nao movimentar para fora da tela*/
   this.x += ((this.x + x) > 420) || ((this.x + x) < -5) ? 0 : x;
   this.y += ((this.y + y) > 410) || ((this.y + y) < -12) ? 0 : y;

   /*verefica se o personagem alcancou a agua, se sim aumenta o placar e reseta o player*/
   if (this.y === -10) {
      console.log("venceu");
      this.score += 1;
      this.resetPlayer();
   }
};

/*verifica a tecla pressionada e passa o parametro para Player.update com a distancia
  certa para a movimentacao do personagem*/
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


Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

   /*adiciona o placar e as vidas do player na tela definindo
     a fonte e a cor dos textos*/
   ctx.font = "30px Arial";
   ctx.fillStyle = 'yellow';
   ctx.fillText("Placar: " + this.score, 10, 575);
   ctx.fillStyle = 'red';
   ctx.fillText("Vidas: " + this.life, 375, 575);

   ctx.font = "40px Arial";
   ctx.fillStyle = 'black';
   ctx.fillText("Recorde: " + recorde, 10, 40);
};

//Plaer volta ao estado inicial
Player.prototype.resetPlayer = function() {
   this.x = 300;
   this.y = 400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//Cria 3 instacias de Enemy e adiciona cada uma ao array allEnemies
for (var i = 0; i < 3; i++) {
   allEnemies.push(new Enemy(i))
}

//cria uma nova instancia de Player
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

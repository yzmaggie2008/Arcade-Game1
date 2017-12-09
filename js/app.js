// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x || 0;
    this.y = y || 0;
    this speed = speed || 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    this.repeat();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//need let the bug showing on the screen repeatly
Enemy.prototype.repeat = function() {
    if (this.x > 500){
        this.x = -100;
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var player = function() {
    this.x = 300;
    this.y = 280;
    this.hasWon = false;
    this.sprite = 'images/char-boy.png';
}

//update the player
player.prototype.update = function(dt) {

}

// Draw the player on the screen, required method for game
player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//checkWin function to protect the users reclick the button 
//after they already click the cancel
player.prototype.checkWin = fucntion() {
    if (this.y < 10 && !this.hasWon) {
        this.hasWon = true;
        setTimeout(function(){
            if (confirm('You Won! Want to try again?')){
                this.reset();
            }
        }.bind(this),500);
    }
}
//the player back to the original position
player.prototype.reset = function() {
    this.x = 300;
    this.y = 280;
    this.hasWon = false;
}

//handling the keyboard control
player.prototype.handleInput = function(key){
    //use map to mapping the keyboard
    var map = {left: handleLeft, right: handleRight, up: handleUp, down: handleDown};
    if (map[key]) {
        map[key](this);
        this.render;
        this.checkWin();
    }

    function handleLeft(range){
        range.x = range.x - 100;
        range.x = Math.max (range.x, 0);
    }

    function handleRight(range){
        range.x = range.x + 100;
        range.x = Math.min(range.x, 400);
    }

    function handleUp(range){
        range.y = range.y - 83;
        range.y = Math.max(range.y, -10);
    }

    function handleDown(range){
        range.y = range.y + 83;
        range.y = Math.min(range.y, 400);
    }


}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0, 60), new Enemy(0, 145, 200), new Enemy(0, 230, 300)];
var player1 = new player();

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

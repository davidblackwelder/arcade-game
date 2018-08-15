// Enemies our player must avoid
class Enemy {
    constructor() {
    this.x = 0;
    this.y = 1;
    this.sprite = 'images/enemy-bug.png';
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 80 - 16); // center enemy objects on all squares
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 5) {
        this.x += 1 * dt; 
    }
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.x = 2;
        this.y = 5;
        this.sprite = 'images/char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 80 - 20); // center player character on all squares
    }

    /*
    * Handle user input for moving player and checking if player is on the edge of canvas to prevent going off screen
    */
    handleInput(input) {
        switch(input) {
            case 'left':
                this.x > 0 ? this.x -= 1 : this.x;
                break;
            case 'right':
                this.x < 4 ? this.x += 1 : this.x;
                break;
            case 'up':
                this.y > 0 ? this.y -= 1 : this.y;
                break;
            case 'down':
                this.y < 5 ? this.y += 1 : this.y;
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
const enemy1 = new Enemy();
const allEnemies = [];
allEnemies.push(enemy1);

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

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 80 - 19); // center enemy objects on all squares
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        if (this.x < 5) {
            this.x += this.speed * dt; 
        } else {
            this.x = -1;
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
        this.moving = false;
        this.win = false;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 80 - 20); // center player character on all squares
        this.moving = false;
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
        this.moving = true;
    }

    update() {
        
        // check for collisions 
        for(let enemy of allEnemies) {
            if(this.y === enemy.y) {
                if(this.x <= enemy.x + 0.5 && this.x >= enemy.x - 0.5) {
                    this.reset();
                }
            }
        }

        // check for win
        if(this.y === 0) {
            this.win = true;
        }
    }

    reset() {
        this.x = 2;
        this.y = 5;
        this.win = false;
        this.moving = false;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
const enemy1 = new Enemy(0, 1, Math.floor(Math.random() * 5) + 1);
const enemy2 = new Enemy(0, 2, Math.floor(Math.random() * 4) + 1);
const enemy3 = new Enemy(0, 3, Math.floor(Math.random() * 3) + 1);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

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

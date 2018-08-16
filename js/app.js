'use strict';

// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Math.floor(1 + Math.random() * 5);
        this.sprite = 'images/enemy-bug.png';
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 80 - 19); // center enemy objects on all squares
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // check if enemy is on last column and moves enemy accordingly
        if (this.x < 5) {
            this.x += this.speed * dt; 
        } else {
            this.x = -1;
        }
    }

    changeSpeed(max) {
        this.speed = 0.5 + Math.random() * max;
    }

    reset () {
        this.changeSpeed(4.0);
        this.x = -(Math.floor(1 + Math.random() * 5));
    }
}

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
                if(this.x <= enemy.x + 0.65 && this.x >= enemy.x - 0.65) {
                    this.reset();
                }
            }
        }

        // check for win
        if(this.y === 0) {
            this.win = true;
        }
    }

    // resets player to starting square and resets win and moving properties
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
const allEnemies = [
    new Enemy(0, 1),
    new Enemy(0, 2),
    new Enemy(0, 3)
];

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

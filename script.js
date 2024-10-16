const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    color: 'red',
    yVelocity: 0,
    xVelocity: 0,
    onGround: true
};
const gravity = 0.5;
const platforms = [
    { x: 0, y: 350, width: 800, height: 50 }
];
const keys = {};

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.yVelocity += gravity;

    if (player.y + player.height > platforms[0].y) {
        player.y = platforms[0].y - player.height;
        player.yVelocity = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }

    if (keys['ArrowLeft']) {
        player.xVelocity = -5;
    } else if (keys['ArrowRight']) {
        player.xVelocity = 5;
    } else {
        player.xVelocity = 0;
    }
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Draw platforms
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Control player movement
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    if (event.code === 'Space' && player.onGround) {
        player.yVelocity = -10;
        player.onGround = false;
    }
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Start the game loop
gameLoop();

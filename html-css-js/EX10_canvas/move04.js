const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let key = {
    right: false,
    left: false,
    up: false,
    down: false
}

let player = {
    x: 0,
    y: 0,
    size: 50,
    color: 'blue',
    speed: 5
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 80;
        this.color = "green";
    }
};
let enemy = [4];
for (let i = 0; i < 4; i++) {
    let x = canvas.width / 8 * ((i + 1) * 2 - 1) - 40;
    let y = canvas.height / 2 - 40;
    enemy[i] = new Enemy(x, y);
}


function keyHandler(e, value) {
    if (e.key === "ArrowRight") {
        key.right = value;
    } else if (e.key === "ArrowDown") {
        key.down = value;
    } else if (e.key === "ArrowUp") {
        key.up = value;
    } else if (e.key === "ArrowLeft") {
        key.left = value;
    }
}

document.addEventListener("keydown", e => {
    keyHandler(e, true);
})

document.addEventListener("keyup", e => {
    keyHandler(e, false);
})

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObj(player);
    for (let i = 0; i < 4; i++) {
        drawObj(enemy[i]);
    }
    movePlayer();
}

function drawObj(o) {
    ctx.beginPath();
    ctx.rect(o.x, o.y, o.size, o.size);
    ctx.fillStyle = o.color;
    ctx.fill();
    ctx.closePath();
    boxRed();
}

function movePlayer() {
    if (key.right && player.x < canvas.width - player.size) {
        player.x += player.speed;
    } else if (key.up && player.y > 0) {
        player.y -= player.speed;
    } else if (key.left && player.x > 0) {
        player.x -= player.speed;
    } else if (key.down && player.y < canvas.height - player.size) {
        player.y += player.speed;
    }
}

function boxRed() {
    for (let i = 0; i < 4; i++) {
        if (player.x + player.size > enemy[i].x && player.x < enemy[i].x + enemy[i].size &&
            player.y + player.size > enemy[i].y && player.y < enemy[i].y + enemy[i].size) {
            enemy[i].color = 'red';
        } else {
            enemy[i].color = "green";
        }
    }
}

setInterval(draw, 10);
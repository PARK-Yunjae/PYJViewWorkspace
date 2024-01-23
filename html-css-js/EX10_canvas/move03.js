const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
let key = {
    'right': false,
    'left': false,
    'up': false,
    'down': false
};

let player = {
    x: 0,
    y: 0,
    size: 50,
    color: 'blue'
};

let enemy = {
    x: canvas.width / 2 - 40,
    y: canvas.height / 2 - 40,
    size: 80,
    color: 'green'
};

let draw = () => {
    playerDraw();
    enemydraw();
}

function playerDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
    ctx.fill();

    movePlayer();

}

function enemydraw() {
    ctx.beginPath();
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    ctx.fill();
}


function movePlayer() {

    if (player.x + player.size > enemy.x && player.x < enemy.x + enemy.size &&
        player.y + player.size > enemy.y && player.y < enemy.y + enemy.size) {
        enemy.color = 'red';
    } else {
        enemy.color = "green";
    }

    if (key.right && player.x < canvas.width - player.size) {
        player.x += 5;
    } else if (key.down && player.y < canvas.height - player.size) {
        player.y += 5;
    } else if (key.up && player.y > 0) {
        player.y -= 5;
    } else if (key.left && player.x > 0) {
        player.x -= 5;
    }
}

document.addEventListener("keydown", e => {
    if (e.key === 'ArrowRight') {
        key.right = true;
    } else if (e.key === 'ArrowDown') {
        key.down = true;
    } else if (e.key === 'ArrowUp') {
        key.up = true;
    } else if (e.key === 'ArrowLeft') {
        key.left = true;
    }

})

document.addEventListener("keyup", (e) => {
    if (e.key === 'ArrowRight') {
        key.right = false;
    } else if (e.key === 'ArrowDown') {
        key.down = false;
    } else if (e.key === 'ArrowUp') {
        key.up = false;
    } else if (e.key === 'ArrowLeft') {
        key.left = false;
    }
})

setInterval(draw, 10);
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let key = {
    right: false,
    left: false,
    up: false,
    down: false
}

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    size: 30,
    color: "blue",
    speed: 5
}

let enemys = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObj(player);
    for (let e of enemys) {
        e.y += e.speed;
        drawObj(e);
    }
    for (let e of enemys) {
        crashBox(e);
    }
    enemys.sort((a, b) => a.y - b.y)
    movePlayer();
}

let intervalEnemy = setInterval(() => {
    for (let i = 0; i < 3; i++) {
        let sp = parseInt(Math.random() * 5 + 2);
        let px = parseInt(canvas.width / 8 * parseInt((Math.random() * 8 + 1))) - 40;
        enemys.push({
            x: px,
            y: 0,
            speed: sp,
            size: 30,
            color: "green"
        });
    }
}, 1000)

function drawObj(obj) {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = obj.color;
    ctx.fill();
    ctx.closePath();
}

function handler(e, value) {
    if (e.key === "ArrowRight") key.right = value;
    else if (e.key === "ArrowLeft") key.left = value;
    else if (e.key === "ArrowUp") key.up = value;
    else if (e.key === "ArrowDown") key.down = value;
}

document.addEventListener("keydown", e => {
    handler(e, true);
})

document.addEventListener("keyup", e => {
    handler(e, false);
})

function movePlayer() {
    if (key.right && player.x < canvas.width - player.size) {
        player.x += player.speed;
    }
    if (key.left && player.x - player.size > 0) {
        player.x -= player.speed;
    }
    if (key.down && player.y < canvas.height - player.size) {
        player.y += player.speed;
    }
    if (key.up && player.y - player.size > 0) {
        player.y -= player.speed;
    }
}

function crashBox(e) {
    // 네모용
    // if (player.x + player.size > e.x && player.x < e.x + e.size &&
    //     player.y + player.size > e.y && player.y < e.y + e.size) {
    //     e.color = "red";
    //     // setInterval(() => {
    //     //     clearInterval(interval);
    //     //     clearInterval(intervalEnemy);
    //     // }, 11);
    // } else {
    //     e.color = "green";
    // }
    // 동그라미용
    let line = Math.pow(player.x - e.x, 2) + Math.pow(player.y - e.y, 2);
    if (Math.sqrt(line) < e.size * 2) {
        e.color = "red";
    } else {
        e.color = "green";
    }
}

let interval = setInterval(draw, 10);
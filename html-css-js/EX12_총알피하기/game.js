const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const start = document.querySelector(".startBtn");
// 정중앙에 위치시키기
let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 25,
    size: 50,
    speed: 3
};
let key = {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false
}
let imgReady = false;
let playerImg = new Image();
playerImg.src = './img/bug.png';
let backgroundImg = new Image();
backgroundImg.src = './img/background1.png';
let bulletList = null;
let interval = null;

function init() {
    start.addEventListener("click", () => {
        bulletList = [];
        createBullets(20);
        player.x = canvas.width / 2 - 25;
        player.y = canvas.height / 2 - 25;
        isOver = false;
        key = {
            ArrowRight: false,
            ArrowLeft: false,
            ArrowUp: false,
            ArrowDown: false
        }
        start.style.display = "none";
        interval = setInterval(render, 10);
        imgReady = true;
    })
    playerImg.addEventListener("load", () => {
        imgReady = false;
    })
    document.addEventListener("keydown", e => keyHandler(e, true));
    document.addEventListener("keyup", e => keyHandler(e, false));
}
window.onload = function () {
    ctx.drawImage(backgroundImg, back, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    ctx.beginPath();
    //이미지객체 , 시작좌표x, y  이미지크기 가로   세로 
    ctx.rect(player.x, player.y, player.size, player.size);
    ctx.fill();
    ctx.fillStyle = "green";
    ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
    //ctx.fill();
    ctx.closePath();
}

function keyHandler(e, value) {
    if (key[e.key] !== undefined) {
        key[e.key] = value;
    }
}

function createBullets(size) {
    bulletList = [];
    for (let i = 0; i < size; i++) {
        let bullet = new Bullet();
        bullet.init(player.x, player.y);
        bulletList.push(bullet);
    }

}

function movePlayer() {
    if (key.ArrowRight && player.x < canvas.width - player.size) {
        player.x += player.speed;
    }
    if (key.ArrowDown && player.y < canvas.height - player.size) {
        player.y += player.speed;
    }
    if (key.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (key.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
}

let isOver = false;
let back = 0;

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, back, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, back - canvas.width, 0, canvas.width, canvas.height);
    back += 1;
    if (back > canvas.width) {
        back = 0;
    }
    if (!imgReady) return;
    drawPlayer();
    movePlayer();
    bulletList.forEach(bull => bull.render(ctx));
    bulletList.forEach(bull => bull.update(player.x, player.y))
    bulletList.forEach(bull => {
        if (bull.isCollistion(player.x + player.size / 2, player.y + player.size / 2, player.size / 2)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            back = 0;
            ctx.drawImage(backgroundImg, back, 0, canvas.width, canvas.height);
            start.style.display = "block";
            if (!isOver) alert("게임 오버");
            isOver = true;
            clearInterval(interval);
            // ctx.fillStyle = "red";
        }
    })
}

init();
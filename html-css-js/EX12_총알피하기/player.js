export default class Player {
    constructor(x, y) {
        this.img = new Image();
        this.img.src = "./img/bug.png";
        this.img.addEventListener("load", () => {
            this.ready = true;
        })
        this.ready = true;
        this.size = 40;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.key = {
            ArrowRight: false,
            ArrowLeft: false,
            ArrowUp: false,
            ArrowDown: false
        }
        this.addEvent();
    }

    addEvent() {
        window.addEventListener("keydown", e => {
            this.handler(e, true);
        })

        window.addEventListener("keyup", e => {
            this.handler(e, false);
        })
    }

    handler(e, value) {
        if (e.code === "ArrowRight") {
            this.key.ArrowRight = value;
        }
        if (e.code === "ArrowLeft") {
            this.key.ArrowLeft = value;
        }
        if (e.code === "ArrowDown") {
            this.key.ArrowDown = value;
        }
        if (e.code === "ArrowUp") {
            this.key.ArrowUp = value;
        }
    }

    update(canvas) {
        if (!this.ready) return;
        if (this.key.ArrowRight && this.x < canvas.width - this.size) {
            this.x += this.speed;
        }
        if (this.key.ArrowLeft && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.key.ArrowDown && this.y < canvas.height - this.size) {
            this.y += this.speed;
        }
        if (this.key.ArrowUp && this.y > 0) {
            this.y -= this.speed;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
}
class Game1To50 {
    constructor() {
        this.frontList = [];
        this.backList = [];
        this.gameNum = 1;
        this.gameTime = 0;
        this.gameBtn = document.querySelector("#start");
        this.cont = document.querySelector(".container");
        this.timer;
        this.divs = [];
        this.interval;
        this.colorinterval;
        this.init();
    }

    init() {
        this.eventGameStart();
    }

    eventGameStart() {
        this.gameBtn.addEventListener('click', () => {
            this.winner();
            this.gameNum = 1;
            this.createMap();
            this.timer = document.querySelector(".timer");
            this.shuffle();
            this.startGame();
            let dt = new Date();
            this.gameTime = dt.getTime();
            this.liveTimer();
            this.divEvent();
        });
    }

    divEvent() {
        this.divs.forEach((e) => {
            e.addEventListener('click', () => {
                this.answer(e);
                this.winner();
            })
        })
    }
    winner() {
        if (this.gameNum > 50) {
            clearInterval(this.interval);
            clearInterval(this.colorinterval);
            this.cont.innerHTML = `
                <button id="start">다시 시작</button>
                <div class="timerText">${this.timer.innerHTML}</div>
            `;
            this.gameBtn = document.querySelector("#start");
            this.eventGameStart();
            this.timer.innerHTML = "";
        }
    }

    answer(e) {
        if (e.innerHTML == this.gameNum) {
            if (this.gameNum < 26) {
                e.innerHTML = this.backList[this.backList.length - 1];
                this.backList.pop();
            } else {
                e.style.backgroundColor = "white";
                e.innerHTML = "";
            }
            this.gameNum++;
        } else {
            for (let i = 0; i < this.frontList.length; i++) {
                if (this.divs[i].innerHTML == this.gameNum) {
                    this.colorinterval = setTimeout(() => {
                        this.divs[i].style.backgroundColor = "skyblue";
                    }, 100);
                    this.divs[i].style.backgroundColor = "pink";
                    break;
                }
            }
        }
    }

    printTimer(time) {
        let milSec = parseInt(time % 1000 / 10);
        milSec = milSec < 10 ? "0" + milSec : milSec;
        let sec = parseInt((time / 1000) % 60);
        sec = sec < 10 ? "0" + sec : sec;
        let min = parseInt((time / 1000) / 60);
        min = min < 10 ? "0" + min : min;
        this.timer.innerHTML = min + " : " + sec + " : " + milSec;
    }

    liveTimer() {
        this.interval = setInterval(() => {
            let liveTime = new Date();
            let time = liveTime.getTime() - this.gameTime;
            this.printTimer(time);
        }, 10)
    }

    startGame() {
        this.divs = [...document.querySelectorAll(".box")];
        let num = 0;
        this.divs.forEach((e) => {
            e.innerHTML = this.frontList[num++];
        })
    }

    shuffle() {
        let frontNum = [];
        let backNum = [];
        let num = 1;

        while (num <= 50) {
            num < 26 && frontNum.push(num++);
            num >= 26 && backNum.push(num++);
        }

        for (let i = 0; i < 100; i++) {
            num = parseInt(Math.random() * 25);

            let data = frontNum[0];
            frontNum[0] = frontNum[num];
            frontNum[num] = data;

            data = backNum[0];
            backNum[0] = backNum[num];
            backNum[num] = data;
        }

        this.frontList = frontNum;
        this.backList = backNum;
    }

    createMap() {
        this.cont.innerHTML = `       
        <div class="timer"></div>
        <div class="boxs">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
        </div>`;
    }
}

const game = new Game1To50();
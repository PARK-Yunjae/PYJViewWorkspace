const btn = document.querySelector('button');
const maps = document.querySelectorAll('td');
let map = [9];
let turn = 0;
let cnt = 0;
let end = true;

window.onload = function () {
    mapReset();
}

function mapReset() {
    for (let i = 0; i < 9; i += 1) {
        map[i] = 0;
        maps[i].classList.remove('o');
        maps[i].classList.remove('x');
        maps[i].innerText = '';
        turn = 0;
        document.querySelector('label').innerText = "";
        document.querySelector('label').style.top = '0';
        document.querySelector('label').style.opacity = 0;
        end = true;
        cnt = 0;
    }
    document.querySelector('table').style.opacity = 1;
}

btn.addEventListener('click', (e) => {
    mapReset();
})

maps.forEach(e => {
    e.addEventListener('click', () => {
        if (map[e.id] == 0 && end) {
            if (turn == 0) {
                e.classList.add('o');
                e.innerText = 'O';
                turn = 1;
                map[e.id] = 1;
            } else if (turn == 1) {
                e.classList.add('x');
                e.innerText = 'X';
                turn = 0;
                map[e.id] = 2;
            }
            cnt++;
        }
        let ck1 = endGame(1);
        let ck2 = endGame(2);
        if (ck1) {
            setTimeout(() => {
                win("O 승리");
            }, 1000);
        } else if (ck2) {
            setTimeout(() => {
                win("X 승리");
            }, 1000);
        }
        if (cnt > 8 && end) {
            setTimeout(() => {
                win("무승부");
            }, 1000);
        }
    })
})

function ㅁ() {
    console.log("도움");
}

function win(str) {
    setTimeout(ㅁ, 1000);
    document.querySelector('label').innerText = str;
    document.querySelector('table').style.opacity = 0;
    document.querySelector('label').style.top = '50%';
    document.querySelector('label').style.opacity = 1;
    end = false;
}

function endGame(num) {
    for (let i = 0; i < 9; i += 3) {
        if (map[i] == num && map[i + 1] == num && map[i + 2] == num) {
            return true;
        }
    }
    for (let i = 0; i < 3; i += 1) {
        if (map[i] == num && map[i + 3] == num && map[i + 6] == num) {
            return true;
        }
    }
    if (map[0] == num && map[4] == num && map[8] == num) {
        return true;
    }
    if (map[2] == num && map[4] == num && map[6] == num) {
        return true;
    }
}
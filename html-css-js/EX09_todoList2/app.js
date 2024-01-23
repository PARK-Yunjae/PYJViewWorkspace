class App {
    constructor() {
        this.listDom = document.querySelector("#list");
        // this.todoList = []; //작업들을 저장하는 배열
        this.todoList = [];
        this.titleInput = document.querySelector("#title");
        this.contentInput = document.querySelector("#content");
        this.garbage = document.querySelector("#garbage");
        this.msgBox = document.querySelector(".msg-box");
        this.addBtn = document.querySelector("#addBtn");
        this.items = document.querySelector(".item");
        this.delItem = 0;
        this.init();
    }

    // 초기 값 
    init() {
        this.localLoad();
        this.addDom();
        this.dragItem();
        this.delTodo();

        this.addBtn.addEventListener("click", (e) => {
            if (!this.titleInput.value) {
                alert("제목이 비었음");
            } else if (!this.contentInput.value) {
                alert("내용이 비었음");
            } else {
                this.localLoad();
                this.addTodo();
                this.localSave();
                this.addDom();
                this.msgboxOpen("추가");
            }
        });
    };

    localSave() {
        localStorage.setItem("todo_list", JSON.stringify(this.todoList));
    }

    // 로컬스토리에서 저장되는 값 가져오는것
    localLoad() {
        this.todoList = localStorage.getItem("todo_list") ?
            JSON.parse(localStorage.getItem("todo_list")) : [];
        // console.log(this.todolist);
    }
    msgboxOpen(msg) {
        setTimeout(() => {
            this.msgBox.className = "msg-box";
        }, 1000);
        this.msgBox.className = "msg-box on";
        this.msgBox.innerHTML = msg;
    }

    // todo값 추가하는 것 
    addTodo() {
        const todo1 = new todo(this.todoList.length, this.titleInput.value, this.contentInput.value);
        this.todoList.push(todo1);
    }

    dragItem() {
        this.items = [...document.querySelectorAll(".item")];
        this.items.forEach(item => {
            item.addEventListener('dragstart', e => {
                e.dataTransfer.setData('num', e.target.getAttribute('data-idx'));
            })
        })
    }

    // html에서 dom 객체 만드는것 
    addDom() {
        let data = "";
        for (let i = 0; i < this.todoList.length; i += 1) {
            data +=
                `<div>
                <div class="item" data-idx="${this.todoList[i].idx}" draggable="true">
                    <h4 class="title">${this.todoList[i].title}</h4>
                    <span class="msg">${this.todoList[i].content}</span>
                </div>
            </div>`;
        }
        this.listDom.innerHTML = data;
    }

    //todo값 삭제하기 
    delTodo() {
        this.garbage.addEventListener('dragover', e => {
            e.preventDefault();
        })

        this.garbage.addEventListener("drop", e => {
            e.preventDefault();
            let item = e.dataTransfer.getData('num');
            if (item != -1) {
                this.todoList.splice(item, 1);
            }
            this.localSave();
            this.addDom();
            this.msgboxOpen("삭제");
        })
    }
}

class todo {
    constructor(num, title, content) {
        this.idx = num;
        this.title = title;
        this.content = content;
    }
}

const app = new App();
const textEnter = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_btn');
const delBtn = document.querySelectorAll('.item_delete');
const items = document.querySelector('.items');;


function isNameValue(name) {
    const itemNames = [...document.querySelectorAll('.item_name')];
    if (itemNames.find(e => name === e.innerText) != undefined) {
        return true;
    }

    return false;
}

function addTodoList() {
    let itemNames = document.querySelectorAll('.item_name');
    let num = itemNames.length + 1;

    let name = textEnter.value.replaceAll(' ', '');
    if (name == "") {
        alert("값이 없음");
        return;
    }
    if (isNameValue(name)) {
        alert("중복");
        return;
    }

    const li = document.createElement('li');
    li.setAttribute("class", "item_row");
    li.setAttribute("data-id", `${num}`);

    let div = document.createElement('div');
    div.setAttribute("class", "item");

    let span = document.createElement('span');
    span.setAttribute("class", "item_name");
    span.innerText = name;

    let button = document.createElement('button');
    button.setAttribute("class", "item_delete");

    let i = document.createElement('i');
    i.setAttribute("class", "fa-solid fa-trash-can");

    button.addEventListener('click', e => {
        delTodoList(e);
    })

    button.appendChild(i);
    div.appendChild(span);
    div.appendChild(button);
    li.appendChild(div);

    items.appendChild(li);
}

function delTodoList(e) {
    //부모 태그 찾기
    var parentTrTag = e.target;
    //부모 태그 명이 TR이 나올때까지 자동순회
    for (; parentTrTag.nodeName != 'LI'; parentTrTag = parentTrTag.parentElement);
    //순회 종료 후 배경 색상 변경
    parentTrTag.remove();
}

addBtn.addEventListener('click', () => {
    addTodoList();
});

textEnter.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodoList();
    }
});



window.onload = function () {
    const itemrows = document.querySelectorAll('.item_delete');
    itemrows.forEach((e) => {
        e.addEventListener('click', e => {
            delTodoList(e);
        })
    });
}
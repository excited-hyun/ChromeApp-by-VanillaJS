const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");
    //querySelector: html에서 필요한걸 얻음

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos
    saveToDos();    //toDos를 먼저 바꾸고 저장해줘야함
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //LS에는 JS의 data 저장 불가 -> JSON.stringify()사용
    //JS의 object를 string으로 바꿔 줌
}

function paintToDo(text){
    const li = document.createElement("li");
    //createElement: html에 element 생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌"
    delBtn.addEventListener("click", deleteToDo);
    //삭제버튼 눌리면 deleteToDo함수 실행

    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    //버튼이 할일 왼쪽에 뜨게 하기위해 버튼을 먼저 넣어줌
    li.id = newId;      //할일을 선택해서 지우기 위해 li에도 id 줌

    toDoList.appendChild(li);
    
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);    //toDos array안에 toDoObj 넣음
    saveToDos();            //local storage에 저장
    //그러나 LS에는 JS의 data 저장 불가 -> JSON.stringify()사용
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    
}

function something(toDo){
    paintToDo(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){     //todo === null일 때는 아무것도 할 필요 없음
        
        const parsedToDos = JSON.parse(loadedToDos);    //string -> JS object
        parsedToDos.forEach(something);
        /*
        parsedToDos.forEach(function(toDo)) {
            paintToDo(toDo.text);
        });
        */  //이렇게 쓰는것도 가능 array, object, string 모두 function 가질 수 있음
    }
    
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
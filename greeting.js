const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}
function handleSubmit(event){
    event.preventDefault();     //default는 event발생하면 거품처럼 올라가서 새로고침 되게 되어있음
    //이건 새로고침되는 걸 막아줌
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue);    //여기까지만하면 나를 기억하지 못 함
    saveName(currentValue);     //내 이름 local storage에 저장
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){    //No user
        askForName();
    }
    else{           //user exist
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}

init();
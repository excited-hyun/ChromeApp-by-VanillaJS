const body = document.querySelector("body");

const IMG_NUMBER = 8;

function paintImage(imgNumber){
    const image = new Image();
    image.src =  `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    number = Math.floor(Math.random() * 8); //0~7
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
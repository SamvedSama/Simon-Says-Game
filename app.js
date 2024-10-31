let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let body = document.querySelector("body");
let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",buttonPress);
}


let btns = ["yellow","purple","red","green"];

let h2 = document.querySelector("h2");

gameStart();

function gameStart(){
    document.addEventListener("keypress",function(){
        if(started==false){
            body.classList.remove("gameover");
            started = true;
            levelUp();
        }
    });
}

function gameFlash(btn){
    btn.classList.add("flash"); 
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
};

function userFlash(btn){
    btn.classList.add("userflash"); 
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
};

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randInd = Math.floor(Math.random()*3);
    let randCol = btns[randInd];
    gameSeq.push(randCol);
    let randBtn = document.querySelector(`.${randCol}`);
    gameFlash(randBtn);
};

function buttonPress(){
    let btn = this;
    userFlash(btn);
    let usrCol = btn.getAttribute("id");
    userSeq.push(usrCol);
    checkAns(userSeq.length-1);
}

function checkAns(ind){
    if(userSeq[ind]===gameSeq[ind]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,900);
        }
    }else{
        body.classList.add("gameover");
        if(level>highScore){
            highScore = level;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press Any Key to Start Again. <br> Highest Score: ${highScore}`
        gameOver();
    }
}

function gameOver(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    gameStart();
}
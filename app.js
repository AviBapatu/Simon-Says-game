let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red","purple","green"];

let started = false;
let level = 0;
let hs = 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#highScore");

// Show instructions modal when page loads
window.addEventListener('load', function() {
    let instructionsModal = new bootstrap.Modal(document.getElementById('instructionsModal'));
    instructionsModal.show();
});

document.addEventListener("keypress",function(){
    if(started == false){
    console.log("gamestart");
    started = true;
    levelUp();
    }
})

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function gameFlash(btn){
     btn.classList.add("flash");
     setTimeout(function(){
        btn.classList.remove("flash");
     },200);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
       btn.classList.remove("userFlash");
    },200);
}

function levelUp()
{
    userSeq = [];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000);
        }
        
    } else {
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor ="#121212";
        },150);
        if(hs<level)
        {
            hs = level;
            highScoreDisplay.textContent = hs;
        }
       h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start.`;
        reset();
    }
}

function btnPress()
{
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}


function reset()
{
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
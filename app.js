let gameSeq = [];
let userSeq = [];

let btns = ["red","green","yellow","purple"];

let started = false;
let level = 0;

// step - 1  ; to start the game 

let h2 = document.querySelector("h2");


document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game started");  // for our reference 
        started=true;

        levelUp();   // end of step - 1
    }
});
function gameFlash(btn){            // this function will make the button flash as soon as the level begins
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250 );
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250 );
}

// step - 2  ; to go to the next level
function levelUp(){
    userSeq = [];    // after every level the user sequence should become empty 
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); // Make sure that the elements in the btns array match the classnames (colors) 
    gameSeq.push(randColor);
    gameFlash(randBtn);  // end of step - 2 
}
function checkAns(idx){    // step - 4 ' to check if user sequence and game sequence matches 
   
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
   
        },150);
        reset();     // step - 5 ; reset if failed to clear the level
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);          // here we add the color clicked by the user to the userSeq array
    checkAns(userSeq.length-1);       
}

// step - 3 ; when the user clicks on a button after a button is flashed
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

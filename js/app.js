let board= document.querySelector(".board");
let resetButton = document.querySelector(".reset-btn");
let foodX;
let foodY;
let snakeX;
let snakeY;
let snakeBody = [];
let velocityX = 0;
let velocityY = 0;
let gameOver = false;
let setIntervalId;
let gameOverSound = new Audio("gameover.mp3")
let eatFoodSound = new Audio("eat.mp3")
let backgroundMusic = new Audio("backgroundaudio.mp3")
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

function rendomFoodPosition () {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}

function moveSnake (event) {
    // console.log(event)
    if (event.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else
     if (event.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else
     if (event.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } 
     if (event.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    } 
    main()
}

function showGameOver () {
        clearInterval(setIntervalId)
        document.removeEventListener("keydown", moveSnake)
        gameOverSound.play()
        backgroundMusic.pause(); 
        document.getElementById("gameOverMessage").style.display = "block";
}
//=====================
function randomSnakePosition() {
    snakeX = Math.floor(Math.random() * 20) + 1;
    snakeY = Math.floor(Math.random() * 20) + 1;
}
//=======================

function main() {
    if(gameOver) {
        return showGameOver()
    }

    if (snakeX === foodX && snakeY === foodY) {
        rendomFoodPosition()
        eatFoodSound.play();
        snakeBody.push([foodX,foodY])
        console.log(snakeBody);
    }
    for (let i = snakeBody.length-1; i > 0; i-- ){
        snakeBody[i] = snakeBody[i -1];
        }
    let setHtml = `<div class="food" style="grid-area: ${foodY}/${foodX}";></div>`
    snakeX += velocityX;
    snakeY += velocityY;
    snakeBody[0] = [snakeX,snakeY]
    for (let i = 0; i < snakeBody.length; i++) {
       setHtml += `<div class="snake-head" id="div${i}" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}";></div>`
       if(i!=0 && snakeBody[0][1]=== snakeBody[i][1] && snakeBody[0][0]=== snakeBody[i][0]) {
        gameOver = true;
       }
        }

    if (snakeX<=0 || snakeX>20 || snakeY<=0 || snakeY >20) {
        gameOver = true;
    }    
    board.innerHTML = setHtml;
}

function resetGame () {
    clearInterval(setIntervalId);
    // snakeX = 3;
    // snakeY = 7;
    //==============
    randomSnakePosition();
    //===============
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    gameOver = false;
    rendomFoodPosition();
    document.addEventListener("keydown", moveSnake);
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    document.getElementById("gameOverMessage").style.display = "none";
    main();
    setIntervalId = setInterval(main, 300);
}

rendomFoodPosition()
main();
setIntervalId = setInterval(main, 300);
document.addEventListener("keydown", moveSnake);
resetButton.addEventListener("click", resetGame);
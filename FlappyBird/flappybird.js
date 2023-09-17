console.log("flappy bird with js");

//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 34; 
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipe
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

//physics
let velocityX = -2;
let velocityY = 0;
let gravitiy = 0.1;

let gameOver = false;

window.onload = () => {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "./image/bird.png";
    birdImg.onload = () => {
        context.fillRect(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0,0, board.width, board.height);

    velocityY += gravitiy;
    bird.y = Math.max(bird.y + velocityY, 0);

    context.fillStyle = "green";
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.fillStyle = "green";
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height)
    
        if(detectCollision(bird, pipe)){
            gameOver = true;
        }
    }
}

function placePipes() {
    if(gameOver){
        return;
    }

    let randomPipeY = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        x : pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height: pipeHeight,
        passed : false
    }

    pipeArray.push(bottomPipe);
}

function moveBird(keyCode) {
    if(keyCode.code == "Space"){
        velocityY = -4;
    }
}

function detectCollision(a,b) {
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}
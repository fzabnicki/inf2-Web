window.addEventListener('deviceorientation', onDeviceOrientationChange);
var documentHeight = document.documentElement.clientHeight;
var documentWidth = document.documentElement.clientWidth;
var holes = document.getElementsByClassName("hole");
var ball = document.querySelector("#ball");
var timer = document.getElementById("seconds")
var appendTens =document.querySelector('#tens')
var startButton = document.querySelector('#startButton');
var scoreValue = document.querySelector('#scoreValue');
startButton.addEventListener('click', StartTheGame);
var posX = 10, posY = 10;
var playing = false, gameIsOn = false;
var seconds = 00; 
var tens = 00; 
var Interval ;
var score = 0;

//czas gry!

let acceleration = {
    x: 0,
    y: 0
}
function StartTheGame(){
    startButton.hidden = true;
    gameIsOn = true;
    tens = "00";
    seconds = "00";
    timer.innerHTML = seconds;
    AppInit();
    RandomPositionAllHoles();
    BallMovment();
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}
function  onDeviceOrientationChange(ev) {
    console.log(ev);
    acceleration.x = ev.alpha /40;
    acceleration.y = ev.beta /40;
}
function BallMovment(){
    if(gameIsOn){
        if(posY + acceleration.y>2 && posY + acceleration.y < documentHeight -70){
            posY += acceleration.y;
            ball.style.top = posY + 'px';
            var currentTopPos = parseInt(ball.style.top,10) +35;
        }
        if(posX + acceleration.x >2 && posX + acceleration.x < documentWidth -70){
            posX += acceleration.x;
            ball.style.left = posX + 'px';
            var currentLeftPos = parseInt(ball.style.left,10) +35;
        }
        if(playing == true){
            for(hole of holes){
                var holeLeftPos = parseInt(hole.style.left, 10) +52;
                var holeTopPos = parseInt(hole.style.top, 10) +52;
                var pitagorasWidth = currentLeftPos >= holeLeftPos ? currentLeftPos - holeLeftPos : holeLeftPos - currentLeftPos;
                var pitagorasHeight = currentTopPos >= holeTopPos ? currentTopPos - holeTopPos : holeTopPos - currentTopPos;
                var distance = Math.hypot(pitagorasWidth, pitagorasHeight);
                if (distance < 87){
                    if(hole.id == "gloryHole"){
                        score++;
                        scoreValue.textContent = "Score:"+score;
                        clearInterval(Interval)
                        ResetGame();
                    }
                    else{
                        score =0;
                        scoreValue.textContent = "Score:"+score;
                        clearInterval(Interval)
                        ResetGame();
                    }
                }
            }
        }
        window.requestAnimationFrame(BallMovment);
        playing =true;
    }
}
function AppInit() {
    ball.style.top = 10 + "px";
    ball.style.left = 10 + "px";
}
function ResetGame(){
    AppInit();
    startButton.hidden = false;
    gameIsOn = false;
    posX = 10;
    posY = 10;
}
function RandomPositionAllHoles(){
    for(hole of holes){
        var posy = Math.floor(Math.random() * (documentWidth - 156)) + 52;
        var posx = Math.floor(Math.random() * (documentHeight - 156)) + 52;
        hole.style.top = posx + "px";
        hole.style.left = posy + "px";
    }
}
function startTimer () {
    tens++; 
    if(tens < 9){
        appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9){
        appendTens.innerHTML = tens;
    } 
    if (tens > 99) {
        console.log("seconds");
        seconds++;
        timer.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9){
        timer.innerHTML = seconds;
    }
}
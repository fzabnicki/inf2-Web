const recordStart = Date.now();
channel = [], channel2 = [], channel3 = [], channel4 = [];
playing = false, playing2 = false, playing3 = false, playing4 = false;
document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#playBtn').addEventListener('click', function(){playChannel(channel)})
document.querySelector('#startBtn').addEventListener('click', function(){startRecord(1)})
document.querySelector('#stopBtn').addEventListener('click', function(){stopRecord(1)})
document.querySelector('#resetBtn').addEventListener('click', function(){resetArray(1)})

document.querySelector('#playBtn2').addEventListener('click', function(){playChannel(channel2)})
document.querySelector('#startBtn2').addEventListener('click', function(){startRecord(2)})
document.querySelector('#stopBtn2').addEventListener('click', function(){stopRecord(2)})
document.querySelector('#resetBtn2').addEventListener('click', function(){resetArray(2)})

document.querySelector('#playBtn3').addEventListener('click', function(){playChannel(channel3)})
document.querySelector('#startBtn3').addEventListener('click', function(){startRecord(3)})
document.querySelector('#stopBtn3').addEventListener('click', function(){stopRecord(3)})
document.querySelector('#resetBtn3').addEventListener('click', function(){resetArray(3)})

document.querySelector('#playBtn4').addEventListener('click', function(){playChannel(channel4)})
document.querySelector('#startBtn4').addEventListener('click', function(){startRecord(4)})
document.querySelector('#stopBtn4').addEventListener('click', function(){stopRecord(4)})
document.querySelector('#resetBtn4').addEventListener('click', function(){resetArray(4)})

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
function onKeyPress(ev){
    let sound;
    let soundName;
    switch(ev.code)
    {
        case 'KeyA':
            soundName = 'boom';
            sound = document.querySelector('#boom');
            break;
        case 'KeyS':
            soundName = 'clap';
            sound = document.querySelector('#clap');
            break;
        case 'KeyD':
            soundName = 'hihat';
            sound = document.querySelector('#hihat');
            break;
        case 'KeyF':
            soundName = 'kick';
            sound = document.querySelector('#kick');
            break;
        case 'KeyG':
            soundName = 'openhat';
            sound = document.querySelector('#openhat');
            break;
        case 'KeyQ':
            soundName = 'ride';
            sound = document.querySelector('#ride');
            break;
        case 'KeyW':
            soundName = 'snare';
            sound = document.querySelector('#snare');
            break;
        case 'KeyE':
            soundName = 'tink';
            sound = document.querySelector('#tink');
            break;
        case 'KeyR':
            soundName = 'tom';
            sound = document.querySelector('#tom');
            break;
    }
    if (sound){
        const keyPressTime = Date.now() - recordStart;
        const recordedSound = {
            sound: soundName, 
            time :keyPressTime
        }
        if(playing){
            channel.push(recordedSound);
        }
        if(playing2){
            channel2.push(recordedSound);
        }
        if(playing3){
            channel3.push(recordedSound);
        }
        if(playing4){
            channel4.push(recordedSound);
        }
        sound.play();
    }
}
function playChannel(channel){
    timestamps = [];
    timestamps [0] = 1;
    let soundstoplay = channel.map(a => a.sound)
    let timetoplay = channel.map(a => a.time);
    for(x=0;x<channel.length; x++){
        timestamps[x+1] = timetoplay[x+1] - timetoplay[x];
    }
    const doTheJob = async () =>{
        for(x=0; x<soundstoplay.length; x++){
            await sleep(timestamps[x]);
            playSound(soundstoplay[x]);
        }
    }
        doTheJob();
}
function playSound(soundName){
    const sound = document.querySelector('#'+soundName);
    sound.play();
}
function startRecord(number){
    switch (number) {
        case 1:
            playing = true;
            break;
        case 2:
            playing2 = true;
            break;
        case 3:
            playing3 = true;
            break;
        case 4:
            playin4 = true;
            break;
        default:
            break;
    }
}
function stopRecord(number){
    switch (number) {
        case 1:
            playing = false;
            break;
        case 2:
            playing2 = false;
            break;
        case 3:
            playing3 = false;
            break;
        case 4:
            playin4 = false;
            break;
        default:
            break;
    }
}
function resetArray(number){
    const newArray = [];
    switch (number) {
        case 1:
            channel = newArray;
            break;
        case 2:
            channel2 = newArray;
            break;
        case 3:
            channel3 = newArray;
            break;
        case 4:
            channel4 = newArray;
            break;
        default:
            break;
        }
}
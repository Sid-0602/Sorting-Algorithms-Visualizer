const n=25;
const array = [];
init();

let audioCtx = null;

function playNote(freq){
    if(audioCtx==null){
        audioCtx= new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }

    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node = audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(
        0,audioCtx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function init(){
    for(i=0;i<n;i++){
        array[i] = Math.random();
    }
    showBars();
}

function play(){
    const copyArray = [...array];
    const moves = bubbleSort(copyArray);
    animate(moves);
}

function animate(moves){
    if(moves.length==0){return;}

    const move=moves.shift(); //i and j contains i-1 and i.
    const [i,j] = move.indices;
    if(move.type == "swap"){
        [array[i],array[j]] = [array[j],array[i]];
    }

    playNote(200+array[i]*500); //linear interpolation function. 
    playNote(200+array[j]*500);
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },50);
}

function bubbleSort(array){
    const moves=[];
    do{
        var swapped = false;
        for(let i=1;i<array.length;i++){
            moves.push({ indices:[i-1,i],type:"comparison"});
            if(array[i-1]>array[i]){
                swapped=true;
                moves.push({ indices:[i-1,i],type:"swap"});
                [array[i-1],array[i]] = [array[i],array[i-1]];
            }
        }
    }while(swapped){
        return moves;
    }
    
}


function showBars(move){

    container.innerHTML="";
    for(let i=0;i<array.length;i++){

        //creating an bar:
        const bar = document.createElement("div");
        bar.style.height=array[i]*100+"%"; 
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
                move.type=="swap" ? "#01fefe":"#8d0000";
        }
        container.appendChild(bar);
    }
}

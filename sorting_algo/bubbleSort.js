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
};

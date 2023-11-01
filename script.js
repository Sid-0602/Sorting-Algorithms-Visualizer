const n=50;
const array = [];
init();

function showBars(move){

    container.innerHTML="";
    for(let i=0;i<array.length;i++){

        //creating an bar:
        const bar = document.createElement("div");
        bar.style.height=array[i]*100+"%"; 
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
                move.type=="swap" ? "#bb87fd":"#8d0000";
        }
        container.appendChild(bar);
    }
};

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

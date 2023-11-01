const n=25;

const array = [];

for(i=0;i<n;i++){
    array[i] = Math.random();
}

for(let i=0;i<array.length;i++){

    //creating an bar:
    const bar = document.createElement("div");
    bar.style.height=array[i]*100+"%"; 
    bar.classList.add("bar");
    container.appendChild(bar);
    
}
function createSlideArray(idContainer){
    let slideShow = document.getElementById(idContainer).childNodes;
    let slideArray= [];
    for(let i = 0;i < slideShow.length; i++){
        if (slideShow[i].nodeName === 'DIV'){
            slideArray.push(slideShow[i]);
        }
    }
    return slideArray;
}




function slideImg(arr, interval){
    let count = 0;



   setInterval(function(){
        if(arr.length - 1 > count){
        arr[count].classList.add('fade');
        arr[count + 1].classList.remove('fade');
        count++;
        
        }else { 
            count = 0
        arr[count].classList.remove('fade');
        arr[arr.length - 1].classList.add('fade');
        }
    }, interval)
    
}


window.onload = ()=>{

slideImg(createSlideArray('slideshow-container'), 2500);
slideImg(createSlideArray('slideshow-container2'), 2500);
};

 




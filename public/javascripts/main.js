function toggleMenu(){
    document.getElementById('menu').classList.toggle('hidden');
}



let menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', toggleMenu);

window.onresize = resizeChecker;

function resizeChecker(){
    
    if(window.matchMedia('(min-width: 550px)').matches){
        menuBtn.classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
    }else{
        menuBtn.classList.remove('hidden');
        document.getElementById('menu').classList.add('hidden');
    }
}
resizeChecker();
if(sessionStorage.diet){
    document.getElementById(sessionStorage.diet).checked = true;
    var offertPrice = document.getElementById(sessionStorage.diet).dataset.price;
    
}
document.getElementById('invoice').style.display = 'none';


let finalOffert = document.getElementById('finalOffert');
let calories = document.getElementsByClassName('calories');
let offert = document.getElementsByClassName('offert');
     
    for(let i = 0;i < calories.length;i++){
        calories[i].addEventListener('click', (e)=>{
            
         return caloriesPrice = e.target.dataset.price;            
        });
         calories[i].addEventListener('click',(e)=>{checkMark(calories, e)});
        calories[i].addEventListener('click', summary);
        // calories[i].addEventListener('click', ()=>{
            
        //     makeViewFancy(document.getElementById('calories'))
        // })
    }

    for(let i = 0;i < offert.length;i++){
        offert[i].addEventListener('click', (e)=>{
        
         return offertPrice = e.target.dataset.price;
        });
        offert[i].addEventListener('click', summary);
         offert[i].addEventListener('click', (e)=>{checkMark(offert, e)});
        // offert[i].addEventListener('click', ()=>{
           
        //     makeViewFancy(document.getElementById('offert'))
        // });
    }

   

function checkMark(className, e){
  for(let i = 0;i < className.length;i++){
    if(className[i].parentElement.classList.contains('checkmark')){
      className[i].parentElement.classList.remove('checkmark');
    }
    
  }
  e.target.parentElement.classList.add('checkmark');  
}



function summary(){
    
    finalOffert.textContent = (Number(caloriesPrice) *Number(offertPrice)  
    * Number(datepicker.selectedDates.length) * Number(document.getElementById('diets').textContent))   
    if(isNaN(finalOffert.textContent)){
        finalOffert.textContent = 0;
    }

 }

 function putCountDiet(){
     document.querySelector('input[name="countDiets"]').value = document.getElementById('diets').textContent
 }

 function addOneDiet(){
    let counter = Number(document.getElementById('diets').textContent)
    if(counter < 5){
        counter++
        document.getElementById('diets').textContent = counter
    }
    
    putCountDiet()
    summary()
    
 }
 function removeOneDiet(){
    let counter = Number(document.getElementById('diets').textContent)
    if(counter > 1){
        counter--
        document.getElementById('diets').textContent = counter
    }
    putCountDiet()
    summary()
 }
 document.getElementById('plusDiet').addEventListener('click', addOneDiet);
 document.getElementById('minusDiet').addEventListener('click', removeOneDiet);


 var cleave = new Cleave("input[name='phone']", {
    delimiter: ' ',
    blocks: [3, 3, 3],
    uppercase: true,
    numericOnly: true
});

var cleave1 = new Cleave("input[name='postal']", {
    delimiter: '-',
    blocks: [2, 3],
    uppercase: true,
    numericOnly: true
});

var cleave2 = new Cleave("input[name='INV_NIP']", {
    delimiter: '-',
    blocks: [3, 3, 2, 2],
    uppercase: true,
    numericOnly: true
    
});
document.querySelector('input[name="INV"]').addEventListener('click', (e)=>{hideINV(e)});

function hideINV(e){
    
    let invoice = document.getElementById('invoice');
    let btn = document.querySelector('input[name="INV"]');
    if(e.target === btn && !e.target.checked){
        invoice.style.display = 'none'
    }else if(e.target === btn && e.target.checked){
        invoice.style.display = 'grid';
    }
}

// function makeViewFancy(offDiv){
    
//     if(!offDiv.classList.contains('hidden')){
//       for(let i = 0;i < offDiv.children.length;i++){
//         if(offDiv.children[i].classList.contains('checkmark')){
//             offDiv.nextElementSibling.classList.remove('hidden')
//         }
//       }
//     }
// }


putCountDiet();


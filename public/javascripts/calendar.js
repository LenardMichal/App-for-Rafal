   
      
      let datepicker = new Datepickk();
     
      function disabledDates(day){
         let arrDate = [];
        
         
      for(let i = 2017;i < day.getFullYear() + 1; i++){
            if(i < day.getFullYear()){
               for(let j = 0;j < 12 ; j++ ){
                  
                  for(let k = 1;k < 32 ; k++){
                     
                     arrDate.push(new Date(i,j,k))
                  }
               }
            }else {
                  for(let j = 0;j < day.getMonth() + 1;j++){
                     if(j < day.getMonth()){
                        for(let k =1 ;k < 32 ;k++){
                           arrDate.push(new Date(i,j,k));
                        }
                     } else {
            
                     for(let k = 1; k < day.getDate();k++){
              
                        arrDate.push(new Date(i, j, k));
            }
                     }
            
            }
         }
      }
         return arrDate
         
      }
      
      let calControl = {
        plusButton: document.getElementById('plus'),
        minusButton: document.getElementById('minus'),
         countDays: document.getElementById('countRange'),
        saturdayButton: document.getElementById('saturday'),
        sundayButton: document.getElementById('sunday')
       }
      
    //    calControl.saturdayButton.addEventListener('click',function(){
    //       this.classList.toggle('checked')  
    //       checkDays()       
    //    });

    //    calControl.sundayButton.addEventListener('click',function(){
    //     this.classList.toggle('checked')  
    //     checkDays()     
    //  });

    //  function checkDays(){
    //    datepicker.disabledDays = false;
    //   if(calControl.sundayButton.classList.contains('checked') && calControl.saturdayButton.classList.contains('checked')){
    //     datepicker.disabledDays = [0, 6];
    //   } else if(calControl.sundayButton.classList.contains('checked')){
    //     datepicker.disabledDays = [0];
    //   } else if (calControl.saturdayButton.classList.contains('checked')){
    //     datepicker.disabledDays = [6];
    //   }else {
    //     datepicker.disabledDays = false;
    //   }
      
    // }

    calControl.plusButton.addEventListener('click', function(){
      datepicker.maxSelections ++;
      calControl.countDays.textContent = Number(calControl.countDays.textContent) + 1
      let lastDay = datepicker.selectedDates[datepicker.selectedDates.length - 1];
      if (lastDay.getDay() === 5){
      let nextDay = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + 3)
      datepicker.selectedDates.push(nextDay);
      datepicker.selectDate(nextDay);
      }else{
      let nextDay = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + 1)
      datepicker.selectedDates.push(nextDay);
      datepicker.selectDate(nextDay);
      }
      
    });

    calControl.minusButton.addEventListener('click', function(){
      if (datepicker.maxSelections > 1){
        datepicker.maxSelections--;
        calControl.countDays.textContent = Number(calControl.countDays.textContent) - 1;
        
        if (datepicker.maxSelections < datepicker.selectedDates.length){
          let removeDate = datepicker.selectedDates.pop();
        datepicker.unselectDate(removeDate)
        }
      }
      
      
    });
     


    function disableDaysForward(){
      let today = new Date();
     switch (today.getDay()){
      case 0:
       datepicker.disabledDates = disabledDates(new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 1)))
      break;
      case 1:
      datepicker.disabledDates = disabledDates(new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 3)))
      break;
      case 2:
      datepicker.disabledDates = disabledDates(new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 2)))
      break;
      case 3:
      datepicker.disabledDates = disabledDates(new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 1)))
      break;
      case 4:
      datepicker.disabledDates = disabledDates(new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 4)))
      break;
      case 5:
      datepicker.disabledDates = disabledDates(new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 3)))
      break;
      case 6:
      datepicker.disabledDates = disabledDates(new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 2)))
      break;
      case 7:
      datepicker.disabledDates = disabledDates(new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 1)))
      break;
     }
    }
    disableDaysForward();
      
      
      
      datepicker.container = document.getElementById('calendar');
      datepicker.show();
      
    
      datepicker.lang = 'pl';
      datepicker.maxSelections = 5;
      datepicker.disabledDays= [0, 6];
      
      datepicker.minDate = new Date(2017, 0, 1);

     
       function matchCalendar(){
        if (window.matchMedia("(min-width: 700px)").matches) {
          datepicker.months = 2
        } else {
          datepicker.months = 1
        }
    }
      window.onresize = matchCalendar;
      matchCalendar()

     

      
      
      
      
      datepicker.onSelect = function(){
        let arr= [];
        datepicker.selectedDates.forEach((data)=>{
          arr.push(`${data.getDate()}-${data.getMonth()+1}-${data.getFullYear()}`)
        })
       document.getElementById('dates').value = arr;
       
         summary()
         

      }
      
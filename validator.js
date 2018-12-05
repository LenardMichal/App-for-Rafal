const locale = require('./locale.js');



let parametr = {
  type: {
    diet: 'classic'
  }
}


//Set of validator function


function validator(obj) {
  let valid = {};

  valid.dietType = validDiet(obj.type.diet);
  valid.dietCal = validCal(obj.type.cal);
  valid.calendar = validCalendar(obj.type.dateRange);
  valid.city = validCity(obj.delivery.city);
  valid.email = validMail(obj.personals.email);
  valid.name = validName(obj.personals.name);
  valid.surname = validSurname(obj.personals.surname);
  valid.phone = validPhone(obj.personals.phone);

  valid.error = 0;
  for (let key in valid) {
    if(key == 'error'){
      break;
    }
    if (!valid[key]) {
      valid[key] = true;
      valid.error++ ;
      
    }else {
      valid[key] = false;
    }
  }
  
  return valid
}


function validDiet(diet) {
  if (typeof (diet) != 'undefined' &&
    diet === locale.oferta[0].class ||
    diet === locale.oferta[1].class ||
    diet === locale.oferta[2].class ||
    diet === locale.oferta[3].class) {

    return true;
  } else {
    return false;
  }
}

function validCal(cal) {
  if (typeof (cal) != 'undefined' &&
    cal == locale.calValue[0] ||
    cal == locale.calValue[1] ||
    cal == locale.calValue[2] ||
    cal == locale.calValue[3]) {
    return true;
  } else {
    return false;
  }
}

function validCity(city) {
  if (locale.cityList.includes(city.charAt(0).toUpperCase() + city.slice(1).toLowerCase())) {
    return true;
  } else {
    return false;
  }
}


function validCalendar(calendar) {
  let now = new Date();
  if (!calendar) {
    return false;
  } else {
    let ary = [];
    let arr = calendar.split(',');
    arr.forEach((data) => {
      let value = data.split('-');
      let newDay = new Date(Number(value[2]), Number(value[1]) - 1, Number(value[0]) + 1);

      ary.push(newDay);
    });

    ary.every((day) => {
      if (day.getTime() > now.getTime() && day.getDay() !== 0 && day.getDay() !== 6) {

        return check = true;
      } else {

        return check = false;

      }

    });;
    if (check) {
      return true
    } else {
      return false
    }
  }
}

function validName(name) {
  if (name.length > 1) {
    return true;
  } else {
    return false;
  }
}

function validSurname(surname) {
  if (surname) {
    return true;
  } else {
    return false;
  }
}

function validPhone(phone) {
  let phoneexp = /[0-9][0-9][0-9] [0-9][0-9][0-9] [0-9][0-9][0-9]/;
  if (phone.length === 11 && phone.match(phoneexp)) {
    return true;
  } else {
    return false
  }
}

function validMail(email) {
  let mailexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/img;
  if (email.match(mailexp)) {
    return true;
  } else {
    return false;
  }
}

module.exports.validator = validator
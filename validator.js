const locale = require('./locale.js');



let parametr = {
  type: {
    diet: 'classic'
  }
}




async function validator(obj) {
  let valid = {};
  try {
    await validDiet(obj);
    await validCal(obj);
    await validCalendar(obj);
    await validCity(obj);
    await validMail(obj);
    await validName(obj);
    await validSurname(obj);
    await validPhone(obj);
  } catch (error) {
    console.log(error);
  }
  let nonValid = {}
  nonValid.error = 0;
  for (let key in valid) {
    if (valid[key] === false) {
      nonValid[key] = !valid[key];
      nonValid.error += 1;
    }
  }
  return nonValid
}


function validDiet(obj) {
  if (typeof (obj.type.diet) != 'undefined' ||
    obj.type.diet === locale.oferta[0].class ||
    obj.type.diet === locale.oferta[1].class ||
    obj.type.diet === locale.oferta[2].class ||
    obj.type.diet === locale.oferta[3].class) {

    return valid.dietType = true;
  } else {
    return valid.dietType = false;
  }
}

function validCal(obj) {
  if (typeof (obj.type.cal) != 'undefined' ||
    obj.type.cal === locale.calValue[0] ||
    obj.type.cal === locale.calValue[1] ||
    obj.type.cal === locale.calValue[2] ||
    obj.type.cal === locale.calValue[3]) {
    return valid.dietCal = true;
  } else {
    return valid.dietCal = false;
  }
}

function validCity(obj) {
  if (locale.cityList.includes(obj.delivery.city.charAt(0).toUpperCase() + obj.delivery.city.slice(1).toLowerCase())) {
    return valid.city = true;
  } else {
    return valid.city = false;
  }
}

function validCalendar(obj) {
  let now = new Date();
  if (!obj.type.dateRange) {
    valid.calendar = false;
  } else {
    let ary = [];
    let arr = obj.type.dateRange.split(',');
    arr.forEach((data) => {
      let value = data.split('-');
      let newDay = new Date(Number(value[2]), Number(value[1]) - 1, Number(value[0]) + 1)
      ary.push(newDay);
    });

    ary.every((day) => {
      if (day.getTime() > now.getTime() && day.getDay() !== 0 && day.getDay() !== 6) {
        valid.calendar = true;
        return true;
      } else {
        valid.calendar = false;
        return false;

      }
    })
  }
}

function validName(obj) {
  if (obj.personals.name.length > 1) {
    return valid.name = true;
  } else {
    return valid.name = false;
  }
}

function validSurname(obj) {
  if (obj.personals.surname) {
    return valid.surname = true;
  } else {
    return valid.surname = false;
  }
}

function validPhone(obj) {
  let phoneexp = /[0-9][0-9][0-9] [0-9][0-9][0-9] [0-9][0-9][0-9]/;
  if (obj.personals.phone.length === 11 && obj.personals.phone.match(phoneexp)) {
    return valid.phone = true;
  } else {
    return valid.phone = false
  }
}

function validMail(obj) {
  let mailexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/img;
  if (obj.personals.email.match(mailexp)) {
    return valid.email = true;
  } else {
    return valid.email = false;
  }
}

module.exports.validator = validator
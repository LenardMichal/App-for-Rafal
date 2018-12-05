let validation = require('./validator.js')







let mockClient = {
  personals: {
    name: 'Name',
    surname: "Surname",
    phone: "123 123 123",
    email: "example@org.com"
  },
  type: {
    diet: 'FirstDiet',
    cal: '1200',
    dateRange: '12-12-2018',
    countDiets: '1',
    countDays: '1'

  },
  delivery: {
    city: 'Janki',
    postal: '05-090',
    street: 'Wspolna',
    buildNumber: '12',
    coop: '12',
    local: '12',
    floor: '12',
    intercom: '1234',
    note: 'Bring me hummus'
  }
}


console.log(validation.validator(mockClient));
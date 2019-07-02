const fileManager = require("./helpers/fileManager");
const helper = require("./helpers/dateHelper");

const number = /^[0-9.]+$/;
const timeRg = /((([1-9])|(0[1-9])|(1[0-2])):([0-5])(0|5))/;

module.exports.findOpenRestaurants = (csvFilename, searchDatetime) => {
  return new Promise((resolve, reject) => {
    let results = new Set();

    fileManager.readCSVFile(csvFilename)
      .then(restaurants => {
        if (restaurants.length > 0) {
          let year = searchDatetime.getFullYear()

          let currentDate = new Date();
          var currentYear = currentDate.getFullYear();

          if (year < currentYear) {
            throw 'You have to insert a valid year'
          }

          let time = helper.covertDateToTime(searchDatetime);
          let day = helper.convertDateToDay(searchDatetime.getDay()).toLowerCase();
          let subDay = day.substring(0, 3).toLowerCase();
  
          let output = new Set();

          restaurants.forEach(restaurant => {
            let rowDate = restaurant[1].split("/");
            let days = [];

            rowDate.forEach(row => {
              let dateParts = row.split(" ");
              
              // Handle the days
              if (dateParts[0] !== "") {
                days.push(dateParts[0].toLowerCase().split("-"));
                if (!number.test(dateParts[1])) {
                    days.push(dateParts[1].toLowerCase().split("-"));
                }
              } else {
                  if (!number.test(dateParts[1])) {
                      days.push(dateParts[1].toLowerCase().split("-"));
                  }
              }
              
              // Handle the opening time
              if (number.test(dateParts[1]) || timeRg.test(dateParts[1])) {
                start = dateParts[1];
                startUnit = dateParts[2];
            
                if (!timeRg.test(start)) {
                  start += ":00";
                }
              } else if (number.test(dateParts[2]) || timeRg.test(dateParts[2])) {
                start = dateParts[2];
                startUnit = dateParts[3];
            
                if (!timeRg.test(start)) {
                  start += ":00";
                }
              }

              // Handle the closing time
              if (number.test(dateParts[4]) || timeRg.test(dateParts[4])) {
                end = dateParts[4];
                endUnit = dateParts[5];
            
                if (!timeRg.test(end)) {
                  end += ":00";
                }
              } else if (number.test(dateParts[5]) || timeRg.test(dateParts[5])) {
                end = dateParts[5];
                endUnit = dateParts[6];
            
                if (!timeRg.test(end)) {
                  end += ":00";
                }
              }

              if (days[0].includes(day) || days[0].includes(subDay)) {
                start = helper.timeConvertor(start+startUnit);
                end = helper.timeConvertor(end+endUnit);
                
                if (time >= start && time <= end) {
                  output.add(restaurant[0]);
                }
              }
              results = output
            });
          });
        }
        resolve(results)
      })
      .catch(error => {
        reject(error)
      });
  })
  };

const handleDays = (dateParts) => {
  let days = []
    
    return days
};

const handleStartTime = (dateParts) => {
  let start, startUnit
  

  return start + startUnit
};

const handleCloseTime = (dateParts) => {
  let end, endUnit
  

  return end + endUnit
}
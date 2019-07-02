const fileManager = require("./helpers/fileManager");
const helper = require("./helpers/dateHelper");

const findOpenRestaurants = (csvFilename, searchDatetime) => {
    fileManager.readFile(csvFilename)
      .then(restaurants => {
        if (restaurants.length > 0) {
          let time = helper.covertDateToTime(searchDatetime);
          let day = helper.convertDateToDay(searchDatetime).toLowerCase();
          let subDay = day.substring(0, 3).toLowerCase();
  
          let output = [];
          restaurants.forEach(restaurant => {
            let rowDate = restaurant[1].split("/");
            rowDate.forEach(row => {
              let dateParts = row.split(" ");
              let days = [];
  
              const number = /^[0-9.]+$/;
              const timeRg = /((([1-9])|(0[1-9])|(1[0-2])):([0-5])(0|5))/;
  
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
  
              // Handle the opening & closing time
              var start, end;
              var startUnit, endUnit;
              
              if (number.test(dateParts[1]) || timeRg.test(dateParts[1])) {
                start = dateParts[1];
                startUnit = dateParts[2];
  
                if (!timeRg.test(start)) {
                  start += ":00";
                }
              } else if (
                number.test(dateParts[2]) ||
                timeRg.test(dateParts[2])
              ) {
                start = dateParts[2];
                startUnit = dateParts[3];
  
                if (!timeRg.test(start)) {
                  start += ":00";
                }
              }
              if (number.test(dateParts[4]) || timeRg.test(dateParts[4])) {
                end = dateParts[4];
                endUnit = dateParts[5];
  
                if (!timeRg.test(end)) {
                  end += ":00";
                }
              } else if (
                number.test(dateParts[5]) ||
                timeRg.test(dateParts[5])
              ) {
                end = dateParts[5];
                endUnit = dateParts[6];
  
                if (!timeRg.test(end)) {
                  end += ":00";
                }
              }
              if (days[0].includes(day) || days[0].includes(subDay)) {
                start = timeConvertor(start + startUnit);
                end = timeConvertor(end + endUnit);
                
                if (time >= start && time <= end) {
                  output.push(restaurant[0]);
                }
              }
  
              console.log(output)
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

const handleDays = (dateParts) => {
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
};

const handleStartTime = () => {

};

const handleCloseTime = () => {

}
  

module.exports = findOpenRestaurants;
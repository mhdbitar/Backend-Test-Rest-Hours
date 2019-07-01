const express = require("express");
const fs = require("fs");
const csv = require("fast-csv");

const app = express();

const findOpenRestaurants = (csvFilename, searchDatetime) => {
  readFile(csvFilename)
    .then(restaurants => {
      if (restaurants.length > 0) {
        let time = covertDateToTime(searchDatetime);

        let day = convertDateToDay(searchDatetime).toLowerCase();
        let subDay = day.substring(0, 3).toLowerCase();

        let output = [];
        restaurants.forEach(restaurant => {
          let rowDate = restaurant[1].split("/");
          rowDate.forEach(row => {
            let dateParts = row.split(" ");
            let days = [];

            const number = /^[0-9.]+$/;
            const timeRg = /^\d{2,}:\d{2}$/;

            if (dateParts[0] !== "") {
              days.push(dateParts[0].toLowerCase().split("-"));
              if (!dateParts[1].match(number)) {
                days.push(dateParts[1].toLowerCase().split("-"));
              }
            } else {
              if (!dateParts[1].match(number)) {
                days.push(dateParts[1].toLowerCase().split("-"));
              }
            }

            var start, end;
            var startUnit, endUnit;
            if (dateParts[1].match(number) || timeRg.test(dateParts[1])) {
              start = dateParts[1];
              startUnit = dateParts[2];

              if (!timeRg.test(start)) {
                start += ":00";
              }
            } else if (
              dateParts[2].match(number) ||
              timeRg.test(dateParts[2])
            ) {
              start = dateParts[2];
              startUnit = dateParts[3];

              if (!timeRg.test(start)) {
                start += ":00";
              }
            }

            if (dateParts[4].match(number) || timeRg.test(dateParts[4])) {
              end = dateParts[4];
              endUnit = dateParts[5];

              if (!timeRg.test(start)) {
                end += ":00";
              }
            } else if (
              dateParts[5].match(number) ||
              timeRg.test(dateParts[5])
            ) {
              end = dateParts[5];
              endUnit = dateParts[6];

              if (!timeRg.test(start)) {
                end += ":00";
              }
            }

            if (days.includes(day) || days.includes(subDay)) {
              start = timeConvertor(start + startUnit);
              end = timeConvertor(end + endUnit);
              if (time[0] >= start && time[0] <= end) {
                output.push(restaurant);
              }
            }
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

// Read CSV file and return an array
const readFile = filePath => {
  return new Promise((resolve, reject) => {
    let output = [];
    var fh = fs.createReadStream(filePath);

    fh.pipe(csv.parse({ headers: false }))
      .on("data", row => {
        output.push(row);
      })
      .on("end", () => {
        resolve(output);
      });
    fh.on("error", reject);
  });
};

const covertDateToTime = date => {
  let d = date;
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  if (hours == 0) {
    hours = 12;
  }
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = hours + ":" + minutes;

  return time;
};

function timeConvertor(time) {
  var PM = time.match("PM") ? true : false;

  time = time.split(":");

  var min = time[1].substring(0, 2);

  if (PM) {
    var hour = 12 + parseInt(time[0], 10);
  } else {
    var hour = time[0];
  }

  return hour + ":" + min;
}

const convertDateToDay = date => {
  let j = new Array(
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  );
  return j[date.getDay() - 1];
};

findOpenRestaurants("./src/rest_hours.csv", new Date());

const PORT = 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

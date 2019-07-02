/**
 * Convert Date to Time
 * @params Date
 */
module.exports.covertDateToTime = (date) => {
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
  
/**
 * Convert time from 12 hours to 24 hours
 * @params time
*/
module.exports.timeConvertor = (time) => {
    var PM = time.match("PM") ? true : false;
  
    time = time.split(":");
  
    var min = time[1].substring(0, 2);
  
    if (PM) {
      var hour = 12 + parseInt(time[0], 10);
    } else {
      var hour = time[0];
    }
  
    return hour + ":" + min;
};
  
/**
 * Convert number day to string
 * @params Date
 */
module.exports.convertDateToDay = (day) => {
    let j = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    );
    return j[day];
};
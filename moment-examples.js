var moment=require('moment');
var now=moment();//now is now a moment object //current time
//console.log(now.format()); // basic default timestamp
//console.log(now.format('MMM DD h:mmA'));//print time like 6:22PM 
                          //go to moment.js/docs to see the formsta
                         // console.log(now.format('X'));

  var timestamp=1450809856563;
  var tsMoment=moment.utc(timestamp);
  console.log(tsMoment.format());

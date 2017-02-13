function formatDob(dob){            //      mm/dd/yyyy   want to get yyyy-mm-dd
var dobUnits = dob.split("/");     //["mm","dd","yyyy"]
var month = dobUnits[0];
  if (parseInt(month)<10){
    month="0"+month;
  }
var date = dobUnits[1];
  if (parseInt(date)<10){
    date="0"+date;
  }
var year = dobUnits[2];
var dobInIsoFormat = (year)+"-"+(month)+"-"+(date); //yyyy-mm-dd
return dobInIsoFormat;
}

function getTodayDate(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd
} 
if(mm<10) {
    mm='0'+mm
} 
today = yyyy+"-"+mm+"-"+dd;
return today;
}

function dobToAge(dob){
  var formattedAge= formatDob(dob);
  var currentDate = getTodayDate();
  var ageInMS = Date.parse(currentDate) - Date.parse(formattedAge);
  var age = parseInt(ageInMS) /(1000 * 60*60*24*365.25); 
      age=Math.floor(age);
  return age;
}

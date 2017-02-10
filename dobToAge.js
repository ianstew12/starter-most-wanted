function formatDob(dob){            //dob comes as mm/dd/yyyy    ISO 8601 FORMAT:  YYYY-MM-DD 
var dobUnits = dob.split("/");    //dob is a string! formatDob("1-1-1900") not formatDob(1-1-1900)
//dobUnits is an array of strings ["mm", "dd", "yyyy"] but dobunits[0][0] and dobUnits[1][0] may not exist (single digit)  
var month = dobUnits[0];
  if (parseInt(month)<10){
    month="0"+month;
  }
var date = dobUnits[1];
  if (parseInt(date)<10){
    date="0"+date;
  }
var year = dobUnits[2];
var dobInIsoFormat = (year)+"-"+(month)+"-"+(date);
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


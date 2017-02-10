/*
  Build all of your functions for displaying and gathering information below (GUI).
  */

// app is the function called to start the entire application
"use strict";
function app(people){   
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo);
  var person = "";             //can initialize as empty string b/c JS is dynamically typed
  switch(searchType){
    case 'yes':    
      person = searchByName(people);          //add return statement  reduceToPerson
      mainMenu(person, people);    
      break;
      case 'no':
      person = filterTraits(people);
      mainMenu(person, people);
      break;                                    
      default:
      app(people); // restart (recursive) 
      break;
    }                     
}           

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
if(!person){
  alert("Could not find that individual.");         
  return app(people); 
}
var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

switch(displayOption){
  case "info":
  {displayPerson(person);}
  break;
  case "family":
  {var family = getFamily(person, people)};
  alert(displayFamily(family));

  break;
  case "descendants":
	{var descendants= getDescendants(person, people);//default third parameter descendants = []
    alert("descendants: " + showPeopleNames(descendants))};


	break;
  case "restart":
	app(people); // restart
	break;
  case "quit":
	return;
	return mainMenu(person, people); // ask again
   }
 }

 function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  var person = filterByName(firstName, lastName, people);
  return person[0];    
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + dobToAge(person.dob) + "\n";                   
  personInfo += "Occupation: " + person.occupation + "\n";          
  personInfo += "Eye color: " + person.eyeColor +"\n";
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){     
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function chars(input){
  return true; // default validation only
}
function doCheckHeight(){ 
  var includeHeight = prompt("Do you wish to filter by height?").toLowerCase();                  
  if (includeHeight === "yes") {return true;}
  else if (includeHeight === "no") {return false}    
    else {return doCheckHeight()};
} 
function askHeight(){                             
  if (doCheckHeight()){
    var heightToFilter= parseInt(prompt("enter height in inches"));
    if (isNaN(heightToFilter)|| heightToFilter <0 || heightToFilter > 90) {
      alert('that was not a valid height');
      return askHeight();
      var heightToFilter= prompt("enter height in inches");                    
    }
    return heightToFilter;
  }
  else {
    return false;
  }
}

function doCheckWeight(){
  var includeWeight = prompt("Do you wish to filter by weight?").toLowerCase();
  if (includeWeight === "yes"){
    return true;
  }
  else if(includeWeight === "no") {
    return false;
  }
  else {
    return doCheckWeight();
  }
} 


function askWeight(){
 if (doCheckWeight()){
  var weightToFilter = parseInt(prompt("enter weight in pounds"));
  if (isNaN(weightToFilter) || weightToFilter < 0 || weightToFilter >700){
    alert("that was not a valid weight");
    return askWeight();
  }
  return weightToFilter; 
}
else return false; 
}

function doCheckEyeColor(){
  var includeEyeColor = prompt("Do you wish to filter by eye color?").toLowerCase();
  if (includeEyeColor ==="yes") {
    return true;
  }
  else if (includeEyeColor === "no") {
    return false;
  }
  else {
    return doCheckEyeColor();
  }
}

function askEyeColor(){
 if (doCheckEyeColor()){
  var eyeColorToFilter = promptFor("enter eye color", chars);                
  return eyeColorToFilter;
}
else {
  return false;
}
}

function doCheckOccupation(){
  var includeOccupation = prompt("Do you wish to filter by occupation?").toLowerCase();
  if (includeOccupation ==="yes"){
    return true;
  }
  else if(includeOccupation === "no") {
    return false;
  }
  else {
    return doCheckOccupation();
  }
}
function askOccupation(){
  if (doCheckOccupation()){
    var occupationToFilter = promptFor("enter occupation to filter by", chars);            
    return occupationToFilter;
  }
  else {return false;
  }
}

function doCheckAge(){
  var includeAge = prompt("do you want to include age?").toLowerCase();
  if (includeAge === "yes") {
    return true;
  }
  else if (includeAge === "no") {
    return false;
  }
  else {
    return doCheckAge(); 
  }
}
function askAge(){
  if (doCheckAge()){
    var ageToFilter = parseInt(prompt('enter age'));
    if (isNaN(ageToFilter)){
      alert("not a valid age");
      return askAge();     
    }                        
    return ageToFilter;
  }
  else {
    return false;
  }
}  
function formatDob(dob){            
var dobUnits = dob.split("/");     
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




function filterByAge(people){
  var ageToFilter = askAge();
  if (ageToFilter){

   return people.filter(function(person){
    return dobToAge(person["dob"]) === ageToFilter;
  });
 }
 else {return people;}                           
}            
function filterByWeight(people){
  var weightToFilter = askWeight();
  var results = people.filter(function (element){
    return (element.weight === weightToFilter);
  });
  if(weightToFilter){
    return results;
  }else{
    return people;
  }
}
function filterByHeight(people){
  var heightToFilter = askHeight();
  var results = people.filter(function(element){
    return (element.height===heightToFilter);
  });
  if(heightToFilter){
    return results;
  }
  else{
    return people;
  }
}
function filterByOccupation(people){
  var occupationToFilter = askOccupation();
  var results = people.filter(function(element){
    return (element.occupation === occupationToFilter);
  });
  if (occupationToFilter){return results;}
  else {return people;} 
}
function filterByEyeColor(people){
  var eyeColorToFilter = askEyeColor();
  var results = people.filter(function(element){
    return (element.eyeColor === eyeColorToFilter);
  });
  if(eyeColorToFilter){return results;}
  else {return people;}
}
function filterTraits(people){
  var resultingPeople= people;
  resultingPeople= filterByEyeColor(resultingPeople);
  resultingPeople = filterByWeight(resultingPeople);                    
  resultingPeople= filterByOccupation(resultingPeople);
  resultingPeople= filterByHeight(resultingPeople);
  resultingPeople= filterByAge(resultingPeople);
  return reduceToPerson(resultingPeople);
}
function reduceToPerson(resultsFromFilter){
  if (resultsFromFilter.length>1){
    alert("Multiple results fit your criteria. You will next be shown a list of matching names, from which you will choose one to proceed");
    var index = promptFor("enter the index number next to the name of the person whose information you would like \n" + showPeopleNamesWithIndex(resultsFromFilter), chars);  
    return resultsFromFilter[parseInt(index)];   //TODO:newline needs fixing
  }
else {return resultsFromFilter[0];}   //instead of returning the whole object, just returning the first element in the object
}
function showPeopleNamesWithIndex(people){
  var names = "";
  for (var i=0; i<people.length; i++){
    names+= i + ". " + people[i].firstName +" "+ people[i].lastName + "\n";
  }
  return names;
}

function showPeopleNames(people){
  var names= "";
  for (var i=0; i<people.length; i++){
    names+=people[i].firstName + " " + people[i].lastName + "\n";
  }
  return names;
}

  
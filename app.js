"use strict";
function filterByName(firstName, lastName, people){
	var person = people.filter(function (element){
		return firstName===element.firstName && lastName === element.lastName;
	});
	return person;
}

function getDescendants(person, people, descendants=[]){			//last parameter because it's recursive 
var nextGeneration = people.filter(function(element){
	return (element.parents[0]===person.id)|| (element.parents[1]===person.id)
});
descendants = descendants.concat(nextGeneration);
if (nextGeneration.length===0){return descendants;}					
for (var i=0; i<nextGeneration.length; i++){
		descendants = getDescendants(nextGeneration[i], people, descendants);	
	}
	return descendants;
}

function getFamily(person, people, family=[]){
	var siblings = getSiblings(person, people);
	var parents = getParents(person,people);
	var spouse = getSpouse(person, people);
	var children = getChildren(person,people);
var family = [siblings, parents, spouse, children];//array of arrays 
return family;
}





function getSiblings(person, people){	//need to filter only if not an orphan
	var siblings = [];
	siblings = people.filter(function (element){		//four ways to be siblings here, including half siblings (which are siblings)
		if (person.parents.length>=1){
		return (person.parents[0]===element.parents[0]||person.parents[0]===element.parents[1]||
			person.parents[1]===element.parents[0]||person.parents[1]===element.parents[1])&&(person.id!=element.id);
	}
})
	return siblings;
}
/*function removeOrphans(siblingsWithOrphans){
	for (var i = 0, i<siblingsWithOrphans.length, )			// THIS IS WHERE I WAS WORKING PRE-HELP WITH ANDREW
}
*/
function getParents(person, people){
	var parents = people.filter(function (element){   
		return (person.parents[0]===element.id||person.parents[1]===element.id);
	});
return parents; //an array of parents
}6

function getSpouse(person, people){
	var spouse = people.filter(function (element){
		return (person.currentSpouse===element.id);		
	});
	return spouse;
}

function getChildren (person, people){
	var children = people.filter(function(element){
		return (element.parents[0]===person.id)|| (element.parents[1]===person.id);
	});
	return children;
}

function displayFamily(family){ //family is an array [siblings, parents, spouse, children]
	var familyInfo = "";
	familyInfo += "siblings:  " + "\n"+showPeopleNames(family[0]) + "\n";
	familyInfo += "parents:  "+"\n" + showPeopleNames(family[1])+ "\n";
	familyInfo += "spouse: " + "\n" + showPeopleNames(family[2])+ "\n";
	familyInfo += "children: " + "\n" + showPeopleNames(family[3]) + "\n";
	return familyInfo;
}


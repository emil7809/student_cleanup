"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

const Student = {
   firstName: "lålå",
    middleName: "lålå",
    lastName: "lålå",
    image: "lålå",
    house: "lålå"
};

function start( ) {
    console.log("ready");

    loadJSON();
}


function loadJSON() {
    fetch("students.json")
    .then( response => response.json() )
    .then( jsonData => {
        prepareObjects( jsonData );
    });
}

function prepareObjects( jsonData ) {
    jsonData.forEach( jsonObject => {
       
        // Create new object
        const student = Object.create(Student);
       
        //exstrack data from json objekt
        
        // const fullname = jsonObject.fullname;

        // const firstSpace = fullname.indexOf(" ");
        // const secondSpace = fullname.indexOf(" ", firstSpace + 1);
        // const lastSpace = fullname.lastIndexOf(" ");

        // const name = fullname.substring(0, firstSpace);
        // const desc = fullname.substring(secondSpace + 1, lastSpace);
        // const type = fullname.substring(lastSpace +1);

        // console.log(`
        // Name: ${name}
        // Desc: ${desc}
        // Type: ${type}`);

        //add clean data into newly created objekt
        
        // animal.name = name;
        // animal.desc = desc;
        // animal.type = type;
        // animal.age = jsonObject.age;

        //add the objekt to the global array
        allStudents.push(student);
  
    });

    displayList();
}

function displayList() {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    allStudents.forEach( displayStudents );
}

function displayStudents( student ) {
    // create clone
    const clone = document.querySelector("template#student").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=firstName]").textContent = student.firstName;
    clone.querySelector("[data-field=middleName]").textContent = student.middleName;
    clone.querySelector("[data-field=lastName]").textContent = student.lastName;
    clone.querySelector("[data-field=image]").textContent = student.image;
    clone.querySelector("[data-field=house]").textContent = student.house;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}



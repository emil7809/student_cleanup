"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

const Student = {
    firstName: "",
    middleName: "",
    lastName: "",
    nickName: "",
    image: "",
    house: ""
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
        const fullname = jsonObject.fullname.trim();

        //NAME
        //For the first name i need the info until the "First Space" (But some have space in front, so im gonna need to ... fuck whats it called? the one that trims TRIM!)
        //Also gotta "replace \ with nothing," if I can
        //Also Also gotta "replace - with a space" Beacuse Justin Finch-Fletchley is a real bitch
        //For the middle name i need the info until "Second Space"
        //For the last name i need the info after the "Last Space"
        //I'll start with this, and worry about fucking ERNIE and the rest lator
    
       // const replace1 = fullname.replace(" \ ", "");
       // const replace2 = fullname.replace(" - ", " ");
        const firstSpace = fullname.indexOf(" ");
        const secondSpace = fullname.indexOf(" ", firstSpace + 1);
        const lastSpace = fullname.lastIndexOf(" ");
       // const nickNameThing = fullname.indexOf(" \"\" ");
        
        
       
        //const firstName = fullname.substring(0, firstSpace); // WHAT THE HELL LEANNE?!?!
        const firstName = fullname[0].toUpperCase()+fullname.slice(1).toLocaleLowerCase().substring(0, firstSpace); // WHAT THE HELL LEANNE?!?!
        
        if (fullname.indexOf(" ") >= 0) {
            student.firstName = firstName;
        } else {
            student.firstName = ""; 
        }

        //const middleName = fullname.substring(secondSpace + 1, lastSpace);

        //The middle name
        const middleName = fullname.substring(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
         if (middleName.includes('"')) {
            student.nickName = fullname.substring(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
            //student.nickName = nickName;
          } else {
           student.middleName = fullname.substring(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
           student.middleName = student.middleName.substring(0, 1).toUpperCase() + student.middleName.substring(1).toLowerCase();
           student.middleName = middleName;
    }
          
        
        const lastName = fullname.substring(lastSpace +1);
        //const lastName = fullname[0].toUpperCase()+fullname.slice(0).toLocaleLowerCase().substring(lastSpace +1);


       // const nickName = fullname.substring(nickNameThing);
        const image = firstName.toLocaleLowerCase().replace(" ", "")+lastName.toLocaleLowerCase().replace(" ", "")+".png";

        //add clean data into newly created objekt
        
       // student.firstName = firstName;
        //student.middleName = middleName;
        student.lastName = lastName;
        //student.nickName = nickName;
        student.image = image;
        student.house = jsonObject.house[0].toUpperCase()+jsonObject.house.slice(1).toLocaleLowerCase();



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
    clone.querySelector("[data-field=nickName]").textContent = student.nickName;
    clone.querySelector("[data-field=image]").textContent = student.image;
    clone.querySelector("[data-field=house]").textContent = student.house;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}





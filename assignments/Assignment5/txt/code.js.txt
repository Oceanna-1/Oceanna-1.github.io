/**
 * created by Oceanna Hartog;000940535 on August 9, 2024
 * JSON fetch that will pull the corresponding data depending on whether user selects mario 
 * or starwars, and what type of data the select by pressing buttons
 * may populate header, images, or a table of links 
 */

// Instance variables

let b1 = document.getElementById('b1');
let studentContainer = document.getElementById("student");
let container = document.querySelector('.row');
let tableContainer = document.getElementById("table");

// first container to hold the student header info
let solution = document.createElement('h2');
studentContainer.appendChild(solution);

/**
 * Function for fetch request for header
 */
b1.onclick = async function() {
    
        let response = await fetch("https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php");
        let text = await response.text();
        solution.style.textAlign = "center";
        solution.innerHTML = text + " - Oceanna Hartog - 000940535";
   
};

//get the selection from the radio buttons

//create an array of radio buttons
let selections = document.getElementsByName("choice")
let selected = "";


/**
 * function to cycle through array and see which input is checked
 * */
function selectionChecker(){
    for(let i=0;i<selections.length;i++){
    if(selections[i].checked){ //if a button is checked
        selected = selections[i].value;} //selected is equal to their value (starwars or mario)
}
}



// Create elements to display copyright, and a div to contain that message
let messageDiv = document.createElement('div');
let copyrightMessage = document.createElement('p');

// Append these elements to the container
messageDiv.appendChild(copyrightMessage);
container.appendChild(messageDiv);


// Function to handle button click event
b2.onclick = async function() {
// Clear previous images
container.innerHTML = "";
selectionChecker();

try {
    // Fetch data based on the selected choice
    let response = await fetch("https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php?choice=" + selected);
    let data = await response.json();
    let jsonString = JSON.stringify(data,null,2);
    console.log(jsonString);
    let colSize = (12 / data.length) ; //size column relative to bootstrap rows so it will size itself appropriately
    console.log(colSize);

    // Display the fetched images and their details
    for (let i = 0; i < data.length; i++) {
        container.innerHTML += `<div class="col-${colSize}"><div class="card"><h3>${data[i].series}</h3><p><img src="${data[i].url}" alt="${data[i].name}"></p><p>${data[i].name}</p></div></div>`;
    }

    // copyright adjusted to the selected choice 
    if (selected === "mario") {
        copyrightMessage.innerHTML = `<p>Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo. &copy; 2019 Nintendo.</p>`;
    } else {
        copyrightMessage.innerHTML = `<p>Star Wars &copy; & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material &copy; 2022 Electronic Arts Inc</p>`;
    }
} catch (error) {
    // i error during fetch, catch error and display message
    console.error("Error fetching data:", error);
    container.innerHTML = "<p>Sorry, something went wrong while fetching the images. Please try again later.</p>";
}


};




// create table and a new p for second copyright
let table = document.createElement('table');
let copyrightMessage2 = document.createElement('p');

// Append these elements to the table container
tableContainer.appendChild(table);
tableContainer.appendChild(copyrightMessage2);

// when clicking b3, async function to make the table 
b3.onclick = async function() {
    selectionChecker(); //check selection when clicking button
try { //try-catch if fetch has errors
    // await fetch using post
    let response = await fetch("https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php", {
        method: "POST",
        body: "choice=" + selected,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    // Parse the JSON response
    let data = await response.json();
    let jsonString = JSON.stringify(data,null,2);
    console.log(jsonString);

    // Check if data is received and is an array
    if (Array.isArray(data)) {
        // Create table headers
        let str = "<tr><th>Series</th><th>Name</th><th>Link</th></tr>";

        // generate a string to add to table innerhtml to create a table, string based on length of data received
        for (let i = 0; i < data.length; i++) {
            str += "<tr>";
            str += `<td>${data[i].series}</td><td>${data[i].name}</td><td><a href="${data[i].url}" target="_blank">${data[i].url}</a></td>`;
            str += "</tr>";
        }

        // Set inner html to the string 
        table.innerHTML = str;
    } else {
        // if data is not an array
        table.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
    }

    // correct copyright for selection
    if (selected === "mario") {
        copyrightMessage2.innerHTML = `<p>Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo. &copy; 2019 Nintendo.</p>`;
    } else {
        copyrightMessage2.innerHTML = `<p>Star Wars &copy; & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material &copy; 2022 Electronic Arts Inc</p>`;
    }
} catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error fetching data:", error);
    table.innerHTML = "<tr><td colspan='3'>Sorry, something went wrong while fetching the data. Please try again later.</td></tr>";
}
};

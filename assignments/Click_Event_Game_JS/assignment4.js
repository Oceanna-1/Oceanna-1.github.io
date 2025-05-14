// Author: Oceanna Hartog; Student Number: 000940535
// Created on July 30th, 2024
    
    const svgNS = "http://www.w3.org/2000/svg";
	let jonkId = 0;
    var score = 0;
    let jonksOnBoard = 5;
    var animationDuration = 100;
	let easyBut = document.getElementById("easyMode");
    let colorBut = document.getElementById("colorChange");
    let background = document.getElementById("background");
    let scoreMessage = document.getElementById("scoreMessage")
    var canInteract = true; //setting up a flag so that user will not be able to hit space when the new round function is active 
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var jonkSize = 20;
    var easyMessage = document.getElementById("easyMessage");


    //when double clicking the background of the SVG, the color will change to a random color
    background.addEventListener("dblclick", changeColor);
    
    //when clicking the easy button, jonk size will increase and a message will display that easy mode is active
    easyBut.onclick = function (){
          jonkSize = 40;
          easyMessage.innerHTML = "Easy Mode Activated";
        }

    //this will run the newRound function when you hit the space bar
    document.body.onkeyup = function(e){
      if (canInteract){ //
        if(e.code == "Space"){
          newRound();}}}

    //function to set background color to random color
    function changeColor(){
      let randomColor = Math.floor(Math.random()*16777215).toString(16);
      background.setAttribute("fill", "#" + randomColor);
    }

    function newRound(){
      canInteract = false; //stop user from clicking/pressing any buttons 
      itsRainingJonks(); //drop all the jonks on the board 
      setTimeout(function (){
        setTimeout(function(){
          stopBounce(); //this will remove the id from circle and cut off its connection to the animation
          checkForJonk();
        }, 5000);
      startBounce();}, 1500) //start bounce after 1.5s (duration of drop animation)
      jonksOnBoard = jonksOnBoard + 1; //each round the number of jonks will increase by 1 to increase the diffculty
      }
    
    //function that uses a while loop to create many jonks to drop at once
    function itsRainingJonks(){
      let count = 0;
      while(count < jonksOnBoard){ //creats jonks until count is equal to number of jonksOnBoard
        create();
        count = count + 1;}
      }

      //adds an id to the circle object in svg so that the animation will link to it and it will run 
    function startBounce(){
      document.querySelector("circle").id = "ball";}

      //removes the id from the circle object so animation can be reset
    function stopBounce(){
      document.querySelector("circle").removeAttribute("id");}

	function create() {
		let svg = document.getElementById('svg1');
		let newJonk = document.createElementNS(svgNS, "rect");
        let randomColor = Math.floor(Math.random()*16777215).toString(16); //sets a variable for a random hex color
		newJonk.setAttribute('id', "jonk" + jonkId); 
		newJonk.setAttribute('class', "jonk");
		newJonk.setAttribute('x', (Math.random() * 400) + 20);
		newJonk.setAttribute('y', (Math.random() * 500) + 20);
        newJonk.setAttribute("fill", "#" + randomColor); //fills with random color
		newJonk.setAttribute('width', jonkSize);
		newJonk.setAttribute('height', jonkSize);
		newJonk.setAttribute('onclick', 'deleteJonk("jonk' + jonkId + '")'); //allows for jonk to be deleted using delete jonk function
		svg.appendChild(newJonk);
		jonkId++;
	}

    //checks to see if jonks are present on the board
    function checkForJonk(){
      let svg = document.getElementById('svg1');
		if(svg.getElementsByClassName("jonk").length){ //if there is an object in the array of classnames (aka a jonk existing)
        window.alert(`You lost!! Highscore: ${score}`); //window pop up to announce loss and score
        window.location.reload(); //refreshes the page and will reset game to start state
      }
      else{
        score = score + 1; //adds one to the score
        scoreMessage.innerHTML = `Score: ${score}` //updates score 
        canInteract = true; //will allow the user to start clicking again if they succeed in the round 
        }
	}

	function deleteJonk(id) {
		let svg = document.getElementById('svg1'); //get the SVG
		let jonk = document.getElementById(id); //get children by their id
		if (jonk) { //if its a jonk
			svg.removeChild(jonk); //remove that jonk
		}
	}


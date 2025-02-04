window.addEventListener("load", function () {

const randomizeButton = document.getElementById("randomizebutton");
            const timerButton = document.getElementById("timerbutton")
            const image1 = document.getElementById("image_spot_1");
            const image2 = document.getElementById("image_spot_2");
            const image3 = document.getElementById("image_spot_3");
            const imageCounter = document.getElementById("image_counter");
            const timerOutput = document.getElementById("countdown");
            const timeFieldInput = document.getElementById("countdown_update");
            let timerDuration = 10; //how long the clock will run for
            let timeOnClock = timerDuration; //sets the time on the clock to the duration (starting count that will decrement)
            var numberOfSwaps = 0; //used to track how many times the images have swapped
            var counterMessage = "Total images shown: " + numberOfSwaps; //message that will be updated and print to innerhtml for swapcounter
            

            // setting up arrays to take images

            //first array is my cat rowan (3 images of him)
            var rowanArray = new Array; //set up the array
            rowanArray[0] = new Image (); //new image at index
            rowanArray[0] = "images/rowan1.jpg"; //sets image 

            rowanArray[1] = new Image ();
            rowanArray[1] = "images/rowan2.jpg"; 

            rowanArray[2] = new Image ();
            rowanArray[2] = "images/rowan3.jpg";


            //setting second array for my cat fawkes 
            var fawkesArray = new Array;
            fawkesArray[0] = new Image();
            fawkesArray[0] = "images/fawkes1.jpg"

            fawkesArray[1] = new Image();
            fawkesArray[1] = "images/fawkes2.jpg"

            fawkesArray[2] = new Image();
            fawkesArray[2] = "images/fawkes3.jpg"


            //setting third array for my dog ellie 
            var ellieArray = new Array;
            ellieArray[0] = new Image();
            ellieArray[0] = "images/ellie1.jpg"

            ellieArray[1] = new Image();
            ellieArray[1] = "images/ellie2.jpg"

            ellieArray[2] = new Image();
            ellieArray[2] = "images/ellie3.jpg"

            //setting an array that will hold all 3 pet arrays 
            var petArray = [rowanArray, fawkesArray, ellieArray];


        //function is responsible for producing the output to the timer and swapping images 
        setInterval (function(){       
            let roundedTimeOnClock = Math.round(timeOnClock * 10)/10; // this will round the number coming through to 1 decimal place each iteration through the set interval
            timerOutput.innerHTML = "Next Swap in: " + roundedTimeOnClock.toString(); //to string of the rounded version of time on clock
            timeOnClock -= 0.1; //counts down by 1/10th of a second
            if (timeOnClock > (timerDuration * 0.6)){ // will be a green background for anything greater than 2/3 of time remaining
                timerOutput.style.backgroundColor = "mediumseagreen";
                timerOutput.style.color = "white";}
            else if(timeOnClock > (timerDuration * 0.3) && timeOnClock < (timerDuration * 0.6)){ //between 1/3 and 2/3 will display background as yellow
                timerOutput.style.backgroundColor = "palegoldenrod";
                timerOutput.style.color = "black";}
            else if(timeOnClock < (timerDuration * 0.3) && timeOnClock > 0){ // less than 1/3 and greater than 0 on the clock will display red
                timerOutput.style.backgroundColor = "maroon";
                timerOutput.style.color = "white";}
            else if (timeOnClock < 0){ // I think due to precision issues, it was necessary to swap to less than 0. when it reaches this point, it will call function to randomize all and reset the timer to the DURATION
                randomizeAll();
                timeOnClock = timerDuration;
            }
        }, 100) // 1/10th of a second countdown, every 1/10th second will readjust output to screen


        //function that takes input from user in text field and uses it to modify the duration of the timer
        function changeTimerDuration(){
            let checkingValue = timeFieldInput.value; //saves value from textfield into a temporary value
            if (checkingValue >= 500 && checkingValue <= 10000){ //if the temporary value is in the range
                timerDuration = checkingValue / 1000; //sets the timer duratio to this value
                timeOnClock = timerDuration; //also has to reset time on clock 
            }else
                window.alert("Bad value! Must be between 500 to 10000ms *Hint - this is equivalent to 0.5 to 10 seconds."); //prints an alert to user window that they put a bad value in 
            
        }
        timerButton.addEventListener("click", changeTimerDuration)


        /** function to randomize all three images when user clicks the randomize button and update the refresh counter */        
        function randomizeAll(){
            let randomValue1 = Math.floor(Math.random() * 3); //generate three random values (so images will not be coupled to the same value) between 0-2
            let randomValue2 = Math.floor(Math.random() * 3);
            let randomValue3 = Math.floor(Math.random() * 3); 

            //**note! i chose to maintain the categories, and randomize just the images within them */
            //if i wanted to randomize them all completely, i would have created a random value for first dimension of array, or called the function for radnomizeimage1
            image1.src = petArray[0][randomValue1]; //2d array, choose which pet array, then random value will choose the index for the image from that pet array
            image2.src = petArray[1][randomValue2];
            image3.src = petArray[2][randomValue3];
            numberOfSwaps += 3; //swapping 3 images, so add 3 to the counter
            imageCounter.innerHTML = "Total images shown: " + numberOfSwaps; // update image counter output
        }

        //set values for the animation
        const imageSpinning = [{transform: "rotate(360deg)"}] // will do a 360 rotation
        
        const spinDuration = {
            duration: 500, //500ms long
            iterations: 1, //1 spin
        }

        //function for image 1 animation, that calls the function to randomize image 1
        function imageSpin(image){
            image.animate(imageSpinning, spinDuration); //apply animation and duration specified previously
            setTimeout(randomizeImage(image), 490); //animation duration is 500 seconds, will allow the animation to almost fully complete then switch the image
        }
        //function to randomize image 1
        function randomizeImage(image){
            let randomValue1 = Math.floor(Math.random() * 3); //create a random value for first dimension of array (which pet array)   
            let randomValue2 = Math.floor(Math.random() * 3); //create a randome value for the image to be called 
            image.src = petArray[randomValue1][randomValue2]; //save the image src to this
            numberOfSwaps += 1; //increment number of swaps
            imageCounter.innerHTML = "Total images shown: " + numberOfSwaps; //output to screen
        }

        document.addEventListener("click", (e) => {
            if(e.target.id == "image_spot_1"){
                imageSpin(image1);
            }
            else if(e.target.id == "image_spot_2"){
                imageSpin(image2);
                randomizeImage(image2);
            }else if(e.target.id == "image_spot_3"){
                imageSpin(image3);
            }
            });

        randomizeButton.addEventListener("click", randomizeAll);
        window.addEventListener("load", randomizeAll);
        
        randomizeAll(); //this allows the images to randomize on load 

})
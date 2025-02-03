/**
 * Created by Oceanna Hartog; 000940535 on June 16th, 2024
 */

window.addEventListener("load",function(){


    /**
     * uses boolean logic to determin is a number is in a range and returns an innerHTML statement regarding success
     */
document.getElementById("g1q1_input").onchange=function group_1_choice_1(){

    let g1q1_value = document.getElementById("g1q1_input").value;
    // let q1_value = firstInput.value;

    let output = document.getElementById("g1q1_output");
    if ((g1q1_value==0)||(g1q1_value >=13 && g1q1_value <=17)){
    output.innerHTML = "In range";}
    else if (isNaN(g1q1_value)){
        output.innerHTML = "Not a number."
    }
    else {
        output.innerHTML = "Out of range";
    }

}
/**
 * divides user input to return values in years, months, and days
 */
document.getElementById("g1q2_input").onchange = function group_1_choice_2() {

    let g1q2_value = document.getElementById("g1q2_input").value;
    let output = document.getElementById("g1q2_output");
    let years = 0;
    let months = 0;
    let input = g1q2_value;
    let days = 0;

/**
 * if tree to claculate age
 */
    if (g1q2_value >= 365.25){ /* at least 1 year? */
        years = Math.trunc(g1q2_value / 365.25); /* how many years - math.trunc will give integer value*/
        g1q2_value = g1q2_value - (365.25 * years); /* subtracts the amount of years from the total and leaves remainder to be divided into months/days*/  
        if (g1q2_value >= 30.44){ /* if remainder after calculating years is at least 1 month or more*/
            months = Math.trunc(g1q2_value / 30.44) /* calculate number of months per remaining value*/
            g1q2_value = g1q2_value - (months * 30.44); /* new value will be remainder after subtracting the number of months */
            days = g1q2_value;
            output.innerHTML = "Input: " + input  + " & Output: " + years + " years, " + months + " months, " + " & " + days + " days"}
        else if(g1q2_value < 30.44){
            days = g1q2_value;
            output.innerHTML = "Input: " + input  + " & Output: " + years + " years, " + months + " months, " + " & " + days + " days"}
    } else if ((g1q2_value >= 30.44) && (g1q2_value <= 365.25)) { /* this if tree will trigger if amount enter is less than a year but more than or equal to 1 month*/
        months = Math.trunc(g1q2_value / 30.44)
        g1q2_value = g1q2_value - (30.44 * months);
        days = g1q2_value;
        output.innerHTML = "Input: " + input  + " & Output: " + years + " years, " + months + " months, " + " & " + days + " days"
    }else if ((g1q2_value<30.44) && (g1q2_value >0)){ /*this tree will trigger for any time less than a month and greater than 0 (including half days) */
        days = g1q2_value;
        output.innerHTML = "Input: " + input  + " & Output: " + years + " years, " + months + " months, " + " & " + days + " days"
    }
    else if (isNaN(g1q2_value)){ /*if non numeric */
        output.innerHTML = "Non-numeric input";
    }else { /*if negative */
        output.innerHTML = "Negative input";}
}


/**
 * takes user input and checks if input matches value in an array to determine if it is vowel, y, or something else
 */
document.getElementById("g2q1_input").onchange = function group_2_choice_1() {
    let g2q1_value = document.getElementById("g2q1_input").value;
    let output = document.getElementById("g2q1_output");
    
    let vowelString = ["a","e","i","o","u", "A", "E", "I", "O", "U", "y", "Y"] /*assign a list containing vowels for for loop to check input against */
    
    let isVowel = false; /* flag for if vowel is present that allows 2 for loops to work*/ 
        
    /**
     * for loop to find if input is within the range
     */
        for (i=0; i < vowelString.length-2; i++){ /*runs from index 0-9 not including list items for y and checks if the input is the same*/
            if (g2q1_value === vowelString[i]) {
                output.innerHTML = "Vowel"
                isVowel = true; /*sets flag to true  */
            }
        }
        for (i=10; i <vowelString.length; i++) { /* starts loop at the 10 so it only includes last 2 index items (y) */
            if (g2q1_value === vowelString[i]) {
                output.innerHTML = "Sometimes a vowel."
                isVowel = true;
            }
            else if ( isVowel == false){ /*any input that is not in the for loop conditions for vowels or y will be false */
                output.innerHTML = "Not a Vowel."
            }
        }




/**
 * calculates factorial for user input using a while loop
 */
document.getElementById("g2q3_input").onchange = function group_2_choice_3() {

    let g2q3_value = document.getElementById("g2q3_input").value;
    let output = document.getElementById("g2q3_output");
    let factorial = 1;
    let initialValue = g2q3_value;



    /** while loop for factorial calculation  */
    if (g2q3_value > 1){ /*validates greater than 1 before starting the loops - input is greater than 1*/
        while (g2q3_value > 1) { /*while input value is greater than 1 (will decrement so each factorial value will be multiplied with)*/
            factorial = factorial * g2q3_value; /*will multiply factorial value by input, meaning that starting value * 1 will then be multiplied by next factorial */
            g2q3_value = g2q3_value - 1; /*decreases input variable so that it is one less to multiply against the factorial amount - will continue to multiply and decrease by 1 each time  */
        }
        output.innerHTML = "The factorial for " + initialValue + " is " + factorial;
    } else {
        output.innerHTML = "Cannot compute this factorial."}

}


/**
 * calculates if user input is 0/1, if it is long enough, then converts input from binary to decimal
 */
document.getElementById("g3q1_input").onchange = function group_3_choice_1() {
    let g3q1_value = document.getElementById("g3q1_input").value;
    let output = document.getElementById("g3q1_output");
    let decimalValue = 0;
    if ((g3q1_value.length <=20) && (g3q1_value.length >=10)) { /*validates user input is correct length */
        if (/[^01]/.test(g3q1_value)){ /* this checks is a number input is not a 0 or 1 */
           output.innerHTML = "Invalid input";} /*failed 0 or 1 validation */
        else {
            count = 0;
            for (i=0; i < g3q1_value.length; i++) { /*using a for loop so each number input is multiplied */
                decimalValue = decimalValue + (((g3q1_value[i]) * (2)) ** count); /*updates the decimal value by multiplying the number at index by 2 (to boolean) and multiplying by the power of the count  */
                count +=1; /* count increments each time */
            }
            output.innerHTML = "The binary equivalent of the number is" + decimalValue + "this is greater than 10 and 1 or 0" /*statement for binary output */
        }

    }else {
        output.innerHTML = "Invalid input"; /*failed length validation */

    }
    

}
}

}
)
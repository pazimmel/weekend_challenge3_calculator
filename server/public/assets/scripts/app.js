/**
 * Created by PaulZimmel on 10/30/15.
 */

//declare variables
var operation, values, calculationObject, result, buttonArray;
var calculationOrder = [];
buttonArray = [9,8,7,6,5,4,3,2,1,0,".","CE"];

$(document).ready(function(){
    init();
    enable();
});

/// init, enable, disable clear functions///

//initialize calculator
function init(){
    appendButtons();
    clearVariables();
}

//run calculator
function enable() {
    $(".numbers").children().on('click', numberPress);
    $(".operators").children().on('click', operatorPress);
}

//stop calculator
function disable() {
    $(".numbers").children().off('click', numberPress);
    $(".operators").children().off('click', operatorPress);
}

//clear variables
function clearVariables() {
    values = {
        calculatorScreen: 0
    };
    calculationObject = {
        calculation: 0
    };

    calculationOrder.length = 0;
    calculationOrder = [];
    operation = "";
    result = 0;
    $("#calculatorScreen").val("");
}


/// Calculator Button Operations///

//function when a number or CE is pressed
function numberPress() {
    if(this.id != "ce") {
        $("#calculatorScreen").val($("#calculatorScreen").val() + this.id);
    } else if (this.id =="ce") {
        clearVariables();
    }

}

//function once one of the four operators(-,+,*,/) are pressed
function operatorPress() {

    determineNumber();
    determineOperation(this);
}

//function for equals button
function equalsButton(eventID){
    if(eventID == "equals"){

        calculationOrder.pop();
        calculationObject.calculation = calculationOrder;

        sendCalculatorInfo();
    }
}


//////Calculator Operation Functions/////

//take number from form field
function determineNumber(){

    $.each($("#calculatorScreen").serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

    if (values.calculatorScreen == ""){
        $("#computationScreen").val("error");
        calculationOrder.length = 0;
        clearVariables();
    }

    calculationOrder.push(values.calculatorScreen);

    return values;
}

//determine type of mathematical operation, includes ajax call if equals button pushed
function determineOperation(event){
    operation = event.id;

    calculationOrder.push(operation);

    $("#calculatorScreen").val('');
    equalsButton(operation);

    return operation;
}



//send calculator info to server to be computed and then appended to the DOM
function sendCalculatorInfo() {
    console.log("here is the computation, ",calculationObject.calculation);
    $.ajax({
        type: "POST",
        url: "/data",
        data: calculationObject,
        success: function(data){
            clearVariables();
            result = data.result;
            console.log("here is the data back, ", result);
            appendResult();

        }
    });
}

/////Append Dom functions////

//append buttons
function appendButtons() {

    //buttonArray = [9,8,7,6,5,4,3,2,1,0,".", "CE"];
    for ( i = 0; i<buttonArray.length;i++){
        $(".numbers").append("<div id ='"+buttonArray[i]+"'" +
            " class = 'number_button btn btn-default'>"+buttonArray[i]+"</div>")
    }
}
//append result
function appendResult(){
    $("#calculatorScreen").val(result);
}

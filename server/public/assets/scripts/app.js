/**
 * Created by PaulZimmel on 10/30/15.
 */
var operation, values, calculationObject, result, buttonNumber;
var calculationOrder = [];

$(document).ready(function(){
    init();
    enable();
});

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
}


/// Calculator Button Operations///
//function when a number is pressed
function numberPress() {

    $("#calculatorScreen").val($("#calculatorScreen").val()+this.id);

}
//function once one of the four operators(-,+,*,/) are pressed
function operatorPress() {

    determineNumber();
    determineOperation(this);
    clearPress(this.id);
    //console.log(calculationOrder);

}
//function for equals button
function equalsButton(eventID){
    if(eventID == "equals"){

        //console.log("equals!!");
        calculationOrder.pop();
        //console.log("equals! Here is the calculation array, ",calculationOrder);
        calculationObject.calculation = calculationOrder;
        sendCalculatorInfo();

    }
}
//function when ce button is pressed
function clearPress(eventID){
    if(eventID=="ce"){
        clearVariables();
    }
    return eventID;
}




//take number from form field
function determineNumber(){

    $.each($("#calculatorScreen").serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

    if (values.calculatorScreen == ""){
        $("#computationResult").val(666);
        calculationOrder.length = 0;
        clearVariables();

    }
    calculationOrder.push(values.calculatorScreen);
    //console.log("in determineNumber, ",calculationOrder);
    return values;
}

//determine type of mathematical operation, includes ajax call if equals button pushed
function determineOperation(event){
    operation = event.id;
    //console.log("in determinOperation, ", operation);
    calculationOrder.push(operation);
    //console.log("in determineOperation, ",calculationOrder);
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
            result = data.result;
            console.log("here is the data back, ", result);
            appendResult();
            clearVariables();

        }
    });
}

//append functions
function appendButtons() {

    var numberArray = [9,8,7,6,5,4,3,2,1,0,".", "ce"];
    for ( i = 0; i<numberArray.length;i++){
        $(".numbers").append("<div id ='"+numberArray[i]+"' class = 'btn btn-default'>"+numberArray[i]+"</div>")
    }
}
function appendResult(){
    $("#calculatorScreen").val(result);
}

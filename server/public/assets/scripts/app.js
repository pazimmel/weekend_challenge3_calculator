/**
 * Created by PaulZimmel on 10/30/15.
 */
var operationType, operation, number;

$(document).ready(function(){
    init();
    enable();

});

function init(){
    operationType = [];
    operation = "";
}

function enable() {

    $(".operators").children().on('click', takeInformation);
}

function disable() {
    $(".operators").children().off('click', takeInformation);
}

function takeInformation() {
    var click = (this);
    determineOperation(this);
    determineNumber();
}

function determineOperation(event){
    operation = event.id;
    operationType.push(operation);
    //console.log(event);
    //console.log(event.id);
    //console.log(operationType);
}
function determineNumber(){
    var number = {};
    $.each($("#firstNumber").serializeArray(), function(i, field){
        number[field.name] = field.value;
    });
    console.log(number);
}
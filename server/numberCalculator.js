//var express = require('express');
//var app = express();
var index = require('./routes/index');
var result;

var compute = function (calculationOrder){
    //for(var i = 0; i<calculationOrder.length; i++){
        switch (calculationOrder[1]) {
            case "add":
                result = Number(calculationOrder[0]) + Number(calculationOrder[2]);
                break;
            case "subtract":
                result = Number(calculationOrder[0]) - Number(calculationOrder[2]);
                break;
            case "multiply":
                result = Number(calculationOrder[0]) * Number(calculationOrder[2]);
                break;
            case "divide":
                result = Number(calculationOrder[0]) / Number(calculationOrder[2]);
                break;
            default:
                result = "error";
        }
        return result;
        //console.log(calculationOrder[i]);
    //}
};



module.exports = compute;
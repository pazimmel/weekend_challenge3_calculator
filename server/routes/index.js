var express = require('express');
var router = express.Router();
var path = require('path');
var compute = require('../numberCalculator');



router.post('/data', function(req,res){
    var result = compute(req.body.calculation);
    //var result = compute(req.body);
    res.send({result: result});
});
router.get('/*', function(req, res){
    var file = req.params[0] || "index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;
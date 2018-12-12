var express = require("express");

var router = express.Router();

// Import the model

var burger = require("../models/burger.js");

// Create routes

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create([
        "Name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        // send back ID of new thing
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(re, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // if no rows changed, id must not exist
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes

module.exports = router; 
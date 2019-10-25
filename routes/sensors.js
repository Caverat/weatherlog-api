const express = require("express");
const router = express.Router();

// get all sensors
router.get("/", (req, res) => {    
    res.send("Hello World");
});

// get one sensor
router.get("/:id", (req, res) => {

});

// create a sensor
router.post("/", (req, res) => {

});

// update a sensor
router.patch("/:id", (req, res) => {

});

// delete a sensor
router.delete("/:id", (req, res) => {

});

module.exports = router;
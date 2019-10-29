const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensor");

// get all sensors
router.get("/", async (req, res) => {  
    try{
        const sensors = await Sensor.find().select('-entries');
        res.json(sensors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get one sensor
router.get("/:id", getSensorWithEntries, (req, res) => {
    res.json(res.sensor.populate("entries"));
});

// create a sensor
router.post("/", async (req, res) => {
    const sensor = new Sensor({
        name: req.body.name,
        description: req.body.description,
        mountDate: req.body.mountDate,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        type: req.body.type
    });

    try {
        const newSensor = await sensor.save();
        res.status(201).json(newSensor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update a sensor
router.patch("/:id", getSensor, async (req, res) => {
    if(req.body.name !== undefined) {
        res.sensor.name = req.body.name;
    }
    if(req.body.description !== undefined) {
        res.sensor.description = req.body.description;
    }
    if(req.body.latitude !== undefined) {
        res.sensor.latitude = req.body.latitude;
    }
    if(req.body.longitude !== undefined) {
        res.sensor.longitude = req.body.longitude;    
    }
    if(req.body.type !== undefined) {
        res.sensor.type = req.body.type;
    }
    try {
        const updatedSensor = await res.sensor.save();
        res.json(updatedSensor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete a sensor
router.delete("/:id", getSensor, async (req, res) => {
    try {
        await res.sensor.remove();
        res.json({ message: `Deleted sensor with id ${req.params.id}` });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSensorWithEntries(req, res, next) {
    try {
        sensor = await Sensor.findById(req.params.id).populate("entries");
        if (sensor === null) {
            return res.status(404).json({ message: `Can't find sensor with id ${req.params.id}`});
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.sensor = sensor;
    next();
};

async function getSensor(req, res, next) {
    try {
        sensor = await Sensor.findById(req.params.id);
        if (sensor === null) {
            return res.status(404).json({ message: `Can't find sensor with id ${req.params.id}`});
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.sensor = sensor;
    next();
};

module.exports = router;
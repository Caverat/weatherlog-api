const express = require("express");
const router = express.Router({ mergeParams: true });
const Entry = require("../models/entry");
const Sensor = require("../models/sensor");

// get all entries for sensor id
router.get("/", getSensor, async (req, res) => {
    try{
        res.json(res.sensor.entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// add entry for a sensor
router.post("/", getSensor, async (req, res) => {
    try{
        const entry = new Entry({
            time: req.body.time,
            value: req.body.value
        });

        const newEntry = await entry.save();

        res.sensor.entries.push(entry);
        const sensor = await res.sensor.save();        

        res.status(201).json(newEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getSensor(req, res, next) {
    try {
        sensor = await Sensor.findById(req.params.sensorId).populate("entries");
        if (sensor === null) {
            return res.status(404).json({ message: `Can't find sensor with id ${req.params.sensorId}`});
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.sensor = sensor;
    next();
};

module.exports = router;
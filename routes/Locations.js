const express = require('express');
const router = express.Router();
const path = require('path');
const Location = require(__dirname + '/../models/Location');

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.get('/:id', getLocation, (req, res) => {
    res.json(res.location);
});

router.post('/', async (req, res) => {
    const location = new Location({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', getLocation, async (req, res) => {
    if (req.body.name != null) {
        res.location.name = req.body.name;
    }
    if (req.body.description != null) {
        res.location.description = req.body.description;
    } try {
        const updatedLocation = await res.location.save();
        res.json(updatedLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getLocation, async (req, res) => {
    try {
        await res.location.remove();
        res.json({ message: 'Deleted location!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getLocation(req, res, next) {
    try {
        location = await Location.findById(req.params.id);
        if (location === null) {
            return res.status(404).json({ message: 'Location not found!' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.location = location;
    next();
}

module.exports = router;
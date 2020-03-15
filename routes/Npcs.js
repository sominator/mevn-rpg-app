const express = require('express');
const router = express.Router();
const path = require('path');
const Npc = require(__dirname + '../models/Npc');

router.get('/', async (req, res) => {
    try {
        const npcs = await Npc.find();
        res.json(npcs);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.get('/:id', getNpc, (req, res) => {
    res.json(res.npc);
});

router.post('/', async (req, res) => {
    const npc = new Npc({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newNpc = await npc.save();
        res.status(201).json(newNpc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', getNpc, async (req, res) => {
    if (req.body.name != null) {
        res.npc.name = req.body.name;
    }
    if (req.body.description != null) {
        res.npc.description = req.body.description;
    } try {
        const updatedNpc = await res.npc.save();
        res.json(updatedNpc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getNpc, async (req, res) => {
    try {
        await res.npc.remove();
        res.json({ message: 'Deleted npc!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getNpc(req, res, next) {
    try {
        npc = await Npc.findById(req.params.id);
        if (npc === null) {
            return res.status(404).json({ message: 'Npc not found!' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.npc = npc;
    next();
}

module.exports = router;
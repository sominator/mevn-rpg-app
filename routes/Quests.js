const express = require('express');
const router = express.Router();
const path = require('path');
const Quest = require(__dirname + '/models/Quest');

router.get('/', async (req, res) => {
    try {
        const quests = await Quest.find();
        res.json(quests);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.get('/:id', getQuest, (req, res) => {
    res.json(res.quest);
});

router.post('/', async (req, res) => {
    const quest = new Quest({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newQuest = await quest.save();
        res.status(201).json(newQuest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', getQuest, async (req, res) => {
    if (req.body.name != null) {
        res.quest.name = req.body.name;
    }
    if (req.body.description != null) {
        res.quest.description = req.body.description;
    } try {
        const updatedQuest = await res.quest.save();
        res.json(updatedQuest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getQuest, async (req, res) => {
    try {
        await res.quest.remove();
        res.json({ message: 'Deleted quest!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getQuest(req, res, next) {
    try {
        quest = await Quest.findById(req.params.id);
        if (quest === null) {
            return res.status(404).json({ message: 'Quest not found!' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.quest = quest;
    next();
}

module.exports = router;
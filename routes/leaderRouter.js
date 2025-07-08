const express = require('express');
const Leader = require('../models/leaders');
const router = express.Router();
const { verifyOrdinaryUser, verifyAdmin } = require('../middleware/authenticate');

//Get All Leader
router.get('/', async (req, res) => {
    try {
        const leader = await Leader.find({})
        res.json(leader);
    } catch (
    err
    ) {
        res.status(500).json({ error: err.message })
    }
});

// Get a Leader
router.get('/:leaderId ', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const leader = await Leader.findById(req.params.leaderId);
        if (!leader) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(leader);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new Promotion
router.post('/', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const leader = new Leader(req.body);
        const saveLeader = await leader.save();
        res.json(saveLeader);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Promotion
router.put('/:leaderId', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const updateLeader = await Leader.findByIdAndUpdate(
            req.params.leaderId,
            req.body,
            { new: true }
        );
        if (!updateLeader) {
            return res.status(404).json({ message: 'Dishes not found' });
        }
        res.json(updateLeader);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a Leader
router.delete('/:leaderId', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const leader = await Leader.findByIdAndDelete(req.params.leaderId);
        if (!leader) {
            return res.status(404).json({ message: 'leader not found' });
        }
        res.json({ message: 'Leader deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;

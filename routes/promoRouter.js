const express = require('express');
const Promotion = require('../models/promotion');
const router = express.Router();
const { verifyOrdinaryUser, verifyAdmin } = require('../middleware/authenticate');

//Get All Promotion
router.get('/', async (req, res) => {
    try {
        const promotion = await Promotion.find({})
        res.status(200).json(promotion);
        res.json();
    } catch (
    err
    ) {
        res.status(500).json({ error: err.message })
    }
});

// Get a Promotion
router.get('/:promoId ', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.promoId);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' });
        }
        res.json(promotion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new Promotion
router.post('/', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const promotion = new Promotion(req.body);
        const savePromotion = await promotion.save();
        res.json(savePromotion);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// Update Promotion
router.put('/:promoId', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const updatePromotion = await Promotion.findByIdAndUpdate(
            req.params.promoId,
            { $set: req.body },
            { new: true }
        );
        res.json(updatePromotion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Promotion
router.delete('/:promoId', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(req.params.promoId);
        if (!deletedPromotion) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Promotion deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;

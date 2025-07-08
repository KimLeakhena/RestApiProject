const express = require('express');
const Dish = require('../models/dishes');
const router = express.Router();
const { verifyOrdinaryUser, verifyAdmin } = require('../middleware/authenticate');

//Get All Dish
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find({})
        res.status(200).json(dishes);
    } catch (
    err
    ) {
        res.status(500).json({ error: err.message })
    }
});

// Create a new dishes
router.post('/', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const dishes = new Dish(req.body);
        const savedDish = await dishes.save();
        res.json(savedDish);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// Get a  dishes by id
router.get('/:dishId ', async (req, res) => {
    try {
        const dishes = await Dish.findById(req.params.dishId);
        if (!dishes) {
            return res.status(404).json({ message: 'Dishes not found' });
        }
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Update dishes
router.put('/:dishId', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(
            req.params.dishId,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedDish);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a dishes
router.delete('/:dishId', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        await Dish.findByIdAndDelete(req.params.dishId);
        res.json({ message: 'Dish deleted' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//UPDATE comment 
router.put('/:dishId/comments/:commentId', verifyOrdinaryUser, async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.dishId);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });

        const comment = dish.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });


        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only update your own comment' });
        }
        if (req.body.comment) comment.comment = req.body.comment;
        if (req.body.rating) comment.rating = req.body.rating;

        await dish.save();
        res.status(200).json({ message: 'Comment updated', dish });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//DELETE comment 
router.delete('/:dishId/comments/:commentId', verifyOrdinaryUser, async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.dishId);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });

        const comment = dish.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own comment' });
        }

        dish.comments.pull(comment._id);
        await dish.save();

        res.status(200).json({ message: 'Comment deleted', dish });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router;

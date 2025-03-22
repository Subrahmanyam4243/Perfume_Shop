// server/routes/perfumeRoutes.js
const express = require('express');
const Perfume = require('../models/Perfume');
const router = express.Router();

// Get all perfumes
router.get('/', async (req, res) => {
    try {
        const perfumes = await Perfume.find();
        res.json(perfumes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single perfume by ID
router.get('/:id', async (req, res) => {
    try {
        const perfume = await Perfume.findById(req.params.id);
        if (!perfume) return res.status(404).json({ message: 'Perfume not found' });
        else res.json(perfume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a review to a perfume
router.post('/:id/reviews', async (req, res) => {
    try {
        const perfume = await Perfume.findById(req.params.id);
        perfume.reviews.push(req.body);
        await perfume.save();
        res.status(201).json(perfume.reviews[perfume.reviews.length - 1]); // Return the newly added review
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
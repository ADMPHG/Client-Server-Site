const express = require('express');
const router = express.Router();
const rockets = require('../../rocketData');

// GET rockets
router.get('/', async (req, res) => {
    try {
        await res.json(rockets);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// GET single rocket
router.get('/:name', getRocket, (req, res) => {
    res.send(res.rocket);
});

// Middleware function to retrieve rocket
async function getRocket (req, res, next) {
    let rocket;
    try {
        rocket = await rockets.filter(rockets => rockets.name === req.params.name);
        // if member doesn't exist, return 404
        if (Object.keys(rocket).length === 0) {
            return res.status(404).json({ msg: `No rocket with name ${req.params.name}` });
        }
    } catch (err) {
        // if server encounters error, return 500
        return res.status(500).json({ msg: err.message });
    }
    res.rocket = rocket;
    // move onto next piece of middleware, or actual request
    next();
}

module.exports = router;

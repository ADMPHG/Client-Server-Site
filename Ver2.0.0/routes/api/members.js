const express = require('express');
const router = express.Router();
let members = require('../../memberData');

// GET all members
router.get('/', async (req, res) => {
    try {
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// GET single member by id
router.get('/:id', getMemberID, (req, res) => {
    res.status(200).send(res.member);
});

// GET members by name
router.get('/name/:name', getMemberName, (req, res) => {
    res.status(200).send(res.member);
});

// GET members by email
router.get('/email/:email', getMemberEmail, (req, res) => {
    res.status(200).send(res.member);
});

// Create members
router.post('/', async (req, res) => {
    const newMember = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        favRocket: req.body.favRocket
    };
    if (!newMember.name || !newMember.email || !newMember.id) {
        return res.status(400).json({ msg: 'ID, name and email required.' });
    }
    try {
        members.push(newMember);
        res.status(201).json({ msg: 'Member created', members });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Update member
router.patch('/:id', getMemberID, async (req, res) => {
    if (req.body.id != null) {
        res.member[0].id = req.body.id;
    }
    if (req.body.name != null) {
        res.member[0].name = req.body.name;
    }
    if (req.body.email != null) {
        res.member[0].email = req.body.email;
    }
    if (req.body.favRocket != null) {
        res.member[0].favRocket = req.body.favRocket;
    }
    try {
        res.status(200).json({ msg: 'Member updated', members });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Delete member - return remaining members
router.delete('/:id', getMemberID, async (req, res) => {
    try {
        members = members.filter(members => members.id !== res.member[0].id);
        res.status(200).json({ msg: 'Member deleted', members });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Retrieve members with favourite rocket
router.get('/fav/:favRocket', async (req, res) => {
    let member;
    try {
        member = members.filter(members => members.favRocket === req.params.favRocket);
        if (member === []) {
            res.status(200).json({ msg: 'No users set this as their favourite rocket :(' });
        } else {
            res.status(200).json(member);
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Functions //

// Middleware function to retrieve members by ID
async function getMemberID (req, res, next) {
    let member;
    try {
        member = members.filter(members => members.id === parseInt(req.params.id));
        // if member doesn't exist, return 404
        if (Object.keys(member).length === 0) {
            return res.status(404).json({ msg: `No member with ID of ${req.params.id}` });
        }
    } catch (err) {
        // if server encounters error, return 500
        return res.status(500).json({ msg: err.message });
    }
    res.member = member;
    // move onto next piece of middleware, or actual request
    next();
}
// Middleware function to retrieve members by ID
async function getMemberName (req, res, next) {
    let member;
    try {
        member = members.filter(members => members.name === req.params.name);
        // if member doesn't exist, return 404
        if (Object.keys(member).length === 0) {
            return res.status(404).json({ msg: `No member with Name of ${req.params.name}` });
        }
    } catch (err) {
        // if server encounters error, return 500
        return res.status(500).json({ msg: err.message });
    }
    res.member = member;
    // move onto next piece of middleware, or actual request
    next();
}
// Middleware function to retrieve members by email
async function getMemberEmail (req, res, next) {
    let member;
    try {
        member = members.filter(members => members.email === req.params.email);
        // if member doesn't exist, return 404
        if (Object.keys(member).length === 0) {
            return res.status(404).json({ msg: `No member with Email of ${req.params.email}` });
        }
    } catch (err) {
        // if server encounters error, return 500
        return res.status(500).json({ msg: err.message });
    }
    res.member = member;
    // move onto next piece of middleware, or actual request
    next();
}

module.exports = router;

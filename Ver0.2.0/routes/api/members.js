const express = require('express');
const router = express.Router();
const members = require('../../memberData');

// GET all members
router.get('/', async (req, res) => {
    try {
        await res.json(members);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// GET single member by id
router.get('/:id', getMember, (req, res) => {
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
        await members.push(newMember);
        await res.status(201).json({ msg: 'Member created', members });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// Update member
router.patch('/:id', getMember, async (req, res) => {
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
router.delete('/:id', getMember, async (req, res) => {
    try {
        const deleteMembers = members.filter(members => members.id !== res.member[0].id);
        await res.status(200).json({ msg: 'Member deleted', members: deleteMembers });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Retrieve members with favourite rocket
router.get('/fav/:favRocket', async (req, res) => {
    let member;
    try {
        member = await members.filter(members => members.favRocket === req.params.favRocket);
        if (member === []) {
            res.status(200).json({ msg: 'No users set this as their favourite rocket :(' });
        } else {
            res.status(200).json(member);
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Middleware function to retrieve member
async function getMember (req, res, next) {
    let member;
    try {
        member = await members.filter(members => members.id === parseInt(req.params.id));
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

module.exports = router;

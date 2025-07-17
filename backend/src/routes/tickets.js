const express = require('express');
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  res.json(tickets);
});

router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  const ticket = await Ticket.create({ title, description, user: req.user.id });
  res.json(ticket);
});

module.exports = router;

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const message = await prisma.contactMessage.create({ data: req.body });
  res.json({ message: 'Message envoyé avec succès', id: message.id });
});

router.get('/', auth, async (req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(messages);
});

router.put('/:id/read', auth, async (req, res) => {
  const msg = await prisma.contactMessage.update({
    where: { id: parseInt(req.params.id) },
    data: { read: true },
  });
  res.json(msg);
});

router.delete('/:id', auth, async (req, res) => {
  await prisma.contactMessage.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Message supprimé' });
});

module.exports = router;

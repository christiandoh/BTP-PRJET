const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const { validate } = require('../errors');
const { contactSchema } = require('../validation');
const { emitToAdmin } = require('../socket');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', validate(contactSchema), async (req, res) => {
  const message = await prisma.contactMessage.create({ data: req.body });
  emitToAdmin('new-message', { id: message.id, name: message.name, subject: message.subject, createdAt: message.createdAt });
  res.json({ message: 'Message envoyé avec succès', id: message.id });
});

router.get('/', auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.contactMessage.count(),
  ]);
  res.json({ data: messages, total, page, limit, pages: Math.ceil(total / limit) });
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

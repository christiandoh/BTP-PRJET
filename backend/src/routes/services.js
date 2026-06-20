const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  res.json(services);
});

router.post('/', auth, async (req, res) => {
  const service = await prisma.service.create({ data: req.body });
  res.json(service);
});

router.put('/:id', auth, async (req, res) => {
  const service = await prisma.service.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(service);
});

router.delete('/:id', auth, async (req, res) => {
  await prisma.service.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Service supprimé' });
});

module.exports = router;

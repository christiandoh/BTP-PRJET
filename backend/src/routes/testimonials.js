const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const testimonials = await prisma.testimonial.findMany();
  res.json(testimonials);
});

router.post('/', auth, async (req, res) => {
  const testimonial = await prisma.testimonial.create({ data: req.body });
  res.json(testimonial);
});

router.put('/:id', auth, async (req, res) => {
  const testimonial = await prisma.testimonial.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(testimonial);
});

router.delete('/:id', auth, async (req, res) => {
  await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Témoignage supprimé' });
});

module.exports = router;

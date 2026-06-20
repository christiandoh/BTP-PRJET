const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const { validate } = require('../errors');
const { projectSchema } = require('../validation');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.project.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.project.count(),
  ]);
  res.json({ data, total, page, limit, pages: Math.ceil(total / limit) });
});

router.get('/all', async (req, res) => {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const project = await prisma.project.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!project) return res.status(404).json({ error: 'Projet introuvable' });
  res.json(project);
});

router.post('/', auth, validate(projectSchema), async (req, res) => {
  const project = await prisma.project.create({ data: req.body });
  res.json(project);
});

router.put('/:id', auth, validate(projectSchema), async (req, res) => {
  const project = await prisma.project.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(project);
});

router.delete('/:id', auth, async (req, res) => {
  await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Projet supprimé' });
});

module.exports = router;

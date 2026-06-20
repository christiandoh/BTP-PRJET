const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const project = await prisma.project.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!project) return res.status(404).json({ error: 'Projet introuvable' });
  res.json(project);
});

router.post('/', auth, async (req, res) => {
  const project = await prisma.project.create({ data: req.body });
  res.json(project);
});

router.put('/:id', auth, async (req, res) => {
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

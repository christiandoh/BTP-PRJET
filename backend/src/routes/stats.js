const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', auth, async (req, res) => {
  const [projects, testimonials, messages, unread, services, projectsByCategory, readCount, recentProjects, recentMessages] = await Promise.all([
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.service.count(),
    prisma.project.groupBy({ by: ['category'], _count: true }),
    prisma.contactMessage.count({ where: { read: true } }),
    prisma.project.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ]);

  res.json({
    projects,
    testimonials,
    messages,
    unread,
    read: readCount,
    services,
    projectsByCategory: projectsByCategory.map(p => ({ name: p.category, count: p._count })),
    recentProjects,
    recentMessages,
  });
});

module.exports = router;

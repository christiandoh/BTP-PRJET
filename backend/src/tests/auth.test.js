const express = require('express');
const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const authRoutes = require('../routes/auth');

const prisma = new PrismaClient();

let app;
let server;

beforeAll(async () => {
  const hash = await bcrypt.hash('Test1234!', 10);
  await prisma.admin.upsert({
    where: { email: 'test@vitest.com' },
    update: { password: hash },
    create: { email: 'test@vitest.com', password: hash, name: 'Test Admin' },
  });

  app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  server = app.listen(0);
});

afterAll(async () => {
  await prisma.admin.deleteMany({ where: { email: 'test@vitest.com' } });
  await prisma.$disconnect();
  server.close();
});

describe('POST /api/auth/login', () => {
  it('returns 200 and token on valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'test@vitest.com', password: 'Test1234!' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.admin.email).toBe('test@vitest.com');
  });

  it('returns 401 on wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'test@vitest.com', password: 'WrongPass123!' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Email ou mot de passe incorrect');
  });

  it('returns 401 on unknown email', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'unknown@test.com', password: 'Test1234!' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Email ou mot de passe incorrect');
  });

  it('returns 400 on invalid email format', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'bad', password: 'Test1234!' });
    expect(res.status).toBe(400);
  });

  it('returns 400 on short password', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'test@test.com', password: '12' });
    expect(res.status).toBe(400);
  });
});

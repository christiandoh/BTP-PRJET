# BTP.Pro — Fullstack Project

Site web fullstack pour une entreprise de bâtiment (BTP).

## Stack

- **Frontend** : React + Vite
- **Backend** : Express + Prisma + SQLite
- **Admin Dashboard** : Stats, CRUD projets/témoignages/messages, Assistant IA
- **Docker** : Dockerfiles prêts (backend + frontend + nginx)

## Installation

```bash
# Backend
cd backend
npm install
npx prisma db push
node prisma/seed.js
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## Admin

URL : http://localhost:3000/admin
Login : admin@btppro.fr / Admin123!

## Docker

```bash
docker-compose up
```

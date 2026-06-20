<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <br/><br/>
</div>

<br/>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Playfair+Display&size=42&duration=3000&pause=1000&color=C8A45C&center=true&vCenter=true&width=600&lines=BTP.Pro;Construction+%26+R%C3%A9novation+de+Prestige;Fullstack+Application" alt="Title" />
</p>

<p align="center">
  <b>Application fullstack professionnelle</b> pour une entreprise de BTP — <br/>
  Site vitrine responsive + Dashboard admin avec assistant IA intégré.
</p>

<br/>

---

## Aperçu

| Section | Fonctionnalités |
|---------|----------------|
| **Site public** | Accueil, À propos, Services, Projets, Contact |
| **Dashboard admin** | Statistiques, CRUD projets/témoignages, Messages, Assistant IA |
| **Authentification** | JWT, route protégée, session persistante |
| **Upload d'images** | Stockage local via Multer |
| **Assistant IA** | Chat intelligent connecté aux données du système |

---

## Stack technique

### Frontend

| Technologie | Rôle |
|-------------|------|
| **React 19** | UI component-based |
| **Vite 6** | Build tool & dev server |
| **React Router v7** | Routing SPA |
| **Recharts** | Diagrammes premium (barres, donut) |
| **FontAwesome 6** | Icônes professionnelles |
| **Axios** | Client HTTP |
| **Poppins + Playfair Display** | Typographie premium |

### Backend

| Technologie | Rôle |
|-------------|------|
| **Express** | Serveur REST |
| **Prisma 6** | ORM type-safe |
| **SQLite** | Base de données embarquée |
| **JWT** | Authentification |
| **Multer** | Upload fichiers |
| **Nodemailer** | (optionnel) Email |

### DevOps

| Technologie | Rôle |
|-------------|------|
| **Docker** | Conteneurisation |
| **Nginx** | Reverse proxy production |
| **GitHub** | Gestion de version |

---

## Installation rapide

```bash
# 1. Backend
cd backend
npm install
npx prisma db push
node prisma/seed.js
npm run dev          # → http://localhost:5000

# 2. Frontend (autre terminal)
cd frontend
npm install
npm run dev          # → http://localhost:3000
```

## Avec Docker

```bash
docker-compose up
```

---

## Administration

| Accès | Identifiants |
|-------|-------------|
| **URL** | `http://localhost:3000/admin` |
| **Email** | `christiandoh29@gmail.com` |
| **Mot de passe** | `Hacker@117` |

### Dashboard

- **Statistiques** — Cartes KPI + diagrammes (projets par catégorie, statut messages)
- **Projets** — CRUD complet avec upload d'images
- **Témoignages** — Gestion des avis clients
- **Messages** — Boîte de réception des formulaires de contact
- **Assistant IA** — Chat intelligent interrogeant les données du système

---

## Structure du projet

```
BTP_Project/
├── backend/
│   ├── prisma/           # Schéma SQLite + seed
│   ├── src/
│   │   ├── routes/       # auth, projects, testimonials, services, contact, stats, upload
│   │   ├── middleware/   # Authentification JWT
│   │   └── index.js      # Point d'entrée Express
│   ├── uploads/          # Images uploadées
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/        # Home, Services, Projects, Contact
│   │   ├── admin/        # Login, Dashboard (CRUD + Assistant IA)
│   │   ├── components/   # Navbar, Footer
│   │   ├── api.js        # Client Axios
│   │   └── App.jsx       # Routing
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── .gitignore
```

---

<p align="center">
  <b>BTP.Pro</b> — L'excellence dans la construction depuis 2009.<br/>
  <sub>Développé avec ❤️ par Christian Doh</sub>
</p>

<p align="center">
  <a href="https://github.com/christiandoh/BTP-PRJET">
    <img src="https://img.shields.io/github/stars/christiandoh/BTP-PRJET?style=social" />
  </a>
  <a href="https://github.com/christiandoh/BTP-PRJET/issues">
    <img src="https://img.shields.io/github/issues/christiandoh/BTP-PRJET?style=social" />
  </a>
</p>

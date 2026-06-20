require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const testimonialRoutes = require('./routes/testimonials');
const serviceRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
const statsRoutes = require('./routes/stats');
const uploadRoutes = require('./routes/upload');
const { errorHandler, notFound } = require('./errors');
const { initSentry } = require('./sentry');
const { cacheMiddleware } = require('./cache');
const { initSocket } = require('./socket');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

initSentry(app);

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes, réessayez dans 15 minutes' },
});
app.use('/api/', limiter);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', cacheMiddleware(60), statsRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.use(notFound);
app.use(errorHandler);

initSocket(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

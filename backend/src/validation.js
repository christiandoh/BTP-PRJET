const { z } = require('zod');

const contactSchema = z.object({
  name: z.string().min(2, 'Nom trop court').max(100),
  email: z.string().email('Email invalide'),
  subject: z.string().max(200).optional().default(''),
  service: z.string().max(100).optional().default(''),
  message: z.string().min(10, 'Message trop court').max(2000),
});

const projectSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10).max(2000),
  category: z.string().min(2).max(100),
  location: z.string().min(2).max(200),
  surface: z.string().max(50).optional().default(''),
  imageUrl: z.string().max(500).optional().default(''),
});

const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string().min(2).max(100),
  content: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5).optional().default(5),
  avatarColor: z.string().max(7).optional().default('#C8A45C'),
});

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
});

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

module.exports = { contactSchema, projectSchema, testimonialSchema, loginSchema, paginationSchema };

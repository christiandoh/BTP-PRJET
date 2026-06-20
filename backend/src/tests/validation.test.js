const { contactSchema, projectSchema, testimonialSchema, loginSchema, paginationSchema } = require('../validation');

describe('loginSchema', () => {
  it('accepts valid login', () => {
    const r = loginSchema.safeParse({ email: 'a@b.com', password: '123456' });
    expect(r.success).toBe(true);
  });
  it('rejects bad email', () => {
    const r = loginSchema.safeParse({ email: 'bad', password: '123456' });
    expect(r.success).toBe(false);
  });
  it('rejects short password', () => {
    const r = loginSchema.safeParse({ email: 'a@b.com', password: '12' });
    expect(r.success).toBe(false);
  });
});

describe('contactSchema', () => {
  it('accepts valid contact', () => {
    const r = contactSchema.safeParse({ name: 'John', email: 'j@b.com', message: 'Hello there world' });
    expect(r.success).toBe(true);
  });
  it('rejects short name', () => {
    const r = contactSchema.safeParse({ name: 'J', email: 'j@b.com', message: 'Hello there world' });
    expect(r.success).toBe(false);
  });
  it('rejects short message', () => {
    const r = contactSchema.safeParse({ name: 'John', email: 'j@b.com', message: 'Hi' });
    expect(r.success).toBe(false);
  });
  it('applies defaults', () => {
    const r = contactSchema.safeParse({ name: 'John', email: 'j@b.com', message: 'Hello there world' });
    expect(r.success).toBe(true);
    expect(r.data.subject).toBe('');
    expect(r.data.service).toBe('');
  });
});

describe('projectSchema', () => {
  it('accepts valid project', () => {
    const r = projectSchema.safeParse({ title: 'Big Project', description: 'A very nice construction project indeed', category: 'Construction', location: 'Paris' });
    expect(r.success).toBe(true);
  });
  it('applies defaults for optional fields', () => {
    const r = projectSchema.safeParse({ title: 'Big Project', description: 'A very nice construction project indeed', category: 'Construction', location: 'Paris' });
    expect(r.data.surface).toBe('');
    expect(r.data.imageUrl).toBe('');
  });
});

describe('testimonialSchema', () => {
  it('accepts valid testimonial', () => {
    const r = testimonialSchema.safeParse({ name: 'John', role: 'Client', content: 'Great work, very satisfied with the result' });
    expect(r.success).toBe(true);
  });
  it('defaults rating to 5', () => {
    const r = testimonialSchema.safeParse({ name: 'John', role: 'Client', content: 'Great work, very satisfied with the result' });
    expect(r.data.rating).toBe(5);
  });
  it('rejects rating out of range', () => {
    const r = testimonialSchema.safeParse({ name: 'John', role: 'Client', content: 'Great work, very satisfied with the result', rating: 6 });
    expect(r.success).toBe(false);
  });
});

describe('paginationSchema', () => {
  it('defaults page to 1 and limit to 10', () => {
    const r = paginationSchema.safeParse({});
    expect(r.success).toBe(true);
    expect(r.data.page).toBe(1);
    expect(r.data.limit).toBe(10);
  });
  it('coerces string numbers', () => {
    const r = paginationSchema.safeParse({ page: '2', limit: '5' });
    expect(r.data.page).toBe(2);
    expect(r.data.limit).toBe(5);
  });
  it('rejects limit over 100', () => {
    const r = paginationSchema.safeParse({ limit: '200' });
    expect(r.success).toBe(false);
  });
});

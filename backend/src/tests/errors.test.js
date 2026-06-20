const { AppError, errorHandler, notFound, validate } = require('../errors');
const { loginSchema } = require('../validation');

describe('AppError', () => {
  it('creates an operational error with status code', () => {
    const err = new AppError(404, 'Not found');
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Not found');
    expect(err.isOperational).toBe(true);
  });
});

describe('notFound', () => {
  it('passes AppError to next with 404', () => {
    const req = { originalUrl: '/api/unknown' };
    const next = (err) => {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(404);
      expect(err.message).toContain('/api/unknown');
    };
    notFound(req, null, next);
  });
});

describe('errorHandler', () => {
  it('returns operational error message', () => {
    const err = new AppError(400, 'Bad request');
    const res = { status: (code) => ({ json: (data) => { expect(code).toBe(400); expect(data.error).toBe('Bad request'); } }) };
    errorHandler(err, null, res, null);
  });

  it('hides non-operational error message', () => {
    const err = new Error('Secret crash');
    const res = { status: (code) => ({ json: (data) => { expect(code).toBe(500); expect(data.error).toBe('Erreur interne du serveur'); } }) };
    errorHandler(err, null, res, null);
  });
});

describe('validate middleware', () => {
  it('passes valid data to next', () => {
    const req = { body: { email: 'test@test.com', password: '123456' } };
    let passed = false;
    const middleware = validate(loginSchema);
    middleware(req, null, () => { passed = true; });
    expect(passed).toBe(true);
    expect(req.body.email).toBe('test@test.com');
  });

  it('rejects invalid data with 400', () => {
    const req = { body: { email: 'bad', password: '12' } };
    const res = { status: (code) => { expect(code).toBe(400); return { json: (data) => { expect(data.error).toBe('Email invalide'); } }; } };
    const middleware = validate(loginSchema);
    middleware(req, res, null);
  });
});

const Redis = require('ioredis');

let redis = null;

function getRedis() {
  if (!redis) {
    const url = process.env.REDIS_URL;
    if (!url) return null;
    redis = new Redis(url, { maxRetriesPerRequest: 3, connectTimeout: 5000, retryStrategy: (times) => Math.min(times * 100, 3000) });
    redis.on('error', (err) => console.error('Redis error:', err.message));
    redis.on('connect', () => console.log('Redis: connecté'));
  }
  return redis;
}

const cacheMiddleware = (ttlSeconds = 300) => {
  return async (req, res, next) => {
    const client = getRedis();
    if (!client) return next();

    const key = `cache:${req.originalUrl}`;
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        client.setex(key, ttlSeconds, JSON.stringify(body)).catch(() => {});
        originalJson(body);
      };
      next();
    } catch {
      next();
    }
  };
};

function clearCache(pattern) {
  const client = getRedis();
  if (!client) return Promise.resolve();
  return client.keys(pattern).then(keys => {
    if (keys.length) return client.del(...keys);
  }).catch(() => {});
}

module.exports = { cacheMiddleware, clearCache, getRedis };

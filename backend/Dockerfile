FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY prisma/ ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

RUN chmod +x start.sh
CMD ["sh", "start.sh"]

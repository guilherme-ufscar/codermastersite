FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache wireguard-tools iptables

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/portfolio.json ./portfolio.json
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prod-deps /app/node_modules ./node_modules

RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads

EXPOSE 3000

CMD ["sh", "-c", "wg-quick up wg0 2>/dev/null || true; npx prisma migrate deploy && su -s /bin/sh nextjs -c 'node server.js'"]

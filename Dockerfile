# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments for environment variables embedded during Next.js build
ARG NEXT_PUBLIC_API_URL=http://localhost:5000
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copy dependency manifests and install full dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

# Copy source code and build production Next.js application
COPY . .
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built application and required production assets from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]

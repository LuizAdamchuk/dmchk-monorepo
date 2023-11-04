# Development stage
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

RUN npm run build

# Production stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

COPY prisma ./prisma/

COPY . .

# Copy your built application
COPY --from=development /usr/src/app/dist ./dist

# Generate the Prisma Client schema
RUN npx prisma generate

# Set permissions for log files
# Check if log files exist before running chmod
RUN if [ -f /var/log/containers/*.log ]; then chmod a+r /var/log/containers/*.log; fi


CMD ["node", "dist/main"]

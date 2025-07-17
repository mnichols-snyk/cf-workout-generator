# Stage 1: Build the application
FROM node:18-slim AS builder

WORKDIR /app

# First, copy over the package.json and the prisma schema
COPY package*.json ./
COPY prisma ./prisma

# Install all dependencies. The postinstall script will run 'prisma generate'.
RUN npm install

# Then, copy over the rest of the source code
COPY . .

# Generate the prisma client and build the TypeScript code
RUN npx prisma generate
RUN npm run build

# --- DEBUGGING STEP ---
# List the contents of the app directory to verify the build output
RUN ls -la
# --- END DEBUGGING STEP ---

# Remove devDependencies to prepare for the production stage
RUN npm prune --production

# Stage 2: Create the lean production image
FROM node:18-slim

# Install openssl for Prisma and netcat for the entrypoint wait script
# We also clean up the apt-get cache to keep the image small.
RUN apt-get update && apt-get install -y openssl netcat-traditional && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the pruned node_modules, the compiled code, and the prisma schema
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["node", "dist/index.js"]

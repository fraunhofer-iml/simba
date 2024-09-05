# Install dependencies only when needed
FROM oven/bun:1.1.22 AS deps
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Production image, copy all the files and run nest
FROM oven/bun:1.1.22 AS runner
COPY --chown=bun:bun --chmod=644 --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=bun:bun --chmod=644 ./dist/apps/bff .
ENV BFF_PORT=3000
EXPOSE 3000/tcp
USER bun
CMD ["bun", "run", "main.js"]

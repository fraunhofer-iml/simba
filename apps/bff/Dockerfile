# Install dependencies only when needed
FROM oven/bun:1.1.22 AS deps
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Production image, copy all the files and run nest
FROM oven/bun:1.1.22 AS runner
COPY --chown=bun:bun --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY ./dist/apps/bff .
ENV BFF_PORT=3000
USER bun
EXPOSE 3000/tcp
CMD ["bun", "run", "main.js"]

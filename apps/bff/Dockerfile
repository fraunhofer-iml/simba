# Install dependencies only when needed
FROM oven/bun:1.1.22 AS deps
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Production image, copy all the files and run nest
FROM oven/bun:1.1.22 AS runner
COPY --chown=bun:bun --chmod=777 --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps --chmod=777 /usr/src/app/package.json ./package.json
COPY ./dist/apps/bff .

USER bun
EXPOSE 3001/tcp
CMD ["bun", "run", "main.js"]

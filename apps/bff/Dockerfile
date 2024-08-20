# Install dependencies only when needed
FROM oven/bun:latest AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Production image, copy all the files and run nest
FROM oven/bun:latest AS runner
COPY --chown=bun:bun --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY ./dist/apps/bff .
ENV BFF_PORT=3000
USER bun
EXPOSE 3000/tcp
CMD ["bun", "run", "main.js"]

FROM oven/bun:1.1.27
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production
COPY ./dist/apps/master-data-svc .
COPY ./prisma .
RUN chown -R bun:bun /usr/src/app

RUN bun add -D prisma
RUN bun prisma generate

USER bun

CMD ["bun", "main.js"]

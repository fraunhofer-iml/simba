FROM oven/bun:1.1.27-alpine
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production
COPY ./dist/apps/bff .
ENV BFF_PORT=3000
EXPOSE 3000/tcp
RUN chown -R bun:bun /usr/src/app

USER bun

CMD ["bun", "main.js"]

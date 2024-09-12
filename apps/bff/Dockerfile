FROM oven/bun:1.1.27
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production
COPY ./dist/apps/bff .
ENV BFF_PORT=3000
EXPOSE 3000/tcp
RUN chmod 755 node_modules/**/*
RUN chown bun:bun -R .

USER bun

CMD ["bun", "main.js"]

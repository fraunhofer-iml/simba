FROM oven/bun:1.1.22-alpine
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production
COPY ./dist/apps/process-svc .
ENV PROCESS_SVC_PORT=3001
EXPOSE 3001/tcp
RUN chown -R bun:bun /usr/src/app

USER bun

CMD ["bun", "main.js"]

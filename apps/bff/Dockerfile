ARG BUN_VERSION=1.1.30
ARG NODE_VERSION=20.18.0

FROM imbios/bun-node:${BUN_VERSION}-${NODE_VERSION}-slim
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production
COPY ./dist/apps/bff .
ENV BFF_PORT=3000
EXPOSE 3000/tcp

USER node

CMD ["bun", "main.js"]

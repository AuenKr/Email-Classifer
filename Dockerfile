FROM node:slim

RUN apt-get update -y && apt-get install -y openssl

RUN npm install -g bun

WORKDIR /app

COPY package* .
RUN bun install

COPY ./prisma ./prisma
RUN bun run db:generate

COPY ./ ./

EXPOSE 3000 5555

CMD [ "bun", "run", "dev:docker"]

FROM node:20 AS builder
WORKDIR /placify

COPY src/ src/
COPY public/ public/
COPY eslint.config.mjs .
COPY jsconfig.json .
COPY next.config.mjs .
COPY postcss.config.mjs .
COPY package.json .

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip

RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/bin/yt-dlp && \
    chmod +x /usr/bin/yt-dlp

RUN npm install

RUN npm run build

FROM node:20 AS runner
WORKDIR /placify

RUN apt-get update && apt-get install ffmpeg -y

ENV NODE_ENV=production

COPY --from=builder /usr/bin/yt-dlp /usr/bin/yt-dlp
COPY --from=builder /placify/.next ./.next
COPY --from=builder /placify/public ./public
COPY --from=builder /placify/package.json ./package.json
COPY --from=builder /placify/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
FROM node:lts-slim

COPY . /var/music

RUN cd /var/music && yarn --production && cd /var/music/NeteaseCloudMusicApi && yarn --production

WORKDIR /var/music

EXPOSE 5000

ENTRYPOINT [ "sh", "-c", "node prod_server.js" ]
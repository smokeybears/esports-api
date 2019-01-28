# Use the offical node image https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image
FROM node:10.15.0
# expose port 80 of the container.. will
EXPOSE 80

RUN mkdir -p /restifyServer
# inside the container working directroy is /restifyServer
WORKDIR /restifyServer

# copy current folder into container at /restifyServer
COPY . /restifyServer
RUN npm i --global

CMD ["node", "serverStart.js"]


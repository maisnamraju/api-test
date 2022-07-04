FROM node:16-alpine as development

WORKDIR /usr/src/app

RUN apk --no-cache add --virtual .builds-deps build-base python3 wget shadow \
    && npm install bcrypt node-gyp 

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait    

RUN wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.53.0/otelcol-contrib_0.53.0_linux_amd64.apk && apk add --allow-untrusted otelcol-contrib_0.53.0_linux_amd64.apk

RUN npm install

COPY --chown=node . .

RUN npm run build

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

EXPOSE ${PORT}

CMD [ "node", "." ]

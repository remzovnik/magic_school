FROM harbor.yarustech.ru/development-irus/frontend/node:current-alpine3.17
ARG ENV

WORKDIR /app

COPY app /app/

RUN yarn install
RUN yarn build:$ENV

RUN npm install serve -g

CMD ["serve", "-s", "dist", "-p", "3000"]

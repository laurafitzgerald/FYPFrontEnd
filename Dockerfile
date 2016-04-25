
FROM node
# replace this with your application's default port
EXPOSE 3000

ADD package.json /package.json
RUN npm install

ADD bin /service/bin
ADD models /service/models
ADD routes /service/routes
ADD public /service/public
ADD views /service/views
ADD app.js /service/app.js

WORKDIR /service

CMD ["node", "/service/bin/www"]

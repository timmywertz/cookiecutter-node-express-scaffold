FROM node:14.6

# define arguments
ARG port=8080

# set config
ENV NODE_ENV=production
ENV PORT=$port

RUN mkdir /app

COPY package*.json /app/

WORKDIR /app

RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start" ]

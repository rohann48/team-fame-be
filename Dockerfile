FROM public.ecr.aws/docker/library/alpine:20230329

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN apk add nodejs npm

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3002

CMD ["npm","start"]

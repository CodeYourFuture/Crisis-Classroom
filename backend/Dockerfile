FROM node:8-alpine
WORKDIR /app

# Copy package.json
# Run NPM install
# Copy rest of code
COPY . .
RUN apk add make gcc g++ && apk add python
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]

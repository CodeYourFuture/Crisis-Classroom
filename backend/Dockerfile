FROM node:8
WORKDIR  /app

# Copy package.json
# Run NPM install
# Copy rest of code
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]
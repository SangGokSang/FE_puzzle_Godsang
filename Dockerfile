# Base image
FROM node:10

# yarn 설치
RUN npm install -g yarn

# Working directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn

# Copy source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["yarn" ,"start"]
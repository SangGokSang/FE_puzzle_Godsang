# Base image
FROM node:16

# Working directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./

COPY yarn.lock ./

# Install dependencies
RUN yarn cache clean
RUN yarn install

# Copy source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["yarn" ,"start"]
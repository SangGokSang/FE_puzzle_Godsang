# Base image
FROM node:16

# Working directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

RUN  yarn build
# Expose the port
EXPOSE 3000

# Start the app
CMD ["yarn" ,"start"]
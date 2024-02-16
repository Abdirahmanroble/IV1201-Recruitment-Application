# Use the official Node.js 18 image as a parent image
FROM node:18
# Set dockerize version
ENV DOCKERIZE_VERSION v0.6.1

# Download and install dockerize
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./
COPY tsconfig.json ./

# Install the dependencies
RUN npm install

COPY . .

# Rebuild bcrypt to ensure it's compiled for the container's environment
RUN npm rebuild bcrypt --build-from-source

# Build the project
 RUN npm run build

# Expose the port your app runs on
EXPOSE 3000


#CMD [ "node", "dist/index.js" ] 
CMD ["dockerize", "-wait", "tcp://postgres:5432", "-timeout", "60s", "node", "dist/index.js"]

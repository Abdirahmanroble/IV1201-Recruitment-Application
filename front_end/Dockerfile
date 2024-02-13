# Use the official Node.js 18 image as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./
COPY tsconfig.json ./

# Install the dependencies
RUN npm install
RUN npm install -g serve

# Copy the rest of the application's code
COPY . .

# Build the project
 RUN npm run build

# Expose the port your app runs on
EXPOSE 5173

# Use serve to serve the static files
# CMD ["serve", "-s", "dist", "-l", "4000"]
CMD [ "npm", "start"]






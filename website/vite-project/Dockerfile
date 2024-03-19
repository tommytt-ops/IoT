# Step 1: Build the project
# Use a Node.js base image to build the project
FROM node:20 as build-stage

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./


# Install dependencies
RUN npm install


# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app
RUN npm run build


# Step 2: Serve the app with Nginx
FROM nginx:stable-alpine as production-stage

# Copy the built app to Nginx's serve directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]

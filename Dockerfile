# Use an official Node runtime as a parent image
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Nginx setup
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

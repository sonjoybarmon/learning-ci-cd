FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the application
CMD [ "node", "app.js" ]

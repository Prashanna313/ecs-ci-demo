FROM public.ecr.aws/d5z8k9g9/node18-alpine3.15:latest

# Create app directory
WORKDIR /usr/src/app

# App dependencies
COPY package.json ./

# Download the dependencies listed in the package.json file and create the node_modules directory
RUN npm install

# Copy the application source code
COPY index.js .
COPY routes ./routes
COPY static ./static

# Listen on port 80
EXPOSE 80

# Start the application
CMD [ "node", "index.js" ]

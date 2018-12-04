#Base image
FROM stefanscherer/node-windows

#Working directory
WORKDIR /app

#Copying package.json
COPY package.json /app

#Install dependencies
RUN npm install

#Copy rest of the code
COPY . /app

#Start the application
CMD npm start
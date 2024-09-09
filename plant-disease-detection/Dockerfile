# Example for a Next.js or React app
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the application (optional for Next.js or React)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
# 1️⃣ Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# 2️⃣ Set the working directory inside the container
WORKDIR /app

# 3️⃣ Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# 4️⃣ Copy all project files into the container
COPY . .

# 5️⃣ Build the Vite project
RUN npm run build

# 6️⃣ Use Nginx to serve the built files
FROM nginx:latest

# 7️⃣ Copy the built files to Nginx's web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# 8️⃣ Expose port 5173 (Optional, Nginx serves on 80 by default)
EXPOSE 80

# 9️⃣ Start Nginx
CMD ["nginx", "-g", "daemon off;"]
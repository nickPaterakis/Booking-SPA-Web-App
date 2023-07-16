FROM node:10-alpine as build

WORKDIR /booking-client

COPY package*.json ./

RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

RUN npm install react-scripts -g

COPY . .

RUN npm run build

CMD ["npm", "start"]

FROM nginx:1.16.0

COPY --from=build /booking-client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

FROM node:20 as builder
WORKDIR .
CMD ["mkdir", "studythere-frontend"]
COPY . ./studythere-frontend/
WORKDIR studythere-frontend
RUN npm install --registry=http://registry.npmmirror.com/
RUN npm run build
FROM nginx:stable-alpine as runtime
COPY --from=builder /studythere-frontend/dist /usr/share/nginx/html
COPY --from=builder /studythere-frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
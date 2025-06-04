# Dockerfile
FROM nginx:alpine

# Копируем сайт в стандартную директорию nginx
COPY public /usr/share/nginx/html

# Кастомный конфиг (по желанию, см. ниже)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

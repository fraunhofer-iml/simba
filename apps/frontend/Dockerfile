FROM docker.io/nginxinc/nginx-unprivileged

USER root
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/apps/frontend/browser/ /usr/share/nginx/html/

USER nginx
EXPOSE 4200:4200
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]

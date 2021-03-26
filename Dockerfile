FROM DOCKER_REGISTRY/rhscl/nginx-112-rhel7:latest
COPY ./dist/ /usr/share/nginx/html/
COPY ./env.sh /usr/share/
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN chmod +x /usr/share/env.sh  \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && chmod 777 -R /etc/nginx \
    && chmod 777 -R /usr/share/nginx \
    && mkdir -p /var/cache/nginx \
    && chmod 777 /var/cache/nginx \
    && chmod 777 /var/run
CMD /usr/share/env.sh && nginx -g 'daemon off;'

FROM DOCKER_REGISTRY/rhscl/nginx-112-rhel7:latest
ARG URL_PATH
ENV $URLPATH URL_PATH
RUN echo '环境变量URL：' + $URLPATH
COPY ./dist /usr/share/nginx/html/
COPY ./env.sh /usr/share/
RUN chmod 777 /usr/share/env.sh
COPY nginx.conf /etc/nginx/nginx.conf
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone 
EXPOSE 80
CMD /usr/share/env.sh && nginx -g 'daemon off;'

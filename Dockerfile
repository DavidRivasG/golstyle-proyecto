# Cambiamos a la versión normal para evitar el error de conexión del alpine
FROM node:lts

RUN npm install -g @angular/cli@17
WORKDIR /usr/src/app
RUN echo 'alias ng-serve="ng serve --host 0.0.0.0 --poll 500"' >> ~/.bashrc
CMD ["bash"]
# [Devathon: IV edición - Programación en Español](https://programacion-es.dev/devathon-edition/)
## ***Equipo 2 (Map It) - Backend***

### Contenido

- [Información básica](#informacion-básica)
- [Stack utilizado](#stack-utilizado)
- [Dependencias](#dependencias)
- [Variables de entorno]()
- [Como instalar en local](#como-instalar-en-local)
- [Integrantes](#integrantes)

## Informacion básica

Desarrollamos una API Rest que consulta las API de Google Mapa y Google Lugares, además incluye un control de autenticación, perfil de usuario, comentarios en los lugares y formulario de contacto.

## Stack utilizado
![mean](./docs/img/mean-stack.png)

Para esta competencia elegimos utilizar el stack de Mongo DB, Express JS, Angular y Node JS y lo desplegamos en un servidor privado virtual con Ubuntu 22.04 utilizando contenedores de Docker y Nginx.

## Dependencias

- Tener instalado y corriendo el [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Tu editor de código favorito.
- Una API Key de [Google Maps](https://developers.google.com/maps)

## Como instalar en local
- Descargar el repositorio en tu equipo
```bash
git clone https://github.com/Devathon-ED4Team2/MapIt-Backend.git
```
- Instalar las dependencias del proyecto
```bash
npn i
``` 
- Crear un archivo en la raiz del proyecto, nombrarlo *.env* y colocar los valores de las [variables de entorno](#variables-de-entorno).
- Ejecutar el docker a través del archivo compose. Se debe estar ubicado en la raiz del proyecto para ejecutar el comando.
```bash
docker compose up
```
- Disfrutar! Cualquier duda o sugerencias nos pueden contactar.

## Variables de entorno

```bash
SERVER_PORT= # numero de puerto
GOOGLE_MAPS_API_KEY= # una API Key activa de Google
SECRET_KEY= # una frase secreta 


DOCKER_DB_URI=mongodb://user:password@mongo:27017/develop?authSource=admin
USER_MONGO= # user
PASS_MONGO= # password


MAIL_HOST= # YOUR_MAIL_HOST
MAIL_PORT= # YOUR_MAIL_PORT
MAIL_USER= # YOUR_MAIL_USER
MAIL_PASSWORD= # YOUR_MAIL_PASSWORD
MAIL_FROM= # FROM_EMAIL
MAIL_SECURE= # FALSE_TRUE
MAIL_ADMIN= # ADMIN_EMAILS
```
## Integrantes
- Cristian Gonzalez
- Nicolas Gonzalez
- Héctor Rodriguez


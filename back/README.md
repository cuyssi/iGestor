# iGestor Backend

Backend REST de iGestor construido con Spring Boot 3, Java 21 y Maven.

## Requisitos

- Java 21
- Maven 3

Puedes comprobar las versiones instaladas con:

```bash
java -version
mvn -v
```

## Arranque local

Desde la carpeta `back`:

```bash
mvn spring-boot:run
```

Por defecto, la aplicación arranca en el puerto `8081` para evitar conflictos con otros proyectos locales.

Si se necesita usar otro puerto, se puede sobrescribir con la variable `SERVER_PORT`:

```bash
mvn spring-boot:run "-Dspring-boot.run.arguments=--server.port=8082"
```

## Endpoint de comprobación

Con la aplicación arrancada, se puede comprobar que el backend responde con:

```bash
curl.exe http://localhost:8081/health
```

Respuesta esperada:

```json
{
    "status": "UP"
}
```

## Base de datos local

El backend usa PostgreSQL en desarrollo mediante Docker Compose.

Para levantar la base de datos desde la carpeta `back`:

```bash
docker compose up -d
```

PostgreSQL queda disponible en:

```text
localhost:5433
```

Credenciales locales:

```text
Database: igestor
User: igestor
Password: igestor
```

Para comprobar el estado del contenedor:

```bash
docker compose ps
```

Para parar la base de datos:

```bash
docker compose down
```

Este comando detiene el contenedor, pero conserva los datos en el volumen de Docker.

## Documentación de la API

El backend expone documentación interactiva de la API mediante Swagger UI.

Con la aplicación arrancada, se puede abrir en:

```bash
http://localhost:8081/swagger-ui/index.html
```

Desde Swagger UI se pueden visualizar y probar los endpoints disponibles, como `GET /health`.

## Ramas de trabajo

- `main`: versión estable del proyecto.
- `dev`: rama de integración.
- `feature/*`: ramas pequeñas para construir cada pieza.

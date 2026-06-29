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

Por defecto, la aplicación intenta arrancar en el puerto `8080`.

Si el puerto `8080` está ocupado, se puede arrancar temporalmente en otro puerto:

```bash
mvn spring-boot:run "-Dspring-boot.run.arguments=--server.port=8081"
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

Si la aplicación está arrancada en el puerto `8080`, usar:

```bash
curl.exe http://localhost:8080/health
```

## Ramas de trabajo

- `main`: versión estable del proyecto.
- `dev`: rama de integración.
- `feature/*`: ramas pequeñas para construir cada pieza.

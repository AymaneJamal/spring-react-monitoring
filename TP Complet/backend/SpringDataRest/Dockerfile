FROM openjdk:17-jdk-slim

WORKDIR /app

# Copier directement le JAR pré-compilé
COPY target/SpringDataRest-0.0.1-SNAPSHOT.jar ./app.jar

# Exposer le port 8080
EXPOSE 8080

# Point d'entrée
ENTRYPOINT ["java", "-jar", "app.jar"]
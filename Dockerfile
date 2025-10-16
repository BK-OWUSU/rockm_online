FROM  maven:3.9.8-amazoncorretto-21-al2023 As build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk
COPY --from=build /target/RockmartService-0.0.1-SNAPSHOT.jar RockmartService.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","RockmartService.jar"]
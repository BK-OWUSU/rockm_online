package bk.io.code.RockmartService;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RockmartServiceApplication {

	public static void main(String[] args) {
//		Dotenv env = Dotenv.load();
//		env.get("DB_URL");
//		env.get("DB_USERNAME");
//		env.get("DB_PASSWORD");
		SpringApplication.run(RockmartServiceApplication.class, args);
	}
}

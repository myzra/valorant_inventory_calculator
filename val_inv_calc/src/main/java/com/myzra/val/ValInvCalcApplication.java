package com.myzra.val;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ValInvCalcApplication {
    public static void main(String[] args) {
        if (System.getenv("RENDER") == null) { // Render sets this automatically
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
            dotenv.entries().forEach(entry ->
                System.setProperty(entry.getKey(), entry.getValue())
            );
        }
        SpringApplication.run(ValInvCalcApplication.class, args);
    }
}
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
        System.out.println("=== CONNECTION DEBUG ===");
        System.out.println("DB_URL: " + System.getenv("DB_URL"));
        System.out.println("DB_USER: " + System.getenv("DB_USER"));
        System.out.println("DB_PASS: " + (System.getenv("DB_PASS") != null ? "***SET***" : "***NOT SET***"));
        System.out.println("========================");
        SpringApplication.run(ValInvCalcApplication.class, args);
    }
}
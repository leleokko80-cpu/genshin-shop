package com.genshin.shop.config;

import com.genshin.shop.model.Produit;
import com.genshin.shop.repository.ProduitRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedProducts(ProduitRepository produitRepository) {
        return args -> {
            if (produitRepository.count() == 0) {
                produitRepository.save(new Produit("Primogems x160", 0.99, 999));
                produitRepository.save(new Produit("Acquaint Fate", 1.60, 500));
                produitRepository.save(new Produit("Intertwined Fate", 1.60, 500));
                produitRepository.save(new Produit("Fragile Resin x1", 1.98, 200));
                produitRepository.save(new Produit("Genesis Crystal x60", 0.99, 999));
                produitRepository.save(new Produit("Hero's Wit x10", 2.50, 300));
                produitRepository.save(new Produit("Mora x100000", 1.50, 999));
                produitRepository.save(new Produit("Enhancement Ore x20", 1.20, 400));
                System.out.println("✅ Sample Genshin products seeded!");
            }
        };
    }
}

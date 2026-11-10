package com.genshin.shop.repository;

import com.genshin.shop.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    List<Commande> findByUtilisateurId(Long userId);
}
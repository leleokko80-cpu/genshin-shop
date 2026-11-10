package com.genshin.shop.repository;

import com.genshin.shop.model.LigneCommande;
import com.genshin.shop.model.LigneCommandeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LigneCommandeRepository extends JpaRepository<LigneCommande, LigneCommandeId> {}

package com.genshin.shop.repository;

import com.genshin.shop.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> {}

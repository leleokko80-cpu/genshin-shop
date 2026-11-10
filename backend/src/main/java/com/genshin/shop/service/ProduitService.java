package com.genshin.shop.service;

import com.genshin.shop.model.Produit;
import com.genshin.shop.repository.ProduitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public List<Produit> getAll() {
        return produitRepository.findAll();
    }

    public Produit getById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Produit create(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit update(Long id, Produit updated) {
        Produit existing = getById(id);
        existing.setNom(updated.getNom());
        existing.setPrixUnitaire(updated.getPrixUnitaire());
        existing.setStock(updated.getStock());
        return produitRepository.save(existing);
    }

    public void delete(Long id) {
        produitRepository.deleteById(id);
    }
}

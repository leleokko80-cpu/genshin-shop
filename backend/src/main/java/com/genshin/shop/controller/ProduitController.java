package com.genshin.shop.controller;

import com.genshin.shop.model.Produit;
import com.genshin.shop.service.ProduitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping
    public ResponseEntity<List<Produit>> getAll() {
        return ResponseEntity.ok(produitService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getById(@PathVariable Long id) {
        return ResponseEntity.ok(produitService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Produit> create(@RequestBody Produit produit) {
        return ResponseEntity.ok(produitService.create(produit));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit> update(@PathVariable Long id, @RequestBody Produit produit) {
        return ResponseEntity.ok(produitService.update(id, produit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        produitService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.genshin.shop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "produits")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produit")
    private Long idProduit;

    @Column(nullable = false)
    private String nom;

    @Column(name = "prix_unitaire", nullable = false)
    private double prixUnitaire;

    @Column(nullable = false)
    private int stock;

    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<LigneCommande> lignesCommande;

    public Produit() {}

    public Produit(String nom, double prixUnitaire, int stock) {
        this.nom = nom;
        this.prixUnitaire = prixUnitaire;
        this.stock = stock;
    }

    public Long getIdProduit() { return idProduit; }
    public void setIdProduit(Long idProduit) { this.idProduit = idProduit; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public double getPrixUnitaire() { return prixUnitaire; }
    public void setPrixUnitaire(double prixUnitaire) { this.prixUnitaire = prixUnitaire; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public List<LigneCommande> getLignesCommande() { return lignesCommande; }
    public void setLignesCommande(List<LigneCommande> lignesCommande) { this.lignesCommande = lignesCommande; }
}

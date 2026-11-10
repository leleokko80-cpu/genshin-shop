package com.genshin.shop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;


@Entity
@Table(name = "lignes_commande")
@IdClass(LigneCommandeId.class)
public class LigneCommande {

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_commande")
    @JsonIgnoreProperties("lignesCommande")
    private Commande commande;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_produit")
    private Produit produit;

    @Column(nullable = false)
    private int quantite;

    public LigneCommande() {}

    public LigneCommande(Commande commande, Produit produit, int quantite) {
        this.commande = commande;
        this.produit = produit;
        this.quantite = quantite;
    }

    public Commande getCommande() { return commande; }
    public void setCommande(Commande commande) { this.commande = commande; }

    public Produit getProduit() { return produit; }
    public void setProduit(Produit produit) { this.produit = produit; }

    public int getQuantite() { return quantite; }
    public void setQuantite(int quantite) { this.quantite = quantite; }
}

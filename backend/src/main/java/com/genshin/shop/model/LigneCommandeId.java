package com.genshin.shop.model;

import java.io.Serializable;
import java.util.Objects;

@SuppressWarnings("serial")
public class LigneCommandeId implements Serializable {

    private Long commande;
    private Long produit;

    public LigneCommandeId() {}

    public LigneCommandeId(Long commande, Long produit) {
        this.commande = commande;
        this.produit = produit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LigneCommandeId)) return false;
        LigneCommandeId that = (LigneCommandeId) o;
        return Objects.equals(commande, that.commande) &&
               Objects.equals(produit, that.produit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(commande, produit);
    }

    public Long getCommande() { return commande; }
    public void setCommande(Long commande) { this.commande = commande; }

    public Long getProduit() { return produit; }
    public void setProduit(Long produit) { this.produit = produit; }
}

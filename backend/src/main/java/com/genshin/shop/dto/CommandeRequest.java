package com.genshin.shop.dto;

import java.util.List;


public class CommandeRequest {

    private List<LigneRequest> lignes;

    public CommandeRequest() {}

    public List<LigneRequest> getLignes() { return lignes; }
    public void setLignes(List<LigneRequest> lignes) { this.lignes = lignes; }

    
    public static class LigneRequest {
        private Long idProduit;
        private int quantite;

        public LigneRequest() {}

        public Long getIdProduit() { return idProduit; }
        public void setIdProduit(Long idProduit) { this.idProduit = idProduit; }

        public int getQuantite() { return quantite; }
        public void setQuantite(int quantite) { this.quantite = quantite; }
    }
}

package com.genshin.shop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "commandes")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_commande")
    private Long idCommande;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_utilisateur", nullable = false)
    @JsonIgnoreProperties("commandes")
    private Utilisateur utilisateur;

    @Column(name = "date_commande")
    private LocalDate dateCommande;

    
    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<LigneCommande> lignesCommande;

    public Commande() {}

    public Commande(Utilisateur utilisateur, LocalDate dateCommande) {
        this.utilisateur = utilisateur;
        this.dateCommande = dateCommande;
    }

    public Long getIdCommande() { return idCommande; }
    public void setIdCommande(Long idCommande) { this.idCommande = idCommande; }

    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }

    public LocalDate getDateCommande() { return dateCommande; }
    public void setDateCommande(LocalDate dateCommande) { this.dateCommande = dateCommande; }

    public List<LigneCommande> getLignesCommande() { return lignesCommande; }
    public void setLignesCommande(List<LigneCommande> lignesCommande) { this.lignesCommande = lignesCommande; }
}

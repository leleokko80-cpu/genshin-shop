package com.genshin.shop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "utilisateurs")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String role; 

    @Column(nullable = false)
    private String nom; 

    private String ville; 
    
    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Commande> commandes;

    public Utilisateur() {}

    public Utilisateur(String username, String password, String role, String nom, String ville) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.nom = nom;
        this.ville = ville;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public List<Commande> getCommandes() { return commandes; }
    public void setCommandes(List<Commande> commandes) { this.commandes = commandes; }
}

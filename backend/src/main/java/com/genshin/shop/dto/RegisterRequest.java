package com.genshin.shop.dto;


public class RegisterRequest {
    private String username;
    private String password;
    private String nom;
    private String ville;

    public RegisterRequest() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }
}

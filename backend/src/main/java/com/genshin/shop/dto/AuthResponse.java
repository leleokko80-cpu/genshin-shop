package com.genshin.shop.dto;


public class AuthResponse {
    private String token;
    private String username;
    private Long userId;
    private String nom;
    private String ville;

    public AuthResponse(String token, String username, Long userId, String nom, String ville) {
        this.token = token;
        this.username = username;
        this.userId = userId;
        this.nom = nom;
        this.ville = ville;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }
}

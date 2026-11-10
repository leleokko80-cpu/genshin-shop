package com.genshin.shop.service;

import com.genshin.shop.dto.AuthRequest;
import com.genshin.shop.dto.AuthResponse;
import com.genshin.shop.dto.RegisterRequest;
import com.genshin.shop.model.Utilisateur;
import com.genshin.shop.repository.UtilisateurRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UtilisateurRepository utilisateurRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

  
    public AuthResponse register(RegisterRequest request) {
        if (utilisateurRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken");
        }

        Utilisateur user = new Utilisateur();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        user.setNom(request.getNom() != null ? request.getNom() : request.getUsername());
        user.setVille(request.getVille() != null ? request.getVille() : "");

        utilisateurRepository.save(user);

        
        String token = jwtService.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), user.getId(), user.getNom(), user.getVille());
    }

    
    public AuthResponse login(AuthRequest request) {
        Utilisateur user = utilisateurRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Bad credentials");
        }

        String token = jwtService.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), user.getId(), user.getNom(), user.getVille());
    }
}

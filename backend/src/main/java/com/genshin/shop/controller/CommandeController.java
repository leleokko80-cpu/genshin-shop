package com.genshin.shop.controller;

import com.genshin.shop.dto.CommandeRequest;
import com.genshin.shop.model.Commande;
import com.genshin.shop.service.CommandeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    private final CommandeService commandeService;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

  
    private String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("Not authenticated");
        }
        return auth.getName();
    }

 
    @GetMapping("/me")
    public ResponseEntity<List<Commande>> getMyOrders() {
        return ResponseEntity.ok(commandeService.getMyOrders(getCurrentUsername()));
    }

  
    @GetMapping("/{id}")
    public ResponseEntity<Commande> getById(@PathVariable Long id) {
        return ResponseEntity.ok(commandeService.getById(id));
    }

  
    @PostMapping
    public ResponseEntity<Commande> create(@RequestBody CommandeRequest request) {
        return ResponseEntity.ok(commandeService.createCommande(request, getCurrentUsername()));
    }
}

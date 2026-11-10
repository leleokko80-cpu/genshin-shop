package com.genshin.shop.service;

import com.genshin.shop.dto.CommandeRequest;
import com.genshin.shop.model.*;
import com.genshin.shop.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final ProduitRepository produitRepository;
    private final LigneCommandeRepository ligneCommandeRepository;

    public CommandeService(CommandeRepository commandeRepository,
                           UtilisateurRepository utilisateurRepository,
                           ProduitRepository produitRepository,
                           LigneCommandeRepository ligneCommandeRepository) {
        this.commandeRepository = commandeRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.produitRepository = produitRepository;
        this.ligneCommandeRepository = ligneCommandeRepository;
    }

    public List<Commande> getAll() {
        return commandeRepository.findAll();
    }

    public Commande getById(Long id) {
        return commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

   
    public List<Commande> getMyOrders(String username) {
        Utilisateur user = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return commandeRepository.findByUtilisateurId(user.getId());
    }


    @Transactional
    public Commande createCommande(CommandeRequest request, String username) {

        Utilisateur user = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Create the order linked to this user
        Commande commande = new Commande(user, LocalDate.now());
        commande = commandeRepository.save(commande);

        // 3. Create each order line
        for (CommandeRequest.LigneRequest ligneReq : request.getLignes()) {
            Produit produit = produitRepository.findById(ligneReq.getIdProduit())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + ligneReq.getIdProduit()));

            LigneCommande ligne = new LigneCommande(commande, produit, ligneReq.getQuantite());
            ligneCommandeRepository.save(ligne);

            // Reduce stock
            produit.setStock(produit.getStock() - ligneReq.getQuantite());
            produitRepository.save(produit);
        }

        return commande;
    }
}

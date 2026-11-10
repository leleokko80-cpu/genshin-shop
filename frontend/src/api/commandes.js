import api from './axios'

// Get only the logged-in user's orders
export const getMyOrders = () => api.get('/commandes/me')

// Place a new order (no idClient needed — backend gets it from JWT)
export const createCommande = (data) => api.post('/commandes', data)
// data shape: { lignes: [{ idProduit: 2, quantite: 3 }] }

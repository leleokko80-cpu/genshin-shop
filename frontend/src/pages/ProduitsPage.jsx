import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { getProduits } from '../api/produits'
import './ProduitsPage.css'

// Genshin-themed icons for each product type (by keyword match)
const getProductIcon = (nom) => {
  const n = nom.toLowerCase()
  if (n.includes('primogem')) return '💎'
  if (n.includes('fate') || n.includes('wish')) return '✨'
  if (n.includes('resin')) return '🌿'
  if (n.includes('crystal')) return '🔮'
  if (n.includes('wit') || n.includes('hero')) return '📖'
  if (n.includes('mora')) return '🪙'
  if (n.includes('ore')) return '⚒️'
  return '⭐'
}

export default function ProduitsPage() {
  const [produits, setProduits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [added, setAdded] = useState({}) // tracks flash animation per product

  const { addToCart } = useCart()

  useEffect(() => {
    getProduits()
      .then(res => setProduits(res.data))
      .catch(() => setError('Failed to load products. Make sure the backend is running.'))
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = (produit) => {
    addToCart(produit)
    // Flash animation feedback
    setAdded(prev => ({ ...prev, [produit.idProduit]: true }))
    setTimeout(() => {
      setAdded(prev => ({ ...prev, [produit.idProduit]: false }))
    }, 800)
  }

  const filtered = produits.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-wrapper">
      {/* Page header */}
      <div className="page-header fade-in">
        <h1 className="page-title">✦ Teyvat Emporium</h1>
        <p className="page-subtitle">Browse the finest wares from across the seven nations</p>
        <div className="divider" />

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="status-msg">
          <div className="spinner" />
          Loading wares from Teyvat...
        </div>
      )}
      {error && <div className="status-msg error">{error}</div>}

      {/* Product grid */}
      {!loading && !error && (
        <div className="products-grid">
          {filtered.length === 0 ? (
            <p className="status-msg">No items found.</p>
          ) : (
            filtered.map((produit, i) => (
              <div
                key={produit.idProduit}
                className="product-card card fade-in"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="product-icon">{getProductIcon(produit.nom)}</div>
                <h3 className="product-name">{produit.nom}</h3>

                <div className="product-meta">
                  <span className="product-price">
                    {produit.prixUnitaire.toFixed(2)}
                    <span className="price-currency"> Mora</span>
                  </span>
                  <span className={`product-stock ${produit.stock < 10 ? 'low' : ''}`}>
                    {produit.stock > 0 ? `${produit.stock} in stock` : 'Out of stock'}
                  </span>
                </div>

                <button
                  className={`btn btn-primary add-btn ${added[produit.idProduit] ? 'added' : ''}`}
                  onClick={() => handleAdd(produit)}
                  disabled={produit.stock === 0}
                >
                  {added[produit.idProduit] ? '✔ Added!' : 'Add to Cart'}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

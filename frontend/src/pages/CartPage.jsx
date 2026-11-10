import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createCommande } from '../api/commandes'
import './CartPage.css'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart()
  const { nom, ville } = useAuth()  // current logged-in user's info
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error,   setError]   = useState('')
  const navigate = useNavigate()

  const handleCheckout = async () => {
    setError('')
    if (cartItems.length === 0) { setError('Your cart is empty.'); return }

    setLoading(true)
    try {
      // No idClient needed — backend identifies user from JWT
      const payload = {
        lignes: cartItems.map(item => ({
          idProduit: item.produit.idProduit,
          quantite:  item.quantite,
        })),
      }
      await createCommande(payload)
      clearCart()
      setSuccess('Order placed successfully! The Traveler will receive their items.')
      setTimeout(() => navigate('/orders'), 2000)
    } catch {
      setError('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (itemCount === 0 && !success) {
    return (
      <div className="page-wrapper">
        <div className="empty-cart fade-in">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Visit the shop to add some Teyvat treasures</p>
          <button className="btn btn-primary" onClick={() => navigate('/produits')}>
            Browse Shop
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="page-header fade-in">
        <h1 className="page-title">✦ Your Cart</h1>
        <p className="page-subtitle">{itemCount} item{itemCount !== 1 ? 's' : ''} ready for checkout</p>
        <div className="divider" />
      </div>

      {success && (
        <div className="checkout-success fade-in">
          <div className="success-icon">✦</div>
          <p>{success}</p>
        </div>
      )}

      {!success && (
        <div className="cart-layout">
          {/* Cart items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.produit.idProduit} className="cart-item card fade-in">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.produit.nom}</span>
                  <span className="cart-item-price">
                    {(item.produit.prixUnitaire * item.quantite).toFixed(2)} Mora
                  </span>
                </div>

                <div className="cart-item-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.produit.idProduit, item.quantite - 1)}
                  >−</button>
                  <span className="qty-value">{item.quantite}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.produit.idProduit, item.quantite + 1)}
                  >+</button>
                  <button
                    className="btn btn-danger btn-sm remove-btn"
                    onClick={() => removeFromCart(item.produit.idProduit)}
                  >Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout panel */}
          <div className="checkout-panel card fade-in">
            <h2 className="panel-title">Order Summary</h2>
            <div className="divider" />

            <div className="order-row">
              <span>Items ({itemCount})</span>
              <span>{total.toFixed(2)} Mora</span>
            </div>
            <div className="divider" />

            {/* Show current user info (read-only) */}
            <div className="field-group">
              <label className="field-label">Traveler</label>
              <div style={{
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-primary)',
              }}>
                <strong>{nom}</strong>
                {ville && <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>📍 {ville}</span>}
              </div>
            </div>

            {error && <p className="auth-error" style={{ marginTop: 12 }}>⚠ {error}</p>}

            <button
              className="btn btn-primary checkout-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Placing order...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

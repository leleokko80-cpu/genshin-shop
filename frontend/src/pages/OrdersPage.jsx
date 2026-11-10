import { useState, useEffect } from 'react'
import { getMyOrders } from '../api/commandes'
import { useAuth } from '../context/AuthContext'
import './OrdersPage.css'

export default function OrdersPage() {
  const [commandes, setCommandes] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')
  const { nom } = useAuth()

  useEffect(() => {
    getMyOrders()
      .then(res => setCommandes(res.data))
      .catch(() => setError('Failed to load orders.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-wrapper">
      <div className="page-header fade-in">
        <h1 className="page-title">✦ My Orders</h1>
        <p className="page-subtitle">
          {nom ? `Order history for ${nom}` : 'Your order history'}
        </p>
        <div className="divider" />
      </div>

      {loading && (
        <div className="status-msg">
          <div className="spinner" /> Loading your orders...
        </div>
      )}

      {error && <div className="status-msg error">{error}</div>}

      {!loading && !error && commandes.length === 0 && (
        <div className="status-msg">No orders yet. Go shop something!</div>
      )}

      {!loading && !error && commandes.length > 0 && (
        <div className="orders-list">
          {commandes.map((cmd, i) => (
            <div
              key={cmd.idCommande}
              className="order-card card fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="order-header">
                <span className="order-id">Order #{cmd.idCommande}</span>
                <span className="order-date">
                  📅 {cmd.dateCommande
                    ? new Date(cmd.dateCommande).toLocaleDateString('en-GB')
                    : '—'}
                </span>
              </div>

              {cmd.utilisateur && (
                <div className="order-client">
                  <span className="label">Traveler:</span>
                  <span>{cmd.utilisateur.nom}</span>
                  {cmd.utilisateur.ville && (
                    <span className="city">📍 {cmd.utilisateur.ville}</span>
                  )}
                </div>
              )}

              {cmd.lignesCommande && cmd.lignesCommande.length > 0 && (
                <div className="order-lines">
                  {cmd.lignesCommande.map((ligne, j) => (
                    <div key={j} className="order-line">
                      <span>{ligne.produit?.nom || `Product #${j + 1}`}</span>
                      <span className="line-qty">× {ligne.quantite}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { createContext, useContext, useState, useEffect, useRef } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children, username }) {
  const [cartItems, setCartItems] = useState([])
  const prevUsername = useRef(username)

  // If the logged-in user changes (switch account / logout), clear the cart immediately
  useEffect(() => {
    if (prevUsername.current !== username) {
      setCartItems([])
      prevUsername.current = username
    }
  }, [username])

  const addToCart = (produit) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.produit.idProduit === produit.idProduit)
      if (existing) {
        return prev.map(item =>
          item.produit.idProduit === produit.idProduit
            ? { ...item, quantite: item.quantite + 1 }
            : item
        )
      }
      return [...prev, { produit, quantite: 1 }]
    })
  }

  const removeFromCart = (idProduit) => {
    setCartItems(prev => prev.filter(item => item.produit.idProduit !== idProduit))
  }

  const updateQuantity = (idProduit, quantite) => {
    if (quantite < 1) { removeFromCart(idProduit); return }
    setCartItems(prev =>
      prev.map(item =>
        item.produit.idProduit === idProduit ? { ...item, quantite } : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  const total = cartItems.reduce(
    (sum, item) => sum + item.produit.prixUnitaire * item.quantite, 0
  )

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantite, 0)

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart,
      updateQuantity, clearCart, total, itemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

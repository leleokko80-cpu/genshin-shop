import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProduitsPage from './pages/ProduitsPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'

// Separate component so useAuth() works inside AuthProvider
function AppRoutes() {
  const { username } = useAuth()

  return (
    // Pass username as key to CartProvider — when it changes the cart resets
    <CartProvider username={username}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/produits" element={
          <ProtectedRoute><ProduitsPage /></ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute><CartPage /></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute><OrdersPage /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

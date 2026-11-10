import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wraps pages that require login
// If not logged in → redirect to /login
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

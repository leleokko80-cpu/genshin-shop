import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken]       = useState(() => localStorage.getItem('token') || null)
  const [username, setUsername] = useState(() => localStorage.getItem('username') || null)
  const [userId, setUserId]     = useState(() => {
    const id = localStorage.getItem('userId')
    return id ? Number(id) : null
  })
  const [nom, setNom]   = useState(() => localStorage.getItem('nom') || null)
  const [ville, setVille] = useState(() => localStorage.getItem('ville') || null)

  // Called after login OR register — both return the same AuthResponse now
  const login = (newToken, newUsername, newUserId, newNom, newVille) => {
    localStorage.setItem('token',    newToken)
    localStorage.setItem('username', newUsername)
    localStorage.setItem('userId',   String(newUserId))
    localStorage.setItem('nom',      newNom || newUsername)
    localStorage.setItem('ville',    newVille || '')

    setToken(newToken)
    setUsername(newUsername)
    setUserId(newUserId)
    setNom(newNom || newUsername)
    setVille(newVille || '')
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    localStorage.removeItem('nom')
    localStorage.removeItem('ville')
    setToken(null)
    setUsername(null)
    setUserId(null)
    setNom(null)
    setVille(null)
  }

  return (
    <AuthContext.Provider value={{
      token, username, userId, nom, ville,
      login, logout,
      isLoggedIn: !!token
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

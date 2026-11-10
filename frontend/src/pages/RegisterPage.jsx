import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerApi } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import './AuthPage.css'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [nom,      setNom]      = useState('')
  const [ville,    setVille]    = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }
    if (!nom.trim()) {
      setError('Please enter your full name.')
      return
    }

    setLoading(true)
    try {
      // Register returns an AuthResponse (token + user info) — auto-login!
      const res = await registerApi(username, password, nom, ville)
      const { token, username: uname, userId, nom: userNom, ville: userVille } = res.data
      login(token, uname, userId, userNom, userVille)
      // Go straight to the shop, no redirect to login
      navigate('/produits')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Username may be taken.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-bg">
      <div className="stars">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
          }} />
        ))}
      </div>

      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="auth-emblem">✧</div>
          <h1 className="auth-title">Begin Your Journey</h1>
          <p className="auth-subtitle">Create your account to shop across Teyvat</p>
        </div>

        <div className="divider" />

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group">
            <label className="field-label">Full Name *</label>
            <input
              type="text"
              placeholder="Your name (e.g. Lumine)"
              value={nom}
              onChange={e => setNom(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="field-group">
            <label className="field-label">City</label>
            <input
              type="text"
              placeholder="Your city (e.g. Mondstadt)"
              value={ville}
              onChange={e => setVille(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Username *</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password *</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">Confirm Password *</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">⚠ {error}</p>}

          <button
            type="submit"
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="divider" />

        <p className="auth-switch">
          Already a traveler? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

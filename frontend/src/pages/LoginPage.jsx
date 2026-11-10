import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as loginApi } from '../api/auth'
import './AuthPage.css'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await loginApi(username, password)
      // res.data = { token, username, userId, nom, ville }
      const { token, username: uname, userId, nom, ville } = res.data
      login(token, uname, userId, nom, ville)
      navigate('/produits')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.')
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
          <div className="auth-emblem">✦</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue your journey, Traveler</p>
        </div>

        <div className="divider" />

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group">
            <label className="field-label">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">⚠ {error}</p>}

          <button
            type="submit"
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Enter Teyvat'}
          </button>
        </form>

        <div className="divider" />

        <p className="auth-switch">
          New traveler?{' '}
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

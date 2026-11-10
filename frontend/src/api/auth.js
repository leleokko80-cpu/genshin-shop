import api from './axios'

export const register = (username, password, nom, ville) =>
  api.post('/auth/register', { username, password, nom, ville })

export const login = (username, password) =>
  api.post('/auth/login', { username, password })

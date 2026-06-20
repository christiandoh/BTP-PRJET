import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const auth = {
  login: data => api.post('/auth/login', data).then(r => r.data),
  me: () => api.get('/auth/me').then(r => r.data),
}

export const projects = {
  getAll: () => api.get('/projects').then(r => r.data),
  get: id => api.get(`/projects/${id}`).then(r => r.data),
  create: data => api.post('/projects', data).then(r => r.data),
  update: (id, data) => api.put(`/projects/${id}`, data).then(r => r.data),
  delete: id => api.delete(`/projects/${id}`).then(r => r.data),
}

export const testimonials = {
  getAll: () => api.get('/testimonials').then(r => r.data),
  create: data => api.post('/testimonials', data).then(r => r.data),
  update: (id, data) => api.put(`/testimonials/${id}`, data).then(r => r.data),
  delete: id => api.delete(`/testimonials/${id}`).then(r => r.data),
}

export const services = {
  getAll: () => api.get('/services').then(r => r.data),
  update: (id, data) => api.put(`/services/${id}`, data).then(r => r.data),
}

export const contact = {
  send: data => api.post('/contact', data).then(r => r.data),
  getAll: () => api.get('/contact').then(r => r.data),
  markRead: id => api.put(`/contact/${id}/read`).then(r => r.data),
  delete: id => api.delete(`/contact/${id}`).then(r => r.data),
}

export const stats = {
  get: () => api.get('/stats').then(r => r.data),
}

export const uploads = {
  upload: (file) => {
    const fd = new FormData()
    fd.append('image', file)
    return api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data)
  },
}

export const assistant = {
  query: (msg) => api.post('/assistant', { message: msg }).then(r => r.data),
}

export default api

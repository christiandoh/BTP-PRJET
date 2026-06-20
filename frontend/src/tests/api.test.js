import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockAxiosInstance = {
  interceptors: {
    request: { use: vi.fn() },
    response: { use: vi.fn() },
  },
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockAxiosInstance),
  },
  create: vi.fn(() => mockAxiosInstance),
}))

const { auth, projects, contact, uploads } = await import('../api')

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

describe('auth', () => {
  it('login posts to /auth/login', async () => {
    mockAxiosInstance.post.mockResolvedValue({ data: { token: 'x', admin: { email: 'a@b.com' } } })
    const res = await auth.login({ email: 'a@b.com', password: 'p' })
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login', { email: 'a@b.com', password: 'p' })
    expect(res.token).toBe('x')
  })

  it('me gets /auth/me', async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: { email: 'a@b.com' } })
    const res = await auth.me()
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/auth/me')
    expect(res.email).toBe('a@b.com')
  })
})

describe('projects', () => {
  it('getAll with pagination', async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: { data: [], total: 0 } })
    const res = await projects.getAll(2, 5)
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/projects?page=2&limit=5')
    expect(res.total).toBe(0)
  })
})

describe('contact', () => {
  it('send posts to /contact', async () => {
    mockAxiosInstance.post.mockResolvedValue({ data: { success: true } })
    const res = await contact.send({ name: 'J', email: 'j@b.com', message: 'Hello!' })
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/contact', { name: 'J', email: 'j@b.com', message: 'Hello!' })
    expect(res.success).toBe(true)
  })
})

describe('uploads', () => {
  it('upload sends FormData', async () => {
    mockAxiosInstance.post.mockResolvedValue({ data: { url: '/uploads/test.jpg' } })
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const res = await uploads.upload(file)
    expect(mockAxiosInstance.post).toHaveBeenCalled()
    expect(res.url).toBe('/uploads/test.jpg')
  })
})

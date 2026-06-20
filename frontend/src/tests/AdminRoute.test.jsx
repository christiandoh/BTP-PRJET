import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminRoute from '../admin/AdminRoute'

beforeEach(() => {
  localStorage.clear()
})

describe('AdminRoute', () => {
  it('renders children when token exists', () => {
    localStorage.setItem('token', 'fake-token')
    render(
      <MemoryRouter>
        <AdminRoute><div data-testid="child">Protected</div></AdminRoute>
      </MemoryRouter>
    )
    expect(screen.getByTestId('child')).toHaveTextContent('Protected')
  })

  it('redirects to /admin when no token', () => {
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <AdminRoute><div>Protected</div></AdminRoute>
      </MemoryRouter>
    )
    expect(screen.queryByText('Protected')).not.toBeInTheDocument()
  })
})

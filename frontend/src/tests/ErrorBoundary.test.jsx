import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../components/ErrorBoundary'

function Bomb() {
  throw new Error('Boom!')
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">OK</div>
      </ErrorBoundary>
    )
    expect(screen.getByTestId('child')).toHaveTextContent('OK')
  })

  it('catches error and shows fallback', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    )
    expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument()
    expect(screen.getByText('Boom!')).toBeInTheDocument()
    expect(screen.getByText('Recharger la page')).toBeInTheDocument()
    vi.restoreAllMocks()
  })
})

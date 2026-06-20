import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Skeleton, { CardSkeleton, StatCardSkeleton } from '../components/Skeleton'

describe('Skeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild
    expect(el).toBeInTheDocument()
    expect(el.style.width).toBe('100%')
    expect(el.style.height).toBe('20px')
  })

  it('renders with custom dimensions', () => {
    const { container } = render(<Skeleton width={100} height={50} borderRadius={8} />)
    const el = container.firstChild
    expect(el.style.width).toBe('100px')
    expect(el.style.height).toBe('50px')
    expect(el.style.borderRadius).toBe('8px')
  })
})

describe('CardSkeleton', () => {
  it('renders three skeleton bars', () => {
    const { container } = render(<CardSkeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

describe('StatCardSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<StatCardSkeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

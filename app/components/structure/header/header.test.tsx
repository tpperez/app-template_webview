import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Header from './header'

describe('Header', () => {
  it('should render header structure', () => {
    const mockData = {
      links: [{ id: '', text: '', href: '' }],
    }

    render(<Header data={mockData} />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should toggle mobile menu when hamburger button is clicked', () => {
    const mockData = {
      links: [{ id: '', text: '', href: '' }],
    }

    const { container } = render(<Header data={mockData} />)

    const hamburgerButton = screen.getByRole('button')

    expect(container.querySelector('.lg\\:hidden nav')).not.toBeInTheDocument()

    fireEvent.click(hamburgerButton)

    expect(container.querySelector('.lg\\:hidden nav')).toBeInTheDocument()

    fireEvent.click(hamburgerButton)

    expect(container.querySelector('.lg\\:hidden nav')).not.toBeInTheDocument()
  })

  it('should close mobile menu when mobile link is clicked', () => {
    const mockData = {
      links: [{ id: '', text: '', href: '' }],
    }

    const { container } = render(<Header data={mockData} />)

    const hamburgerButton = screen.getByRole('button')

    fireEvent.click(hamburgerButton)

    expect(container.querySelector('.lg\\:hidden nav')).toBeInTheDocument()

    const mobileLink = container.querySelector('.lg\\:hidden nav a')
    fireEvent.click(mobileLink!)

    expect(container.querySelector('.lg\\:hidden nav')).not.toBeInTheDocument()
  })
})

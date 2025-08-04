import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SITE_NAME } from '@/app/constants/config'

import Logo from './logo'

describe('Logo Component', () => {
  it('should apply base classes correctly', () => {
    const { container } = render(<Logo variant='dark' />)
    const logoElement = container.firstChild

    expect(logoElement).toHaveClass(
      'inline-flex',
      'shrink-0',
      'items-center',
      'gap-3',
    )
  })

  it('should apply custom className when provided', () => {
    const customClass = 'custom-logo-class'
    const { container } = render(
      <Logo
        variant='dark'
        className={customClass}
      />,
    )
    const logoElement = container.firstChild

    expect(logoElement).toHaveClass(customClass)
  })

  it('should render with both variant options', () => {
    const { rerender } = render(<Logo variant='dark' />)
    const darkLogo = screen.getByText(SITE_NAME)
    expect(darkLogo).toBeInTheDocument()

    rerender(<Logo variant='light' />)
    const lightLogo = screen.getByText(SITE_NAME)
    expect(lightLogo).toBeInTheDocument()
  })
})

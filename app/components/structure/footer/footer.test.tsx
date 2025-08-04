import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Footer from './footer'

describe('Footer', () => {
  it('should render footer structure', () => {
    const mockData = {
      text: '',
      copyrightText: '',
      sectionLink: [
        {
          id: '',
          title: '',
          links: [{ id: '', text: '', href: '' }],
        },
      ],
    }

    render(<Footer data={mockData} />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})

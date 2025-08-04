import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TechStats from './stats'

vi.spyOn(console, 'error').mockImplementation(() => {})

describe('TechStats', () => {
  it('should render stats structure', () => {
    const mockData = {
      items: [],
    }

    const { container } = render(<TechStats data={mockData} />)

    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('should render stats items', () => {
    const mockData = {
      items: [
        {
          id: '',
          title: '',
          subtitle: '',
        },
      ],
    }

    const { container } = render(<TechStats data={mockData} />)

    expect(container.querySelector('li')).toBeInTheDocument()
  })
})

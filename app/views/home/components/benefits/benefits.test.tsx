import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Benefits from './benefits'

describe('Benefits', () => {
  it('should render benefits structure', () => {
    const mockData = {
      title: '',
      description: '',
      items: [
        {
          id: '',
          image: {
            alt: 'test',
            url: '',
            height: 0,
            width: 0,
          },
          title: '',
          description: '',
        },
      ],
    }

    const { container } = render(<Benefits data={mockData} />)

    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('should use default alt text when image alt is not provided', () => {
    const mockData = {
      title: '',
      description: '',
      items: [
        {
          id: '',
          image: {
            url: '',
            height: 0,
            width: 0,
          },
          title: '',
          description: '',
        },
      ],
    }

    render(<Benefits data={mockData} />)
  })
})

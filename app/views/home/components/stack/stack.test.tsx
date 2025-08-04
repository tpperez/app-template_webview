import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Stack from './stack'

vi.spyOn(console, 'error').mockImplementation(() => {})

describe('Stack', () => {
  it('should render stack structure', () => {
    const mockData = {
      title: '',
      description: '',
      items: [],
    }

    const { container } = render(<Stack data={mockData} />)

    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('should render items with alt text', () => {
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
          list: {
            items: [
              {
                id: '',
                label: '',
              },
            ],
          },
        },
      ],
    }

    render(<Stack data={mockData} />)
  })

  it('should render items without alt text', () => {
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
          list: {
            items: [
              {
                id: '',
                label: '',
              },
            ],
          },
        },
      ],
    }

    render(<Stack data={mockData} />)
  })
})

import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import GetStarted from './get-started'

vi.spyOn(console, 'error').mockImplementation(() => {})

describe('GetStarted', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render get-started structure', () => {
    const mockData = {
      title: '',
      description: '',
      commands: [
        {
          id: '',
          command: '',
        },
      ],
    }

    const { container } = render(<GetStarted data={mockData} />)

    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('should handle empty commands array', () => {
    const mockData = {
      title: '',
      description: '',
      commands: [],
    }

    render(<GetStarted data={mockData} />)

    act(() => {
      vi.advanceTimersByTime(100)
    })
  })

  it('should animate typing effect and display commands', () => {
    const mockData = {
      title: '',
      description: '',
      commands: [
        {
          id: '1',
          command: 'test',
        },
      ],
    }

    render(<GetStarted data={mockData} />)

    act(() => {
      vi.advanceTimersByTime(250)
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })
  })

  it('should handle multiple commands', () => {
    const mockData = {
      title: '',
      description: '',
      commands: [
        {
          id: '1',
          command: 'a',
        },
        {
          id: '2',
          command: 'b',
        },
      ],
    }

    render(<GetStarted data={mockData} />)

    act(() => {
      vi.advanceTimersByTime(100)
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })
  })
})

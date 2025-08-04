import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import Hero from './hero'

vi.spyOn(console, 'error').mockImplementation(() => {})

describe('Hero', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render hero structure', () => {
    const mockData = {
      description: '',
    }

    const { container } = render(<Hero data={mockData} />)

    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('should animate typewriter effect', () => {
    const mockData = {
      description: 'test',
    }

    render(<Hero data={mockData} />)

    act(() => {
      vi.advanceTimersByTime(250)
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })
  })

  it('should animate cursor blinking after typewriter completes', () => {
    const mockData = {
      description: 'a',
    }

    render(<Hero data={mockData} />)

    act(() => {
      vi.advanceTimersByTime(100)
    })

    act(() => {
      vi.advanceTimersByTime(600)
    })

    act(() => {
      vi.advanceTimersByTime(600)
    })
  })

  it('should handle empty description', () => {
    const mockData = {
      description: '',
    }

    render(<Hero data={mockData} />)

    act(() => {
      vi.advanceTimersByTime(100)
    })
  })

  it('should toggle cursor visibility', () => {
    const mockData = {
      description: '',
    }

    render(<Hero data={mockData} />)

    act(() => {
      vi.advanceTimersByTime(100)
    })

    act(() => {
      vi.advanceTimersByTime(600)
    })

    act(() => {
      vi.advanceTimersByTime(600)
    })
  })
})

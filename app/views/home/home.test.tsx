import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ViewHome from './home'
import type { IHomeViewData } from './home.type'

vi.mock('./components/benefits', () => {
  return {
    default: () => {
      return <div data-testid='benefits' />
    },
  }
})

vi.mock('./components/get-started', () => {
  return {
    default: () => {
      return <div data-testid='get-started' />
    },
  }
})

vi.mock('./components/hero', () => {
  return {
    default: () => {
      return <div data-testid='hero' />
    },
  }
})

vi.mock('./components/stack', () => {
  return {
    default: () => {
      return <div data-testid='stack' />
    },
  }
})

vi.mock('./components/stats', () => {
  return {
    default: () => {
      return <div data-testid='stats' />
    },
  }
})

const mockData: IHomeViewData = {
  data: {
    hero: {
      description: '',
    },
    stats: {
      items: [],
    },
    stack: {
      title: '',
      description: '',
      items: [],
    },
    benefits: {
      title: '',
      description: '',
      items: [],
    },
    getStarted: {
      title: '',
      description: '',
      commands: [],
    },
  },
}

describe('ViewHome', () => {
  it('should render all components', () => {
    render(<ViewHome {...mockData} />)

    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('stats')).toBeInTheDocument()
    expect(screen.getByTestId('stack')).toBeInTheDocument()
    expect(screen.getByTestId('benefits')).toBeInTheDocument()
    expect(screen.getByTestId('get-started')).toBeInTheDocument()
  })
})

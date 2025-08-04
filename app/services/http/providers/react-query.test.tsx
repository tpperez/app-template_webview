import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { HttpProvider } from './react-query'

vi.mock('../core', () => {
  return {
    HTTP_CONFIG: {
      DEFAULT_STALE_TIME: 5 * 60 * 1000,
      DEFAULT_RETRY_COUNT: 1,
    },
  }
})

vi.mock('@tanstack/react-query', () => {
  const mockQueryClient = vi.fn().mockImplementation((config) => {
    return {
      ...config,
      defaultOptions: config.defaultOptions,
    }
  })

  const mockQueryClientProvider = vi.fn().mockImplementation(({ children }) => {
    return children
  })

  return {
    QueryClient: mockQueryClient,
    QueryClientProvider: mockQueryClientProvider,
  }
})

describe('HttpProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children without errors', () => {
    render(
      <HttpProvider>
        <div data-testid='test-child'></div>
      </HttpProvider>,
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
  })

  it('should handle multiple children', () => {
    render(
      <HttpProvider>
        <div data-testid='child-1'></div>
        <div data-testid='child-2'></div>
        <span data-testid='child-3'></span>
      </HttpProvider>,
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })

  it('should handle empty children', () => {
    const { container } = render(<HttpProvider>{null}</HttpProvider>)
    expect(container).toBeInTheDocument()
  })

  it('should handle null children', () => {
    const { container } = render(<HttpProvider>{null}</HttpProvider>)
    expect(container).toBeInTheDocument()
  })

  it('should handle undefined children', () => {
    const { container } = render(<HttpProvider>{undefined}</HttpProvider>)
    expect(container).toBeInTheDocument()
  })

  it('should accept showDevtools prop', () => {
    render(
      <HttpProvider showDevtools={true}>
        <div data-testid='devtools-child'></div>
      </HttpProvider>,
    )

    expect(screen.getByTestId('devtools-child')).toBeInTheDocument()
  })

  it('should work with complex nested components', () => {
    const NestedComponent = () => {
      return (
        <div>
          <h1 data-testid='heading'>h1</h1>
          <p data-testid='paragraph'></p>
          <button data-testid='button'></button>
        </div>
      )
    }

    render(
      <HttpProvider>
        <NestedComponent />
      </HttpProvider>,
    )

    expect(screen.getByTestId('heading')).toBeInTheDocument()
    expect(screen.getByTestId('paragraph')).toBeInTheDocument()
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })
})

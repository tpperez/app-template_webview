import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import HeaderContainer from './header.container'

vi.mock('./queries', () => {
  return {
    default: vi.fn(),
  }
})

import getHeaderData from './queries'

describe('HeaderContainer', () => {
  it('should render Header when data loads successfully', async () => {
    vi.mocked(getHeaderData).mockResolvedValue({
      success: true,
      data: {
        header: {
          links: [],
        },
      },
    })

    const { container } = render(await HeaderContainer())

    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('should return null when data loading fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    vi.mocked(getHeaderData).mockResolvedValue({
      success: false,
      data: undefined,
      error: '',
    })

    const result = await HeaderContainer()

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching header data:',
      '',
    )

    consoleErrorSpy.mockRestore()
  })

  it('should return null when success is true but data is undefined', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    vi.mocked(getHeaderData).mockResolvedValue({
      success: true,
      data: undefined,
      error: '',
    })

    const result = await HeaderContainer()

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching header data:',
      '',
    )

    consoleErrorSpy.mockRestore()
  })

  it('should return null when success is true but data is null', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    vi.mocked(getHeaderData).mockResolvedValue({
      success: true,
      data: undefined,
      error: '',
    })

    const result = await HeaderContainer()

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching header data:',
      '',
    )

    consoleErrorSpy.mockRestore()
  })
})

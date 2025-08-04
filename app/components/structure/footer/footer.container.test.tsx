import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import FooterContainer from './footer.container'

vi.mock('./queries', () => {
  return {
    default: vi.fn(),
  }
})

import getFooterData from './queries'

describe('FooterContainer', () => {
  it('should render Footer when data loads successfully', async () => {
    vi.mocked(getFooterData).mockResolvedValue({
      success: true,
      data: {
        footer: {
          text: '',
          copyrightText: '',
          sectionLink: [],
        },
      },
    })

    const { container } = render(await FooterContainer())

    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('should return null when data loading fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    vi.mocked(getFooterData).mockResolvedValue({
      success: false,
      data: undefined,
      error: '',
    })

    const result = await FooterContainer()

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'error loading footer data:',
      '',
    )

    consoleErrorSpy.mockRestore()
  })

  it('should return null when success is true but data is undefined', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    vi.mocked(getFooterData).mockResolvedValue({
      success: true,
      data: undefined,
      error: '',
    })

    const result = await FooterContainer()

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'error loading footer data:',
      '',
    )

    consoleErrorSpy.mockRestore()
  })

  it('should return null when success is true but data is null', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    vi.mocked(getFooterData).mockResolvedValue({
      success: true,
      data: undefined,
      error: '',
    })

    const result = await FooterContainer()

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'error loading footer data:',
      '',
    )

    consoleErrorSpy.mockRestore()
  })
})

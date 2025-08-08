import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import ButtonCloseWebview from './button-close-webview'

vi.mock('@/app/utils/native/bridge', () => {
  return {
    webviewManagement: {
      closeWebView: vi.fn(),
    },
  }
})

describe('ButtonCloseWebview', () => {
  it('should render button with x text', () => {
    render(<ButtonCloseWebview />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Close webview')
  })

  it('should call webview close', async () => {
    const { webviewManagement } = await import('@/app/utils/native/bridge')

    render(<ButtonCloseWebview />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(webviewManagement.closeWebView).toHaveBeenCalledOnce()
  })
})

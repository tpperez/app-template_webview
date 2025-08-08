'use client'

import { webviewManagement } from '@/app/utils/native/bridge'

const handleCloseWebView = () => {
  return webviewManagement.closeWebView()
}

const ButtonCloseWebview = () => {
  return (
    <div className='fixed bottom-14 right-4 z-50'>
      <button
        type='button'
        className='w-full rounded bg-red-500 px-3 py-2 text-xs text-white hover:bg-red-800'
        onClick={() => {
          handleCloseWebView()
        }}
      >
        Close webview
      </button>
    </div>
  )
}

export default ButtonCloseWebview

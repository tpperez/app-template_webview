import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FetchRestAdapter } from './fetch-rest'

vi.mock('../../core/core.utils', () => {
  return {
    processResponse: vi.fn((response) => {
      return response.json()
    }),
    createHeaders: vi.fn((headers) => {
      return {
        'Content-Type': 'application/json',
        ...headers,
      }
    }),
    createTimeoutSignal: vi.fn(() => {
      return undefined
    }),
  }
})

describe('FetchRestAdapter', () => {
  let adapter: FetchRestAdapter
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    adapter = new FetchRestAdapter()
    mockFetch = vi.fn()
    global.fetch = mockFetch
  })

  describe('request', () => {
    it('should make fetch request with correct parameters', async () => {
      const mockResponse = { data: '' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)

      const body = { name: '', email: '' }

      await adapter.request('/api/users', {
        method: 'POST',
        body,
        headers: { Authorization: '' },
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '',
        },
        body: JSON.stringify(body),
        signal: undefined,
      })
    })

    it('should not include body for GET requests', async () => {
      const mockResponse = { data: '' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        body: { should: '' },
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: undefined,
      })

      const callArgs = mockFetch.mock.calls[0]
      const requestConfig = callArgs[1]
      expect(requestConfig).not.toHaveProperty('body')
    })

    it('should not include body for DELETE requests', async () => {
      const mockResponse = { success: true }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)

      await adapter.request('/api/users/123', {
        method: 'DELETE',
        body: { should: '' },
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users/123', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        signal: undefined,
      })

      const callArgs = mockFetch.mock.calls[0]
      const requestConfig = callArgs[1]
      expect(requestConfig).not.toHaveProperty('body')
    })

    it('should include next options when tags or revalidate are provided', async () => {
      const mockResponse = { data: '' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        tags: [''],
        revalidate: 300,
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: undefined,
        next: {
          tags: [''],
          revalidate: 300,
        },
      })
    })

    it('should process response', async () => {
      const mockResponse = { data: '' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)

      const result = await adapter.request('/api/users', {
        method: 'GET',
      })

      expect(result).toBeDefined()
    })

    it('should handle fetch errors', async () => {
      const error = new Error('')
      mockFetch.mockRejectedValue(error)

      await expect(
        adapter.request('/api/users', { method: 'GET' }),
      ).rejects.toThrow('')
    })

    it('should use external signal when provided', async () => {
      const controller = new AbortController()
      const mockResponse = { data: '' }
      const mockJsonResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      }
      mockFetch.mockResolvedValue(mockJsonResponse)

      await adapter.request('/api/users', {
        method: 'GET',
        signal: controller.signal,
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      })
    })
  })

  describe('combineSignals method', () => {
    interface AdapterWithPrivateMethods {
      combineSignals: (
        ...signals: (AbortSignal | undefined)[]
      ) => AbortSignal | undefined
    }

    it('should return undefined when no signals provided', () => {
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals()
      expect(result).toBeUndefined()
    })

    it('should return undefined when only undefined signals provided', () => {
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(undefined, undefined)
      expect(result).toBeUndefined()
    })

    it('should return single signal when only one provided', () => {
      const controller = new AbortController()
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(controller.signal)
      expect(result).toBe(controller.signal)
    })

    it('should combine multiple signals and create new one', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(controller1.signal, controller2.signal)

      expect(result).toBeInstanceOf(AbortSignal)
      expect(result).not.toBe(controller1.signal)
      expect(result).not.toBe(controller2.signal)
    })

    it('should immediately abort when input signal is already aborted', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      controller1.abort()

      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(controller1.signal, controller2.signal)

      expect(result?.aborted).toBe(true)
    })

    it('should abort combined signal when input signal gets aborted later', async () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()

      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(controller1.signal, controller2.signal)

      expect(result?.aborted).toBe(false)

      controller1.abort()

      await new Promise((resolve) => {
        return setTimeout(resolve, 10)
      })

      expect(result?.aborted).toBe(true)
    })

    it('should handle mixed undefined and valid signals', () => {
      const controller = new AbortController()
      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(undefined, controller.signal, undefined)

      expect(result).toBe(controller.signal)
    })

    it('should break loop when first signal is already aborted', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      const controller3 = new AbortController()

      controller1.abort()

      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(
        controller1.signal,
        controller2.signal,
        controller3.signal,
      )

      expect(result?.aborted).toBe(true)
    })

    it('should add event listeners to all non-aborted signals', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()
      const controller3 = new AbortController()

      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(
        controller1.signal,
        controller2.signal,
        controller3.signal,
      )

      expect(result?.aborted).toBe(false)

      controller2.abort()

      setTimeout(() => {
        expect(result?.aborted).toBe(true)
      }, 0)
    })

    it('should return controller signal for multiple valid signals', () => {
      const controller1 = new AbortController()
      const controller2 = new AbortController()

      const result = (
        adapter as unknown as AdapterWithPrivateMethods
      ).combineSignals(controller1.signal, controller2.signal)

      expect(result).toBeInstanceOf(AbortSignal)
      expect(result).not.toBe(controller1.signal)
      expect(result).not.toBe(controller2.signal)
    })
  })
})

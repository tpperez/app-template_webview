import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildUrl,
  createHeaders,
  createTimeoutSignal,
  processResponse,
  resolveBaseUrl,
} from './core.utils'

describe('Core Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('resolveBaseUrl', () => {
    it('should return provided baseUrl when given', () => {
      expect(resolveBaseUrl('http://test')).toBe('http://test')
    })

    it('should return default baseUrl when not provided', () => {
      expect(resolveBaseUrl()).toBe('http://localhost:3001/api')
    })

    it('should return default baseUrl when empty string provided', () => {
      expect(resolveBaseUrl('')).toBe('http://localhost:3001/api')
    })
  })

  describe('createHeaders', () => {
    it('should create default headers without custom headers', () => {
      const headers = createHeaders()
      expect(headers).toEqual({
        'Content-Type': 'application/json',
      })
    })

    it('should merge custom headers with default headers', () => {
      const customHeaders = { Authorization: '' }
      const headers = createHeaders(customHeaders)
      expect(headers).toEqual({
        'Content-Type': 'application/json',
        Authorization: '',
      })
    })
  })

  describe('createTimeoutSignal', () => {
    it('should create AbortController with timeout', () => {
      const signal = createTimeoutSignal(1000)
      expect(signal).toBeDefined()
    })

    it('should return undefined for invalid timeout', () => {
      expect(createTimeoutSignal()).toBeUndefined()
      expect(createTimeoutSignal(0)).toBeUndefined()
    })

    it('should abort signal after timeout', async () => {
      const signal = createTimeoutSignal(50)
      expect(signal?.aborted).toBe(false)

      await new Promise((resolve) => {
        return setTimeout(resolve, 100)
      })

      expect(signal?.aborted).toBe(true)
    })
  })

  describe('processResponse', () => {
    it('should process successful response', async () => {
      const mockData = { data: '' }
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      } as unknown as Response

      const result = await processResponse(mockResponse)
      expect(result).toEqual(mockData)
    })

    it('should handle json parse error in successful response', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('')),
      } as unknown as Response

      const result = await processResponse(mockResponse)
      expect(result).toEqual({})
    })

    it('should use default message when statusText is empty', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: '',
        json: vi.fn().mockResolvedValue({}),
      } as unknown as Response

      await expect(processResponse(mockResponse)).rejects.toMatchObject({
        message: 'Request failed',
        status: 500,
      })
    })

    it('should use statusText when available', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Error',
        json: vi.fn().mockResolvedValue({}),
      } as unknown as Response

      await expect(processResponse(mockResponse)).rejects.toMatchObject({
        message: 'Error',
        status: 404,
      })
    })

    it('should handle error response with custom message', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: '',
        json: vi.fn().mockResolvedValue({ message: 'message' }),
      } as unknown as Response

      await expect(processResponse(mockResponse)).rejects.toMatchObject({
        message: 'message',
        status: 400,
      })
    })

    it('should handle error response with code', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: '',
        json: vi.fn().mockResolvedValue({ code: 'code' }),
      } as unknown as Response

      await expect(processResponse(mockResponse)).rejects.toMatchObject({
        code: 'code',
        status: 400,
      })
    })

    it('should handle json parse error in error response', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: '',
        json: vi.fn().mockRejectedValue(new Error('')),
      } as unknown as Response

      await expect(processResponse(mockResponse)).rejects.toMatchObject({
        message: 'Request failed',
        status: 500,
      })
    })
  })

  describe('buildUrl', () => {
    it('should build URL correctly', () => {
      expect(buildUrl('http://test', 'users')).toBe('http://test/users')
    })

    it('should handle baseUrl with trailing slash', () => {
      expect(buildUrl('http://test/', 'users')).toBe('http://test/users')
    })

    it('should handle path with leading slash', () => {
      expect(buildUrl('http://test', '/users')).toBe('http://test/users')
    })
  })
})

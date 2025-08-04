import { beforeEach, describe, expect, it, vi } from 'vitest'

import { restClient } from './rest'

vi.mock('../core', () => {
  return {
    resolveBaseUrl: vi.fn((baseUrl?: string) => {
      return baseUrl || 'http://localhost:3001/api'
    }),
    buildUrl: vi.fn((baseUrl: string, path: string) => {
      return `${baseUrl}/${path}`
    }),
    HTTP_ADAPTER_CONFIG: {
      restAdapter: vi.fn(() => {
        return {
          request: vi.fn(),
        }
      }),
    },
  }
})

describe('RestClient', () => {
  let mockAdapter: { request: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
    mockAdapter = (
      restClient as unknown as {
        adapter: { request: ReturnType<typeof vi.fn> }
      }
    ).adapter
  })

  describe('request method', () => {
    it('should call adapter request with correct parameters', async () => {
      const mockResponse = { data: '' }
      mockAdapter.request.mockResolvedValue(mockResponse)

      const result = await restClient.request('users', {
        method: 'POST',
        body: { name: '' },
        headers: { 'X-Test': '' },
        baseUrl: '',
        timeout: 5000,
        tags: [''],
        revalidate: 300,
      })

      expect(mockAdapter.request).toHaveBeenCalledWith(
        'http://localhost:3001/api/users',
        {
          method: 'POST',
          body: { name: '' },
          headers: { 'X-Test': '' },
          baseUrl: '',
          timeout: 5000,
          tags: [''],
          revalidate: 300,
        },
      )
      expect(result).toBe(mockResponse)
    })

    it('should use default parameters when not provided', async () => {
      const mockResponse = { data: '' }
      mockAdapter.request.mockResolvedValue(mockResponse)

      await restClient.request('users')

      expect(mockAdapter.request).toHaveBeenCalledWith(
        'http://localhost:3001/api/users',
        {
          method: 'GET',
          body: undefined,
          headers: undefined,
          baseUrl: undefined,
          timeout: undefined,
          tags: [],
          revalidate: undefined,
        },
      )
    })

    it('should handle adapter errors', async () => {
      const error = new Error('')
      mockAdapter.request.mockRejectedValue(error)

      await expect(restClient.request('users')).rejects.toThrow('')
    })
  })

  describe('HTTP method shortcuts', () => {
    beforeEach(() => {
      mockAdapter.request.mockResolvedValue({ data: '' })
    })

    describe('get', () => {
      it('should make GET request with correct parameters', async () => {
        await restClient.get('users', {
          headers: { 'X-Test': '' },
          baseUrl: '',
        })

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/users',
          {
            method: 'GET',
            body: undefined,
            headers: { 'X-Test': '' },
            baseUrl: '',
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })
    })

    describe('post', () => {
      it('should make POST request with body', async () => {
        const body = { name: '', email: '' }

        await restClient.post('users', body, {
          headers: { 'X-Test': '' },
        })

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/users',
          {
            method: 'POST',
            body,
            headers: { 'X-Test': '' },
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })

      it('should make POST request without body', async () => {
        await restClient.post('users')

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/users',
          {
            method: 'POST',
            body: undefined,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })
    })

    describe('put', () => {
      it('should make PUT request with body', async () => {
        const body = { name: '', email: '' }

        await restClient.put('users/123', body)

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/users/123',
          {
            method: 'PUT',
            body,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })
    })

    describe('patch', () => {
      it('should make PATCH request with body', async () => {
        const body = { name: '' }

        await restClient.patch('users/123', body)

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/users/123',
          {
            method: 'PATCH',
            body,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })
    })

    describe('delete', () => {
      it('should make DELETE request', async () => {
        await restClient.delete('users/123')

        expect(mockAdapter.request).toHaveBeenCalledWith(
          'http://localhost:3001/api/users/123',
          {
            method: 'DELETE',
            body: undefined,
            headers: undefined,
            baseUrl: undefined,
            timeout: undefined,
            tags: [],
            revalidate: undefined,
          },
        )
      })
    })
  })

  describe('TypeScript generics', () => {
    it('should properly type response data', async () => {
      interface User {
        id: number
        name: string
        email: string
      }

      const mockUser: User = {
        id: 1,
        name: '',
        email: '',
      }
      mockAdapter.request.mockResolvedValue(mockUser)

      const result = await restClient.get<User>('users/1')
      expect(result).toEqual(mockUser)
    })

    it('should properly type request body', async () => {
      interface CreateUserRequest {
        name: string
        email: string
      }

      interface User {
        id: number
        name: string
        email: string
      }

      const requestBody: CreateUserRequest = {
        name: '',
        email: '',
      }

      const mockUser: User = {
        id: 2,
        name: '',
        email: '',
      }
      mockAdapter.request.mockResolvedValue(mockUser)

      const result = await restClient.post<User, CreateUserRequest>(
        'users',
        requestBody,
      )
      expect(result).toEqual(mockUser)
    })
  })
})

import { describe, expect, it, vi } from 'vitest'

import getHeaderData from './get-header-data.query'

vi.mock('@/app/services/http', () => {
  return {
    graphqlClient: {
      query: vi.fn(),
    },
  }
})

vi.spyOn(console, 'error').mockImplementation(() => {})

import { graphqlClient } from '@/app/services/http'

describe('getHeaderData', () => {
  it('should return success when query succeeds', async () => {
    const mockResponse = {
      data: {
        header: {
          links: [],
        },
      },
    }

    vi.mocked(graphqlClient.query).mockResolvedValue(mockResponse)

    const result = await getHeaderData()

    expect(result).toEqual({
      success: true,
      data: mockResponse.data,
    })
  })

  it('should return error when query fails with Error instance', async () => {
    vi.mocked(graphqlClient.query).mockRejectedValue(new Error(''))

    const result = await getHeaderData()

    expect(result.success).toBe(false)
  })

  it('should return error when query fails with non-Error', async () => {
    vi.mocked(graphqlClient.query).mockRejectedValue('')

    const result = await getHeaderData()

    expect(result.success).toBe(false)
  })
})

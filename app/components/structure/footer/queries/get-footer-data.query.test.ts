import { describe, expect, it, vi } from 'vitest'

import getFooterData from './get-footer-data.query'

vi.mock('@/app/services/http/graphql', () => {
  return {
    graphqlClient: {
      query: vi.fn(),
    },
  }
})

vi.spyOn(console, 'error').mockImplementation(() => {})

import { graphqlClient } from '@/app/services/http/graphql'

describe('getFooterData', () => {
  it('should return success when query succeeds', async () => {
    const mockResponse = {
      data: {
        footer: {
          text: '',
          copyrightText: '',
          sectionLink: [],
        },
      },
    }

    vi.mocked(graphqlClient.query).mockResolvedValue(mockResponse)

    const result = await getFooterData()

    expect(result).toEqual({
      success: true,
      data: mockResponse.data,
    })
  })

  it('should return error when query fails with Error instance', async () => {
    vi.mocked(graphqlClient.query).mockRejectedValue(new Error(''))

    const result = await getFooterData()

    expect(result.success).toBe(false)
  })

  it('should return error when query fails with non-Error', async () => {
    vi.mocked(graphqlClient.query).mockRejectedValue('')

    const result = await getFooterData()

    expect(result.success).toBe(false)
  })
})

import { describe, expect, it, vi } from 'vitest'

import isDev from './is-dev'

describe('utils/is-dev', () => {
  it('should return true when NODE_ENV is development', () => {
    vi.stubEnv('NODE_ENV', 'development')

    expect(isDev()).toBe(true)
  })

  it('should return false when NODE_ENV is production', () => {
    vi.stubEnv('NODE_ENV', 'production')

    expect(isDev()).toBe(false)
  })

  it('should return false when NODE_ENV is undefined', () => {
    vi.stubEnv('NODE_ENV', undefined)

    expect(isDev()).toBe(false)
  })
})

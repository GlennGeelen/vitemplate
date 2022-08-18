import { onFullfilled } from '@/services/index'

describe('axiosBase', () => {
  afterEach(() => {
    localStorage.removeItem('token')
    vi.clearAllMocks()
  })

  it('onFullfilled with token', () => {
    localStorage.setItem('token', 'validToken')
    let config = { headers: {} }
    config = onFullfilled(config)

    expect(config.headers.Authorization).toBe('Bearer validToken')
  })

  it('onFullfilled without token', () => {
    let config = { headers: {} }
    config = onFullfilled(config)

    expect(config.headers.Authorization).toBe('Bearer ')
  })
})
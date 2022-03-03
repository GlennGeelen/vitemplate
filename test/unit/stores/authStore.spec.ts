import { setActivePinia, createPinia } from 'pinia'
import { useAuth } from '@/stores/auth'
import axiosBase from '@/services/index'
import { AxiosError } from 'axios'

describe('Auth Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  afterEach(() => {
    localStorage.removeItem('token')
    vi.clearAllMocks()
  })

  it('login success', async () => {
    vi.spyOn(axiosBase, 'post').mockResolvedValueOnce(Promise.resolve({ data: { token: 'token'} }))
    const auth = useAuth()
    expect(auth.token).toBe('')
    expect(auth.isAuthenticated).toBe(false)

    await auth.login({email: 'example@mail.com', password: 'password'})
    expect(auth.token).toBe('token')
    expect(auth.isAuthenticated).toBe(true)
  })

  it('login fail', async () => {
    vi.spyOn(axiosBase, 'post').mockImplementationOnce(() => Promise.reject({response: {message: 'error'}}))
    const auth = useAuth()
    expect(auth.token).toBe('')
    expect(auth.isAuthenticated).toBe(false)

    // Try/catch is necessary because of the rejected promise
    try {
      await auth.login({email: 'example@mail.com', password: 'password'})
    } catch {
      expect(auth.token).toBe('')
      expect(auth.isAuthenticated).toBe(false)
    }
  })

  it('logout', async () => {
    localStorage.setItem('token', 'token')
    const auth = useAuth()
    expect(auth.token).toBe('token')
    expect(auth.isAuthenticated).toBe(true)

    await auth.logout()
    expect(auth.token).toBe('')
    expect(auth.isAuthenticated).toBe(false)
  })
})
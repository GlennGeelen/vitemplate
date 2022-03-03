import { shallowMount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'
import router from '@/router/index'
import CredsLogin from '@/components/auth/CredsLogin.vue'
import nl from '@/locales/nl.json'
import { useAuth } from '@/stores/auth'

let wrapper;

describe('CredsLogin', () => {
  beforeEach(async () => {
    const i18n = createI18n({
      locale: 'nl',
      messages: {
        nl
      }
    })
  
    wrapper = shallowMount(CredsLogin, {
      global: {
        plugins: [createTestingPinia({createSpy: vi.fn()}), i18n, router]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  });
  
  test('should give an error when trying to login without any creds', async () => {
    const form = wrapper.find('[data-test="loginForm"]')
    await form.trigger('submit')

    expect(wrapper.find('[data-test="errorMessages"]').text()).toBe('E-mailadres en/of wachtwoord is niet ingevuld.')
  })

  test('should give an error when trying to login with wrong creds', async () => {
    const store = useAuth()
    vi.spyOn(store, 'login').mockImplementationOnce(() => Promise.reject('Something went wrong'))

    const form = wrapper.find('[data-test="loginForm"]')
    await wrapper.find('[data-test="emailInput"]').setValue('email')
    await wrapper.find('[data-test="passwordInput"]').setValue('password')
    await form.trigger('submit')

    await flushPromises()
    expect(wrapper.find('[data-test="errorMessages"]').text()).toBe('Something went wrong')
  })

  test('should redirect to home after successfull login', async () => {
    const store = useAuth()
    vi.spyOn(store, 'login').mockImplementationOnce(() => Promise.resolve())
    vi.spyOn(router, 'push').mockResolvedValue()

    const form = wrapper.find('[data-test="loginForm"]')
    await wrapper.find('[data-test="emailInput"]').setValue('email@mail.com')
    await wrapper.find('[data-test="passwordInput"]').setValue('password')
    await form.trigger('submit')

    await flushPromises()
    
    expect(router.push).toHaveBeenCalledTimes(1)
    expect(router.push).toHaveBeenCalledWith('/')
  })
})

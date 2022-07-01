import CredsLogin from '@/components/auth/CredsLogin.vue'

describe('CredsLogin.cy.ts', () => {
  it('renders the component', () => {
    cy.mount(CredsLogin)

    cy.contains('button', 'Inloggen').should('be.visible')
  })

  it('logs the user in', () => {
    cy.mount(CredsLogin)
    cy.intercept('POST', 'https://reqres.in/api/login', {
      token: 'token'
    })

    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password')
    cy.contains('button', 'Inloggen').click()

    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('fails to login the user without email', () => {
    cy.mount(CredsLogin)

    cy.get('input[name="password"]').type('password')
    cy.contains('button', 'Inloggen').click()
    cy.contains('[data-test="errorMessages"]', 'E-mailadres en/of wachtwoord is niet ingevuld.')

    cy.url().should('eq', 'http://localhost:3000/login')
  })

  it('fails to login the user with wrong creds', () => {
    cy.mount(CredsLogin)
    cy.intercept('POST', 'https://reqres.in/api/login', {
      statusCode: 401,
      body: {
        errorMessage: 'Unauthorized'
      }
    })

    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password')
    cy.contains('button', 'Inloggen').click()

    cy.contains('[data-test="errorMessages"]', 'E-mailadres en/of wachtwoord is niet correct')
    cy.url().should('eq', 'http://localhost:3000/login')
  })
})
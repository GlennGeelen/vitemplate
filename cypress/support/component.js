// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import nl from '@/locales/nl.json'
import router from '@/router/index'

import '../../src/assets/styling/index.css';

Cypress.Commands.add('mount', (component, ...args) => {
  args.global = args.global || {}
  args.global.plugins = args.global.plugins || []
  args.global.plugins.push(router)
  args.global.plugins.push(createPinia())
  args.global.plugins.push(createI18n({
    locale: 'nl',
    messages: {
      nl
    }
  }))
  args.global.stubs = args.global.stubs || []
  args.global.stubs.push("router-link")
  args.global.stubs.push("router-view")

  console.log(args)
  
  return mount(component, {...args})
})

// Example use:
// cy.mount(MyComponent)
# Vue 3 Project setup

Dit is een tempalte voor een basis opzet van een Vue 3 project. Dit template in opgebouwd met de volgende technieken/packages:
- Vite (https://vitejs.dev/)
- Typescript
- Composition API
- Tailwind (https://tailwindcss.com/docs/installation)
- Vue router
- axios
- i18n
- Pinia (State management) (https://pinia.vuejs.org/)
- .env
- FormKit (met het genesis theme) (https://formkit.com/essentials/what-is-formkit)
- vitest + @vue/test-utils (testing)

Daarnaast is er een opzet gemaakt voor:
- Authenticated/unauthenticated routes
- Login Component
- basis Auth store
- het testen van het Login component en de store

## Waarvoor kan ik dit template gebruiken
Als je een Vue.js project wil opzetten voor je eigen/bestaande RESTful api en je wil geen tijd spenderen aan het connecten van bovenstaande packages, dan is dit het template dat je zoekt.

## Hoe kan ik dit template gebruiken
Om dit template te gebruiken kun je het clonen of forken. Daarna zal de `git remote origin` aangepast moeten worden en naar je eigen repository gezet moeten worden. 

```bash
> git clone [deze repo]
> cd vitemplate
> git remote set-url origin [url]

```
Je kan er ook voor kiezen om de inhoud van deze repository over te zetten naar je eigen project.

### Installatie, develop, test
Dit template maakt gebruik van NPM package manager. Om de packages te installeren moet je het volgende command uitvoeren `npm i`.
Daarna kan je de dev server starten met:
```bash
> npm run dev
```
De tests eenmalig draaien met een coverage rapport:
```bash
> npm run coverage
```
De tests in watch mode draaien:
```bash
> npm run test
```

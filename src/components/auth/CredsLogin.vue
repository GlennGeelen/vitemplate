<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')

const authStore = useAuth()
const { t } = useI18n()
const router = useRouter()

const login = () => {
  if (email.value === '' || password.value === '') {
    error.value = t('credsLogin.emailOrPasswordIsEmpty')
    return
  }
  const creds = {email: email.value, password: password.value}
  authStore.login(creds).then(() => {
    router.push('/')
  }).catch(() => {
    error.value = t('credsLogin.failedLogin')
  })
}
</script>

<template>
  <div class="max-w-lg mx-auto border rounded shadow-sm p-6">
    <div
      v-if="error"
      data-test="errorMessages"
      class="border border-red-600 my-5 p-2 rounded bg-red-300 text-red-600"
    >
      {{ error }}
    </div>
    <form
      data-test="loginForm"
      @submit.prevent="login()"
    >
      <input
        v-model="email"
        type="text"
        name="email"
        data-test="emailInput"
        :placeholder="t('credsLogin.emailPlaceholder')"
      >
      <input
        v-model="password"
        type="password"
        name="password"
        data-test="passwordInput"
        :placeholder="t('credsLogin.passwordPlaceholder')"
      >
      <button type="submit">
        {{ t('btnText.login') }}
      </button>
    </form>
  </div>
</template>
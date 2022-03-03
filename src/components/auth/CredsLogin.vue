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
  }).catch((err: string) => {
    error.value = err
  })
}
</script>

<template>
  <div class="max-w-lg mx-auto border rounded shadow-sm p-6">
    <div v-if="error" data-test="errorMessages" class="border border-red-600 my-5 p-2 rounded bg-red-300 text-red-600">
      {{error}}
    </div>
    <form @submit.prevent="login()" data-test="loginForm">
      <input type="text" data-test="emailInput" v-model="email" :placeholder="t('credsLogin.emailPlaceholder')" />
      <input type="password" data-test="passwordInput" v-model="password" :placeholder="t('credsLogin.passwordPlaceholder')" />
      <button type="submit">{{t('btnText.login')}}</button>
    </form>
  </div>
</template>
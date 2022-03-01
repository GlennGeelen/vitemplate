<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/stores/auth'

const authStore = useAuth()
const { t } = useI18n()
const router = useRouter()

const logout = () => {
  authStore.logout().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <h1 class="text-2xl font-bold">Home</h1>

  <p v-if="authStore.token">
    {{t('loggedIn')}}

    <button @click="logout()">Uitloggen</button>
  </p>
</template>
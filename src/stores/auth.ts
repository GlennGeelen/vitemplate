import { defineStore } from 'pinia'
import SessionRepository from '@/repositories/session'
import { Credentials } from '@/types/Credentials'

export const useAuth = defineStore('auth-store', {
  state: () => {
    return {
      tokenHash: localStorage.getItem('token') || '',
    }
  },
  getters: {
    token(state) {
      return state.tokenHash
    },
    isAuthenticated(state) {
      return !!state.tokenHash
    }
  },
  actions: {
    async login(credentials: Credentials): Promise<void> {
      try {
        const token = await SessionRepository.create(credentials)
        localStorage.setItem('token', token)
        this.tokenHash = token
      } catch (error: any) {
        localStorage.removeItem('token')
        throw error
      }
    },
    logout(): Promise<void> {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        this.tokenHash = ''
        resolve()
      })
    }
  }
})
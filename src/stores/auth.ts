import { defineStore } from 'pinia'
import { AxiosResponse, AxiosError } from 'axios'
import { Credentials } from '@/types/Credentials'
import axiosBase from '@/services/index'

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
    login(credentials: Credentials): Promise<void> {
      return new Promise((resolve, reject) => {
        axiosBase.post('/login', credentials).then((response: AxiosResponse) => {
          const token = response.data.token
          localStorage.setItem('token', token)
          this.tokenHash = token
          resolve()
        }).catch(() => {
          localStorage.removeItem('token')
          reject()
        })
      })
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
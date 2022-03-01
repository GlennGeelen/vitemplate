import { create, AxiosRequestConfig } from 'axios'

const axiosBase = create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

axiosBase.interceptors.request.use((config: AxiosRequestConfig) => {
  const token: string = localStorage.getItem('token') || ''
  if (config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default axiosBase
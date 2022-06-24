import { create, AxiosRequestConfig, AxiosInstance } from 'axios'

const axiosBase: AxiosInstance = create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const onFullfilled = (config: AxiosRequestConfig) => {
  const token: string = localStorage.getItem('token') || ''
  if (config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
}

axiosBase.interceptors.request.use(onFullfilled)

export default axiosBase
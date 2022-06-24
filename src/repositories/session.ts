import axiosBase from '@/services/index'
import { Credentials } from '@/types/Credentials'

export default {
  create: async (credentials: Credentials): Promise<string> => {
    try {
      const response = await axiosBase.post('/login', credentials)
      return response.data.token
    } catch (error: any) {
      throw error
    }
  }
}
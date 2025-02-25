import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { validateZod } from '@api/blogEngine.schema'
import { ZodSchema } from 'zod'
import { getServerEnvVar } from '@utils/getServerEnvVar'

declare module 'axios' {
  interface AxiosRequestConfig {
    zodSchema?: ZodSchema
  }
}

const instance: AxiosInstance = axios.create({
  baseURL: `https://${getServerEnvVar('API_URL')}`,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': getServerEnvVar('API_KEY'),
  },
})

instance.interceptors.request.use(
  (config) => {
    const isProtectedMethod = /(post|put|patch|delete)/i.test(
      config.method ?? ''
    )

    // TODO: Replace after authentication is implemented
    if (isProtectedMethod)
      config.headers.Authorization = `Bearer ${getServerEnvVar('ACCESS_TOKEN')}`

    return config
  },
  (error: unknown) => {
    // Handle request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    validateZod({ data: response.data, schema: response.config.zodSchema })
    return response
  },
  (error: unknown) => {
    // TODO
    // if (error.response && error.response.status === 401/3?) {
    // Handle unauthorized error (e.g., redirect to login)
    // ...
    // }
    return Promise.reject(error)
  }
)

export default instance

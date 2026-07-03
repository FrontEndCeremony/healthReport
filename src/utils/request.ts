import axios, { AxiosError } from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    (config: import('axios').AxiosRequestConfig): Promise<any>
  }
}

const instance = axios.create({
  baseURL: '/api', // 环境变量地址
  timeout: 30000,
})

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('consultationAssistantKey')
    // 自动附加语言参数，让后端返回对应语言的内容
    
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => Promise.resolve(response.data),
  (error) => {
    console.error('请求错误', error)
    return Promise.reject(error)
  }
)

export default instance

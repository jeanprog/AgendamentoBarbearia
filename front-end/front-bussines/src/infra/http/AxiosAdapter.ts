import axios from 'axios'
import HttpClient from './HttpClient'

export default class AxiosAdapter implements HttpClient {
  constructor() {}
  async get(url: string): Promise<any> {
    const response = await axios.get(url)
    return response.data
  }
  async post(url: string, body: any): Promise<any> {
    try {
      const submit = await axios.post(url, body)
      return submit
    } catch (error) {
      console.log('error na requisição', error)
    }
  }
  put(url: string, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  async delete(url: string, params?: any): Promise<any> {
    const remove = await axios.delete(url, params)
    return remove
  }
  // verificar no back-end se a versão está vinculada alguma solicitação.
}

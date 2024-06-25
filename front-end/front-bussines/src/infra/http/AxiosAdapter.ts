import axios from 'axios'
import HttpClient from './HttpClient'

export default class AxiosAdapter implements HttpClient {
  constructor() {}
  async get(url: string): Promise<any> {
    const response = await axios.get(url)
    return response.data
  }
  post(url: string, body: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  put(url: string, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  delete(url: string, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

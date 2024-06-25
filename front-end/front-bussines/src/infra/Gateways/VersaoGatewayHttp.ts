import VersaoGatway from '@/entitys/Versao'
import VersaoGateway from './VersaoGateway'
import HttpClient from '../http/HttpClient'

export default class TodosGatewayHttp implements VersaoGateway {
  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string
  ) {}

  async getTodoVersao(): Promise<VersaoGatway[]> {
    const versoes = await this.httpClient.get(`${this.baseUrl}/versoes`)
    return versoes
  }
}

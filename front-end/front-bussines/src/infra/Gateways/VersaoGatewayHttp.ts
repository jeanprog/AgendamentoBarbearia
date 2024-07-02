import VersaoGatway from '@/entitys/Versao'
import VersaoGateway from './VersaoGateway'
import HttpClient from '../http/HttpClient'
import Versao from '@/entitys/Versao'

export default class TodosGatewayHttp implements VersaoGateway {
  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string
  ) {}

  async addVersao(data: Versao): Promise<Versao> {
    const newVersaoData = await this.httpClient.post(
      `${this.baseUrl}/versoes`,
      data
    )
    return new Versao(
      newVersaoData.aplicativo,
      newVersaoData.versao,
      newVersaoData.datCri
    )
  }

  async getTodoVersao(): Promise<VersaoGatway[]> {
    const versoes = await this.httpClient.get(`${this.baseUrl}/versoes`)
    return versoes
  }
}

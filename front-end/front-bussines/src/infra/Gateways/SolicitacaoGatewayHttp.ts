import Solicitacao from '@/entitys/Solicitacao'
import SolicitacaoGateway from './SolicitacaoGateway'

import HttpClient from '../http/HttpClient'

export default class SolicitacaoGatewayHttp implements SolicitacaoGateway {
  constructor(
    readonly httpClient: HttpClient,
    readonly baseUrl: string
  ) {}

  async getTodoSolicatacao(): Promise<Solicitacao[]> {
    const solicitacoes = await this.httpClient.get(
      `${this.baseUrl}/solicitacao-desenv`
    )
    return solicitacoes
  }
  addSoliticao(): Promise<Solicitacao> {
    throw new Error('Method not implemented.')
  }
  getItemSolicitacao(): Promise<Solicitacao> {
    throw new Error('Method not implemented.')
  }
}

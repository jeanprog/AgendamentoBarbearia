import SolicitacaoGatewayHttp from '@/infra/Gateways/SolicitacaoGatewayHttp'
import Solicitacao from './Solicitacao'

export default class SolicitacoesList {
  solicitacoes: Solicitacao[]
  gateway: SolicitacaoGatewayHttp
  constructor(gateway: SolicitacaoGatewayHttp) {
    this.solicitacoes = []
    this.gateway = gateway
  }

  async getTodoSolicitacoes(): Promise<Solicitacao[]> {
    this.solicitacoes = await this.gateway.getTodoSolicatacao()

    return this.solicitacoes
  }
}

import Solicitacao from '@/entitys/solicitacao'
import SolicitacaoGateway from './SolicitacaoGateway'

export default class SolicitacaoGatewayHttp implements SolicitacaoGateway {
  getTodoSolicatacao(): Promise<Solicitacao[]> {
    throw new Error('Method not implemented.')
  }
  addSoliticao(): Promise<Solicitacao> {
    throw new Error('Method not implemented.')
  }
  getItemSolicitacao(): Promise<Solicitacao> {
    throw new Error('Method not implemented.')
  }
}

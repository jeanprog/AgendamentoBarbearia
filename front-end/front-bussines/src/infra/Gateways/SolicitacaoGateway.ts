import Solicitacao from '@/entitys/solicitacao'

export default interface SolicitacaoGateway {
  getTodoSolicatacao(): Promise<Solicitacao[]>

  addSoliticao(): Promise<Solicitacao>

  getItemSolicitacao(): Promise<Solicitacao>
}

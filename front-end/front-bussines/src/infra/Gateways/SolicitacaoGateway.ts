import Solicitacao from '@/entitys/Solicitacao'

export default interface SolicitacaoGateway {
  getTodoSolicatacao(): Promise<Solicitacao[]>

  addSoliticao(): Promise<Solicitacao>

  getItemSolicitacao(): Promise<Solicitacao>
}

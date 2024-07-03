import Versao from './Versao'

export default class SolicitacoesList {
  solicitacoes: Versao[]
  constructor() {
    this.solicitacoes = []
  }

  getTodoSolicitacoes(): Versao[] {
    return this.solicitacoes
  }
}

import Versao from '../../entitys/Versao.ts'

export default interface VersaoGateway {
  getTodoVersao(): Promise<Versao[]>

  addVersao(data: Versao): Promise<Versao>
  deleteVersao(id: number): Promise<Versao>
}

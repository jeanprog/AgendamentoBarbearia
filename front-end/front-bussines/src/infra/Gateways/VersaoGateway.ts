import Versao from '../../entitys/Versao.ts'

export default interface VersaoGateway {
  getTodoVersao(): Promise<Versao[]>
}

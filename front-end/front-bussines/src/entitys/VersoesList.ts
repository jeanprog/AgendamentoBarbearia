import Versao from '@/entitys/Versao'
import VersaoGatewayHttp from '@/infra/Gateways/VersaoGatewayHttp'

export default class VersoesList {
  versoes: Versao[]
  gateway: VersaoGatewayHttp

  constructor(gateway: VersaoGatewayHttp) {
    this.versoes = []
    this.gateway = gateway
  }

  async getAllVersao(): Promise<Versao[]> {
    this.versoes = await this.gateway.getTodoVersao()
    return this.versoes
  }

  async delVersao(id: number) {
    await this.gateway.deleteVersao(id)
    return 'deletado com sucess'
  }

  async addVersao(versao: Versao) {
    const newVersao = new Versao(
      versao.aplicativo,
      versao.versao,
      versao.datCri,
      versao.id // 'id' é opcional
    )
    await this.gateway.addVersao(versao)
    return console.log(newVersao)
  }
}

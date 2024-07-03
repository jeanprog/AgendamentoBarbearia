import Versao from '@/entitys/Versao'

export default class VersoesList {
  versoes: Versao[]

  constructor() {
    this.versoes = []
  }

  public getAllVersao(): Versao[] {
    return this.versoes
  }

  public addVersao(versao: Versao) {
    const newVersao = new Versao(
      versao.aplicativo,
      versao.versao,
      versao.datCri,
      versao.id // 'id' é opcional
    )
    this.versoes.push(newVersao)
    return console.log(this.versoes)
  }
}

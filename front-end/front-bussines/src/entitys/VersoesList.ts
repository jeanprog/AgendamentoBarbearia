import Versao from '@/entitys/Versao'

export default class VersoesList {
  versao: Versao[]
  constructor() {
    this.versao = []
  }

  public getAllVersao(): Versao[] {
    return this.versao
  }
}

export default class Solicitacao {
  idVersao: number
  aplicativo: string
  usuarioId: number
  desenvolvedor: string
  descricao: string
  titulo: string
  datCri: Date

  constructor(
    idVersao: number,
    aplicativo: string,
    usuarioId: number,
    desenvolvedor: string,
    descricao: string,
    titulo: string,
    datCri: Date
  ) {
    this.idVersao = idVersao
    this.aplicativo = aplicativo
    this.usuarioId = usuarioId
    this.desenvolvedor = desenvolvedor
    this.descricao = descricao
    this.titulo = titulo
    this.datCri = datCri
  }
}

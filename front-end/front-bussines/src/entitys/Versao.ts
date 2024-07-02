export default class Versao {
  constructor(
    public aplicativo: string,
    public versao: string,
    public datCri: Date,
    public id?: number
  ) {}
}

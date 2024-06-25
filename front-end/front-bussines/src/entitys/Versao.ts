export default class Versao {
  constructor(
    public id: number,
    public aplicativo: string,
    public versao: string,
    public datCri: Date
  ) {}
}

import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

const fomatarData = (data: any) => {
  const newDate = format(data, 'dd/MM/yyyy ', { locale: ptBR })

  return newDate
}

const criarObjetoData = (data: any) => {
  console.log(data)

  // Faz o parse da string de data no formato ISO
  const dataFormatada = parse(data, 'yyyy-MM-dd', new Date())
  return dataFormatada
}

export default fomatarData
criarObjetoData

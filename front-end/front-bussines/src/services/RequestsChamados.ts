import axios from 'axios'
import format from 'date-fns'

interface chamado {
  titulo: string | null
  prioridade: string | null
  sistema: string | null
  dAbertura: Date
  dFechamento: Date | null
  descricao: string | null
  usuarioId: number | null

  clienteId: number | null
  redeId: number | null
  statusChamadoAtual: number | null
}

const postChamado = async (chamado: chamado) => {
  try {
    const response = await axios.post(
      'http://192.168.1.108:3000/servicos',
      chamado
    )

    return response
  } catch (error) {
    console.log('error ao enviar requisição')
  }
}

const atualizarChamado = async (chamado: any) => {
  const { id, ...parteChamado } = chamado

  const response = await axios.patch(
    `http://192.168.1.108:3000/servicos/${chamado.id}`,
    parteChamado
  )

  console.log(chamado.id, response)
}

const getChamadosPorData = async (
  id: number,
  dataInicio: Date,
  dataFim: Date
) => {
  console.log('teste chamei a função ', id, dataInicio, dataFim)
  const baseUrl = `http://192.168.1.108:3000/servicos/user/chamadosdia/${id}`

  const response = await axios.get(baseUrl, {
    params: {
      dataInicio: dataInicio,
      dataFim: dataFim
    }
  })
  return response
  console.log(response)
}

const getChamadosDiaAtual = async (id: number) => {
  const url = `http://192.168.1.108:3000/servicos/user/date/${id}`
  const response = axios.get(url)

  return response
}

export {
  postChamado,
  atualizarChamado,
  getChamadosPorData,
  getChamadosDiaAtual
}

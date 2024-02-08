import axios from 'axios'

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
    const response = await axios.post('http://localhost:3000/servicos', chamado)

    return response
  } catch (error) {
    console.log('error ao enviar requisição')
  }
}

const atualizarChamado = async (chamado: any) => {
  const { id, ...parteChamado } = chamado
  console.log(chamado, 'aqui estou no service', chamado.id)
  await console.log(parteChamado)
  const response = await axios.patch(
    `http://localhost:3000/servicos/${chamado.id}`,
    parteChamado
  )

  console.log(chamado.id)
}

export { postChamado, atualizarChamado }

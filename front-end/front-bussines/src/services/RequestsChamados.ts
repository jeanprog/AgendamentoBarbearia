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

export default {

  async postChamado(chamado: Chamado) { 
    try {
        const response  = await axios.post('http://localhost:3000/servicos' , chamado )

        return response 
    } catch (error) {
        console.log('error ao enviar requisição')
    }
  }



  async atualizaChamado(id: number, chamado: chamado) {
    try {
      const response = axios.patch(
        `http://localhost:3000/servicos/${id}`,
        chamado
      )
      return response
    } catch (error) {
      console.log('erro em obter atualização', error)
    }
  }
}

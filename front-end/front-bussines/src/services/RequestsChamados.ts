import axios from 'axios'
/* require('dotenv').config(); */

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

/* const obterDadosTratadosChamado = async () => {
  try {
    const responseClientes = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/clientes`
    )
    const responseChamados = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/servicos/user/${idUser.value}`
    ) // refatorar aqui promisse allslteld
    const responseUser = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/user-login`
    )

    const listaClientes = responseClientes.data
    const listaChamados = responseChamados.data
    const listaAnalista = responseUser.data

    if (listaClientes.length > 0 && listaChamados.length > 0) {
       listaChamados.map((chamado: any) => {
        const clienteCorrespondente = listaClientes.find(
          (cliente: any) => cliente.id === chamado.clienteId
        )
        const AnalistaCorrespondente = listaAnalista.find((analista: any) => {
          return analista.Id === chamado.usuarioId
        })

        return {
          ...chamado,
          Analista: AnalistaCorrespondente
            ? AnalistaCorrespondente.nameUser
            : 'nada',
          Empresa: clienteCorrespondente
            ? clienteCorrespondente.empresa
            : 'N/A',
          Cliente: clienteCorrespondente ? clienteCorrespondente.nome : 'n/a',
          status: getStatusText(chamado.statusChamadoAtual),
          dAbertura: formatarData(chamado.dAbertura)
        }
      })
     

       emit('allChamado', listaResultado.value)
      recarregar.value = false 
    } else {
      console.log('lista vazia ')
      return []
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error)
    return []
  }
}

 */

const postChamado = async (chamado: chamado) => {
  try {
    const response = await axios.post(
      `http://${import.meta.env.VITE_IP_URL}:3000/servicos`,
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
    `http://${import.meta.env.VITE_IP_URL}:3000/servicos/${chamado.id}`,
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
  const baseUrl = `http://${import.meta.env.VITE_IP_URL}:3000/servicos/user/chamadosdia/${id}`

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
  const url = `http://${import.meta.env.VITE_IP_URL}:3000/servicos/user/date/${id}`
  const response = axios.get(url)

  return response
}

export {
  postChamado,
  atualizarChamado,
  getChamadosPorData,
  getChamadosDiaAtual
}

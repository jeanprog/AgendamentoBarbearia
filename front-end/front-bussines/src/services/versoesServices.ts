// request da tela desenv

import axios from 'axios'
import format from 'date-fns'

interface versao {
  aplicativo: string
  versao: string
  datCri: Date
}

interface SolucaoVersao {
  id: number // Gerado pelo Prisma
  idVersao: number
  aplicativo: string
  usuarioId: number
  desenvolvedor: string
  descricao: string
}

const url = ' http://192.168.1.108:3000/versoes'
const urlVersao = 'http://192.168.1.108:3000/solicitacao-desenv'

const postVersoes = async (versao: versao) => {
  try {
    console.log('acionou o service ')
    const response = await axios.post(url, versao)

    return console.log(response)
  } catch (error) {
    console.log('deu ruim no cadastro ')
    return
  }
}

const getVersoes = async () => {
  try {
    const response = await axios.get(url)
    return response
  } catch (error) {
    console.log('error na requisição')
  }
  return
}

const delVersaoService = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`)
  } catch (error) {
    console.log('impossivel deletar', error)
  }
}

const requestSolucaoVersao = async (solucaoVersao: SolucaoVersao) => {
  try {
    console.log('acionou o service', solucaoVersao)
    const response = await axios.post(urlVersao, solucaoVersao)

    return console.log(response)
  } catch (error) {
    console.log('deu ruim no cadastro novo ')
    return
  }
}

const getSolucaoVersao = async () => {
  try {
    const response = await axios.get(urlVersao)

    return response
  } catch (error) {
    console.log('Error em retornar as solicitações ')
    return
  }
}

export {
  getVersoes,
  postVersoes,
  delVersaoService,
  requestSolucaoVersao,
  getSolucaoVersao
}

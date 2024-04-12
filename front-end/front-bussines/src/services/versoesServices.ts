// request da tela desenv

import axios from 'axios'
import format from 'date-fns'

interface versao {
  aplicativo: string
  versao: string
  datCri: Date
}

const url = ' http://192.168.1.108:3000/versoes'

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

export { getVersoes, postVersoes }

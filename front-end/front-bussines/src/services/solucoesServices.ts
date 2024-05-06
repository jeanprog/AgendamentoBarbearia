import axios from 'axios'

interface SolucaoVersao {
  idVersa0: number
  idsolicitacaoDesenv: number
  descricaoSolucao: string
  datCri: Date
}

const url = 'http://192.168.1.108:3000/solucao-versao'

const submitSolucaoVersao = async (createSolucaoVersaoDto) => {
  try {
    const request = await axios.post(url.CreateSolucaoVersaoDto)
    return 'adicionado com sucesso'
  } catch (error) {
    console.log('não adicionou')
    return
  }

  const get = () => {}
}

export { submitSolucaoVersao }

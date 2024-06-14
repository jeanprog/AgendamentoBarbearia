import axios from 'axios'

interface SolucaoVersao {
  idVersao: number
  idsolicitacaoDesenv: number
  descricaoSolucao: string
  datCri: Date
}


const url = `http://${import.meta.env.VITE_BASE_URL}:3000/solucao-versao`

const submitSolucaoVersao = async (createSolucaoVersaoDto: SolucaoVersao) => {
  try {
    await axios.post(url , createSolucaoVersaoDto)
    return 'adicionado com sucesso'
  } catch (error) {
    console.log('não adicionou')
    return
  }

 
}

export { submitSolucaoVersao }

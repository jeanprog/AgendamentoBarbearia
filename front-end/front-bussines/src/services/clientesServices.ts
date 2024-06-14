import axios from "axios"


interface Cliente {
    id: number
    nome: string
    telefone: string
    empresa: string
  }


  const todoClientes = async (): Promise<Cliente[] | void> => { 
    try {
        const response = await axios.get<Cliente[]>(`http://${import.meta.env.VITE_IP_URL}:3000/clientes`)
        return response.data 
       // Assumindo que a resposta contém um array de clientes
      } catch (error) {
        console.error('Erro ao obter a lista de clientes:', error)
      }

  }




  export default todoClientes 
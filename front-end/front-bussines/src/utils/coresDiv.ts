const getStatusClasses = (status: string) => {
  switch (status) {
    case 'aberto':
      return 'bg-green-700 border-green-700'
    case 'fechado':
      return 'bg-red-700 border-red-700'
    case 'pendente':
      return 'bg-yellow-700 border-yellow-700'
    default:
      return 'bg-gray-400 border-gray-400' // Classe padrão para outros estados
  }
}

export default getStatusClasses

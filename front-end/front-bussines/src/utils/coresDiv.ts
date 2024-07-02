const getStatusClasses = (status: string) => {
  switch (status) {
    case 'aberto':
      return 'bg-green-700 border-green-700'
    case 'fechado':
      return 'bg-blue-900 border-blue-900'
    case 'pendente':
      return 'bg-yellow-700 border-yellow-700'
    default:
      return 'bg-gray-400 border-gray-400' // Classe padrão para outros estados
  }
}

const getStatusflag = (status: string) => {
  switch (status) {
    case 'Alta':
      return 'text-red-700'
    case 'Media':
      return 'text-yellow-400'
    case 'Baixa':
      return 'text-blue-400'
    default:
      return 'bg-gray-400 border-gray-400' // Classe padrão para outros estados
  }
}

export { getStatusClasses, getStatusflag }

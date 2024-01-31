const retornaNumberStatus = (status: any) => {
  switch (status) {
    case 'aberto':
      return 1
    case 'pendente':
      return 2
    case 'fechado':
      return 3
    default:
      return -1 // Valor padrão caso o status não seja reconhecido
  }
}

export default retornaNumberStatus

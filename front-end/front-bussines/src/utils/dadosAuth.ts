const obterDadosAuthLogin = () => {
  const dadosLogin = localStorage.getItem('user')
  if (dadosLogin) {
    const dadosJson = JSON.parse(dadosLogin)

    const iduser = parseInt(dadosJson.id)
    const idrede = parseInt(dadosJson.rede)
    return { iduser, idrede }
  }
}

export default obterDadosAuthLogin

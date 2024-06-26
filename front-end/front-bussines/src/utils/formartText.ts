const formatText = (text: string, numPalavras: number) => {
  const textFormat = text.split(' ')
  return textFormat.slice(0, numPalavras).join(' ') + '...'
}

export default formatText

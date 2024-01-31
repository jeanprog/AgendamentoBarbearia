
import {format} from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export default { 


  fomatarData (data : any) { 
    const newDate = format(data, 'dd/MM/yyyy HH:mm', { locale: ptBR });

    return newDate ; 
 }

}
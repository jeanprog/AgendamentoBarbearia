<template class="body-service">
  <HeaderVoltar :title="titlepage" />
  <div class="searchbar">
    <v-text-field
      bg-color="#1E1E26"
      class="inputSearch"
      density="compact"
      variant="solo"
      label="Buscar clientes"
      append-inner-icon="fa-brands fa-searchengin"
      single-line
      hide-details
      v-model="buscaServico"
      @input="filtroServico"
    ></v-text-field>
  </div>

  <Div class="containerServicos">
    <div class="scrollable-container">
      <v-card
        variant="outlined"
        class="card-customize"
        max-width="600"
        color="#67159C"
        v-for="(servico, index) in servicosFiltrados"
        :key="index"
      >
        <v-card-item>
          <div id="container-text">
            <div class="text-card">
              <span class="campo-texto">Nome:</span> {{ servico.nome }}
            </div>
            <div class="text-card">
              <span class="campo-texto">Preço:</span> {{ servico.preco }}
            </div>
            <div class="text-card">
              <span class="campo-texto">Duração:</span> {{ servico.duracao }}
            </div>
            <!--  <div class="text-card">Descrição: {{ servico.descricao }}</div>
            <div class="text-card">categoria: {{ servico.categoria }}</div> -->
          </div>
        </v-card-item>

        <div class="btns-card">
          <v-btn color="#E82D92" class="botaoCard">
            <icon
              color="#E82D92"
              class="fa-brands fa-whatsapp"
              style="font-size: 20px; color: #e82d92"
              id="icon-cards"
            >
            </icon>
          </v-btn>
          <v-btn
            color="#E82D92"
            class="botaoCard"
            @click="editService(servico)"
          >
            <icon
              class="fa-solid fa-pen"
              id="icon-cards"
              style="font-size: 24px; color: #e82d92"
            ></icon>
          </v-btn>
          <v-btn color="#E82D92" class="botaoCard">
            <icon
              class="fa-solid fa-info"
              id="icon-cards"
              style="font-size: 24px; color: #e82d92"
            ></icon>
          </v-btn>
        </div>
      </v-card>
    </div>
  </Div>
  <div class="container-botao">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="#67159C" class="addServico" v-bind="props">
          + Adicionar
        </v-btn>
      </template>
      <v-card class="ModalAdicionarServiço">
        <v-card-title class="title-modal">
          <span class="title-modal">Novo Serviço</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="nome"
                  label="Nome do Serviço"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="duracao"
                  :items="['30 min ', '45 min', '60 min', '80 min']"
                  label="Duração"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="preco"
                  label="Preço"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  type="number"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="descricao"
                  label="Descrição"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-autocomplete
                  v-model="categoria"
                  :items="['corte', 'pintura', 'barba']"
                  label="Categorias"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*Todos os campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#67159C" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveService()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn class="addServico" color="#E82D92">agendar</v-btn>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
/* import { openModal } from '@kolirt/vue-modal'
import ModalAddServico from './ModalAddServico.vue'
 */
interface Servicos {
  id: number
  nome: string
  duracao: number
  preco: number
  descricao: string
  categoria: string
}
const dialog = ref(false)
const titlepage = ref('Cadastro de Serviço')
let servicos = ref<Servicos[]>([])
let nome = ref('')
let duracao = ref('')
let preco = ref('')
let descricao = ref('')
let categoria = ref()
let buscaServico = ref('')
let servicosFiltrados = ref<Servicos[]>([])
let editarCliente = ref<boolean>(false)
let idServico = ref<number>()

const notify = () => {
  toast('cadastrado com sucesso', {
    autoClose: 1000,
  })
}

const editService = (Servico: Servicos | null = null) => {
  dialog.value = true
  if (Servico) {
    nome.value = Servico.nome
    duracao.value = Servico.duracao.toString() // Convertendo para string
    preco.value = Servico.preco.toString() // Convertendo para string
    descricao.value = Servico.descricao
    categoria.value = Servico.categoria
    idServico.value = Servico.id

    editarCliente.value = true

    console.log(Servico.id)
  }
}

const saveService = () => {
  // Função para extrair minutos da string de duração
  if (editarCliente.value === true) {
    console.log('estou no case de editar cliente ')
    const extrairMinutos = (duracao: string) => {
      const match = duracao.match(/\d+/) // Encontra o primeiro número na string
      return match ? parseInt(match[0], 10) : null
    }

    // Função para garantir que o preço seja um float
    const formatarPreco = (preco: string): string | number => {
      const precoFloat = parseFloat(preco.replace(',', '.')) // Substitui ',' por '.' e converte para float

      if (!isNaN(precoFloat)) {
        return precoFloat // Retorna o preço como número
      } else {
        return '' // Ou retorne uma string vazia, ou uma mensagem de erro
      }
    }
    const ajustarCategoria = (novaCategoria: string) => {
      return Array.isArray(novaCategoria) ? novaCategoria[0] : novaCategoria
    }

    // Formatar os dados antes de enviar
    const data = {
      nome: nome.value,
      duracao: extrairMinutos(duracao.value), // Chama a função para obter minutos
      preco: formatarPreco(preco.value), // Chama a função para obter o preço como float
      descricao: descricao.value,
      categoria: ajustarCategoria(categoria.value),
    }

    // Aqui você pode acessar os dados do serviço no objeto ref.
    const SubmitForm = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:3000/servicos/${idServico.value}`,
          data
        )
        console.log(response.data)
        console.log(data)
      } catch (error) {
        console.error('Erro ao enviar formulário:', error)
      }
    }

    SubmitForm().then(() => {
      toast('alterado com sucesso', {
        autoClose: 1000,
      })
    })

    console.log(data)

    // Adicione a lógica para salvar os dados conforme necessário.

    // Feche o diálogo após salvar, se desejado.
    dialog.value = false
  } else {
    const extrairMinutos = (duracao: string) => {
      const match = duracao.match(/\d+/) // Encontra o primeiro número na string
      return match ? parseInt(match[0], 10) : null
    }

    // Função para garantir que o preço seja um float
    const formatarPreco = (preco: string): string | number => {
      const precoFloat = parseFloat(preco.replace(',', '.')) // Substitui ',' por '.' e converte para float

      if (!isNaN(precoFloat)) {
        return precoFloat // Retorna o preço como número
      } else {
        return '' // Ou retorne uma string vazia, ou uma mensagem de erro
      }
    }
    const ajustarCategoria = (novaCategoria: string) => {
      return Array.isArray(novaCategoria) ? novaCategoria[0] : novaCategoria
    }

    // Formatar os dados antes de enviar
    const data = {
      nome: nome.value,
      duracao: extrairMinutos(duracao.value), // Chama a função para obter minutos
      preco: formatarPreco(preco.value), // Chama a função para obter o preço como float
      descricao: descricao.value,
      categoria: ajustarCategoria(categoria.value),
    }

    // Aqui você pode acessar os dados do serviço no objeto ref.
    const SubmitForm = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/servicos',
          data
        )
        console.log(response)
      } catch (error) {
        console.error('Erro ao enviar formulário:', error)
      }
    }

    SubmitForm().then(() => {
      notify()
    })

    console.log(data)

    // Adicione a lógica para salvar os dados conforme necessário.

    // Feche o diálogo após salvar, se desejado.
    dialog.value = false
  }
}

const listarServicos = async () => {
  const response = await axios.get('http://localhost:3000/servicos')
  servicos.value = response.data
  console.log(servicos.value)
}

const filtroServico = async () => {
  if (buscaServico.value.trim() === '') {
    // Se o campo de busca estiver vazio, atribui a lista original de clientes
    await listarServicos()
    servicosFiltrados.value = servicos.value
  } else {
    // Caso contrário, realiza o filtro
    const filtro = servicos.value.filter((servico) => {
      return servico.nome
        .toLowerCase()
        .includes(buscaServico.value.toLowerCase())
    })
    servicosFiltrados.value = filtro
    console.log(servicos.value)
  }
}

/* function openModalAddServico() {
  openModal(ModalAddServico, {
    test: 'testando passagem de variavel',
  })
    .then((data) => {
      console.log('sucess', data)
    })
    .catch(() => {
      console.log('catch')
    })
} */

onMounted(() => {
  filtroServico()
})
</script>

<style scoped>
.body-service {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh !important;
  overflow: hidden !important;
}
.searchbar {
}
.inputSearch input {
  background-color: #19181f !important;
}
.containerServicos {
  width: 100%;
  max-height: 60vh !important;

  overflow-y: auto;
  border-radius: 8px;
  background: #19181f;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center !important;
}
.addServico {
  border: none;
  background-color: white;
  margin: 2%;
  border-radius: 8px;
  height: 42px !important;
}

.card-customize {
  margin: 2%;
  height: 28%;
  background: none;
  width: 96%;
  font-size: 16px;
  border: solid;
}
.btns-card {
  margin-bottom: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

.scrollable-container {
  max-height: 100%; /* Garante que o conteúdo não ultrapasse a altura máxima da div pai */
  overflow-y: auto;
  width: 100%;
}
.container-botao {
  width: 100%;

  display: flex;
  flex-direction: column;
  padding: 2%;
}
.botaoCard {
  background-color: #19181f !important;
  border: solid 1px !important;
  border-color: #e82d92 !important;
  width: 20% !important;
}

.text-card {
  color: aliceblue;
  font-size: 12px !important;
}

.campo-texto {
  font-weight: bold;
  font-size: 14px;
}

.ModalAdicionarServiço {
  background-color: #19181f !important;
  color: white;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
}
.title-modal {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
}
#icon-cards {
  color: white !important;
  font-size: 20px !important;
}
</style>

<template>
  <!--    -->
  <HeaderVoltar :title="titlepage" />
  <div class="body">
    <div class="body-left">
      <div class="flex gap-12">
        <div
          v-if="!dialog"
          class="flex ml-4 flex-col justify-center items-center gap-2 w-50 bg-zinc-800 rounded-[14px] p-2"
        >
          Informações Gerais de chamados
          <div class="flex gap-2">
            <popoverTeste
              dataTitulo="Data inicio"
              isStart="true"
              @dataInicio="recebeDatainicio"
              :limparDatas="limpardatas"
              @limpar-concluido="retornaLimparDatas"
            />
            <popoverTeste
              v-if="!dialog"
              dataTitulo="Data Final"
              isStart="false"
              :limparDatas="limpardatas"
              @dataFim="recebeDataFim"
              @limpar-concluido="retornaLimparDatas"
            />
          </div>
          <div class="flex gap-2">
            <Card
              class="flex flex-col items-center w-20 h-20 bg-zinc-900 shadow-lg"
              ><p class="text-zinc-400 text-[12px]">Total</p>
              <p class="text-zinc-400 text-[12px]">Chamados</p>
              <p class="text-white text-[14px]">{{ itensChamado.length }}</p>
            </Card>
            <Card
              class="flex flex-col items-center w-20 h-20 bg-zinc-900 shadow-lg"
              ><p class="text-zinc-400 text-[12px]">Chamados</p>
              <p class="text-zinc-400 text-[12px]">Dia</p>
              <p class="text-white text-[14px]">
                {{ _listaChamadosDiaAtual.length }}
              </p>
            </Card>
            <Card
              class="flex flex-col items-center w-20 h-20 bg-zinc-900 shadow-lg"
              ><p class="text-zinc-400 text-[12px]">Chamados</p>
              <p class="text-zinc-400 text-[12px]">PDV</p>
              <p class="text-white text-[14px]">{{ chamadosPDV.length }}</p>
            </Card>
            <Card
              class="flex flex-col items-center w-20 h-20 bg-zinc-900 shadow-lg"
              ><p class="text-zinc-400 text-[12px]">Chamados</p>
              <p class="text-zinc-400 text-[12px]">Retaguarda</p>
              <p class="text-white text-[14px]">
                {{ chamadosRetaguarda.length }}
              </p>
            </Card>
          </div>
          <div class="flex gap-2">
            <Card
              class="flex flex-col items-center w-20 h-20 bg-zinc-900 shadow-lg"
              ><p class="text-zinc-400 text-[12px]">Chamados</p>
              <p class="text-zinc-400 text-[12px]">Ecommerce</p>
              <p class="text-white text-[14px]">
                {{ chamadosEcommerce.length }}
              </p>
            </Card>
            <Card
              class="flex flex-col items-center w-20 h-20 bg-zinc-900 shadow-lg"
              ><p class="text-zinc-400 text-[12px]">Chamados</p>
              <p class="text-zinc-400 text-[12px]">Emissor</p>
              <p class="text-white text-[14px]">{{ chamadosEmissor.length }}</p>
            </Card>
            <Card
              class="flex flex-col items-center w-20 h-20 bg-zinc-900 shadow-lg"
              ><p class="text-zinc-400 text-[12px]">Chamados</p>
              <p class="text-zinc-400 text-[12px]">Etiquetas</p>
              <p class="text-white text-[14px]">
                {{ chamadosEtiquetas.length }}
              </p>
            </Card>
            <Card
              class="flex flex-col items-center w-20 h-20 bg-zinc-900 shadow-lg"
              ><p class="text-zinc-400 text-[12px]">Chamados</p>
              <p class="text-zinc-400 text-[12px]">Pré venda</p>
              <p class="text-white text-[14px]">
                {{ chamadosPreVenda.length }}
              </p>
            </Card>
          </div>
          <div
            class="bg-zinc-600 w-full h-full rounded-[12px] flex flex-col items-center"
          >
            <p class="text-[12px] text-zinc-200">Ultimo Chamado Registrado</p>
            <p class="text-[12px]" v-if="itensChamado.length > 0">
              Status: <span class="pl-2">{{ itensChamado[0].status }}</span>
            </p>
            <p class="text-[12px]" v-if="itensChamado.length > 0">
              Empresa: <span class="pl-2">{{ itensChamado[0].Empresa }}</span>
            </p>
            <p class="text-[12px]" v-if="itensChamado.length > 0">
              Funcionário:
              <span class="pl-2">{{ itensChamado[0].Cliente }}</span>
            </p>
            <Dialog>
              <DialogTrigger as-child>
                <Button
                  variant="outline"
                  class="rounded-[12px] h-6 text-[12px] hover:bg-[#3f51b5] mt-2 bg-zinc-900"
                >
                  visualizar
                </Button>
              </DialogTrigger>
              <DialogContent
                class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[70dvh] bg-zinc-800 text-white"
              >
                <DialogHeader class="p-6 pb-0">
                  <DialogTitle class="text-zinc-400"
                    >Chamado Completo</DialogTitle
                  >
                </DialogHeader>
                <div class="grid gap-4 py-4 overflow-y-auto px-6 text-white">
                  <div class="flex flex-col">
                    <p class="" v-if="itensChamado.length > 0">
                      Empresa:
                      <span class="pl-2 text-zinc-400">{{
                        itensChamado[0].Empresa
                      }}</span>
                    </p>
                    <p class="" v-if="itensChamado.length > 0">
                      Funcionário:
                      <span class="pl-2 text-zinc-400">{{
                        itensChamado[0].Cliente
                      }}</span>
                    </p>
                    <p class="" v-if="itensChamado.length > 0">
                      Titulo:
                      <span class="pl-2 text-zinc-400">{{
                        itensChamado[0].titulo
                      }}</span>
                    </p>
                    <p class="" v-if="itensChamado.length > 0">
                      Descricao:
                      <span class="pl-2 text-zinc-400">{{
                        itensChamado[0].descricao
                      }}</span>
                    </p>
                    <p class="" v-if="itensChamado.length > 0">
                      Status:
                      <span class="pl-2 text-zinc-400">{{
                        itensChamado[0].status
                      }}</span>
                    </p>
                    <p class="" v-if="itensChamado.length > 0">
                      Data:
                      <span class="pl-2 text-zinc-400">{{
                        itensChamado[0].dAbertura
                      }}</span>
                    </p>
                    <p class="" v-if="itensChamado.length > 0">
                      Prioridade:
                      <span class="pl-2 text-zinc-400">{{
                        itensChamado[0].prioridade
                      }}</span>
                    </p>
                  </div>
                </div>
                <DialogFooter class="p-6 pt-0">
                  <Button
                    class="bg-[#3f51b5] mt-2 hover:bg-zinc-900 text-white rounded-[12px]"
                    @click="atualizarStatusFechado(itensChamado[0])"
                  >
                    Finalizar Chamado
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div
            v-if="!dialog"
            class="flex flex-col items-center w-40 h-28 rounded-lg shadow-md shadow-red-700 p-2 bg-zinc-800"
          >
            <span class="text-[12px]">PRIORIDADE ALTA</span>
            <span class="text-[8px]">total</span>
            <p class="p-2 text-[48px]">{{ totalChamadosAlta() }}</p>
          </div>
          <div
            v-if="!dialog"
            class="flex flex-col items-center w-40 h-28 rounded-lg shadow-md shadow-yellow-400 p-2 bg-zinc-800"
          >
            <span class="text-[12px]">PRIORIDADE MÉDIA</span>
            <span class="text-[8px]">total</span>
            <p class="p-2 text-[48px]">{{ totalChamadosBaixa() }}</p>
          </div>
          <div
            v-if="!dialog"
            class="flex flex-col items-center w-40 h-28 rounded-lg shadow-md shadow-blue-400 p-2 bg-zinc-800"
          >
            <span class="text-[12px]">PRIORIDADE BAIXA</span>
            <span class="text-[8px]">total</span>
            <p class="p-2 text-[48px]">{{ totalChamadosMedia() }}</p>
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <div
            v-if="!dialog"
            class="flex flex-col items-center w-40 h-24 rounded-lg shadow-lg p-2 bg-zinc-800"
          >
            <span class="text-[12px]">CHAMADOS DO DIA</span>
            <p class="p-2 text-[48px]">{{ _listaChamadosDiaAtual.length }}</p>
          </div>
          <div
            v-if="!dialog"
            class="flex flex-col items-center w-40 h-24 rounded-lg shadow-lg p-2 bg-zinc-800"
          >
            <span class="text-[12px]">TOTAL DO PERIODO</span>

            <p v-if="_listaFiltrada.length > 0" class="p-2 text-[48px]">
              {{ _listaFiltrada.length }}
            </p>
            <p v-if="_listaFiltrada.length === 0" class="p-2 text-[48px]">0</p>
          </div>

          <Button
            v-if="!dialog"
            class="flex text-[16px] flex-col gap-4 bg-indigo-800 rounded-[8px] w-40 h-28 shadow-md"
            @click="abrirModal"
            @fecharModal="fecharModal"
          >
            Adicionar<br />
            Chamado
            <icon class="fa-solid fa-users-gear text-[32px]"></icon>
          </Button>
        </div>

        <div class="ModalPage" v-if="dialog">
          <ModalAddChamado
            @fecharModal="fecharModal"
            @chamadoAdicionado="handleChamadoAdicionado"
            @submitChamado="obterDadosFormularios"
            @consultarClientes="escolherCliente"
            :editarChamado="itemEditar"
          />
        </div>
      </div>

      <!--  final da divisão parte de cima esquerda -->

      <div class="container-acoes">
        <div class="container-prioridade">
          <div
            v-if="!dialog"
            class="flex flex-col bg-zinc-800 rounded-lg items-center min-w-[900px] max-w-[900px] ml-4 overflow-y-hidden h-60"
          >
            <p class="absolute p-2 bg-zinc-700 mt-4 rounded-lg" v-if="!dialog">
              Chamados Pendentes com prioridade alta
            </p>

            <div class="flex mt-16 gap-2">
              <div class="mt-16" v-if="listaChamadoPrioridade.length === 0">
                não há chamados pendentes
              </div>
              <div
                v-for="(chamado, index) in listaChamadoPrioridade"
                :key="index"
              >
                <div class="">
                  <Dialog>
                    <DialogTrigger as-child>
                      <Card
                        class="h-40 w-36 bg-zinc-900 border-2 border-red-700 cursor-pointer"
                      >
                        <CardContent
                          class="flex flex-col aspect-square items-center gap-2"
                        >
                          <div
                            class="flex justify-center min-h-8 min-w-[9rem] rounded-lg overflow-x-hidden bg-red-700"
                          >
                            <p>{{ chamado.Empresa.toUpperCase() }}</p>
                          </div>
                          <i
                            class="fa-brands fa-font-awesome text-red-700 text-[24px]"
                          ></i>

                          <div class="flex flex-col max-h-[48px]">
                            <span class="text-[12px] font-semibold"
                              ><span class=""></span>Empresa:
                              {{ formatText(chamado.Empresa, 1) }}</span
                            >

                            <span class="text-[12px] font-semibold">
                              Abertura: {{ chamado.dAbertura }}</span
                            >
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent
                      class="sm:max-w-[425px] bg-zinc-800 text-white"
                    >
                      <DialogHeader>
                        <DialogTitle>Detalhes do Chamado</DialogTitle>
                        <DialogDescription>
                          {{ chamado.descricao }}
                        </DialogDescription>
                      </DialogHeader>
                      <div class="grid py-4">
                        <div
                          class="grid grid-cols-2 items-center gap-2 text-[14px]"
                        >
                          <span class="font-bold">Titulo:</span>
                          {{ chamado.titulo }}
                          <span class="font-bold">Cliente:</span>
                          {{ chamado.Cliente }}

                          <span class="font-bold">Empresa:</span>
                          {{ chamado.Empresa }}

                          <span class="font-bold">Prioridade:</span>
                          {{ chamado.prioridade }}

                          <span class="font-bold">Arbetura:</span>
                          {{ chamado.dAbertura }}
                          <span class="font-bold">Fechamento:</span>
                          {{ chamado.dFechamento }}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          class="bg-indigo-800 rounded-lg hover-zinc-300 focus:outline-none"
                          type="submit"
                          @click="atualizarStatusFechado(chamado)"
                        >
                          <DialogClose
                            class="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
                          >
                            Finalizar Chamado
                          </DialogClose>
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-zinc-800 rounded-lg flex flex-col items-center min-w-[900px] max-w-[900px] ml-2 overflow-y-hidden h-56"
        >
          <p class="absolute p-2 mt-2 bg-zinc-700 rounded-lg" v-if="!dialog">
            Chamados Pendentes Geral
          </p>

          <div class="flex mt-14 gap-2">
            <div class="mt-16" v-if="listaPendentes.length === 0">
              não há chamados pendentes
            </div>
            <div v-for="(chamado, index) in listaPendentes" :key="index">
              <div class="">
                <Dialog>
                  <DialogTrigger as-child>
                    <Card
                      class="h-40 w-36 bg-zinc-900 cursor-pointer border-2 border-yellow-400"
                    >
                      <CardContent
                        class="flex flex-col aspect-square items-center gap-2"
                      >
                        <div
                          class="flex justify-center min-h-8 min-w-[9rem] rounded-lg overflow-x-hidden bg-yellow-400"
                        >
                          <p class="text-black font-bold">
                            {{ chamado.Empresa.toUpperCase() }}
                          </p>
                        </div>
                        <i
                          class="fa-brands fa-font-awesome text-yellow-400 text-[24px]"
                        ></i>
                        <div class="flex flex-col max-h-[48px]">
                          <span class="text-[12px] font-semibold"
                            ><span class=""></span>Empresa:
                            {{ formatText(chamado.Empresa, 1) }}</span
                          >

                          <span class="text-[12px] font-semibold">
                            Abertura: {{ chamado.dAbertura }}</span
                          >
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent
                    class="sm:max-w-[425px] bg-zinc-800 text-white"
                  >
                    <DialogHeader>
                      <DialogTitle>Detalhes do Chamado</DialogTitle>
                      <DialogDescription>
                        {{ chamado.descricao }}
                      </DialogDescription>
                    </DialogHeader>
                    <div class="grid py-4">
                      <div
                        class="grid grid-cols-2 items-center gap-2 text-[14px]"
                      >
                        <span class="font-bold">Titulo:</span>
                        {{ chamado.titulo }}
                        <span class="font-bold">Cliente:</span>
                        {{ chamado.Cliente }}

                        <span class="font-bold">Empresa:</span>
                        {{ chamado.Empresa }}

                        <span class="font-bold">Prioridade:</span>
                        {{ chamado.prioridade }}

                        <span class="font-bold">Arbetura:</span>
                        {{ chamado.dAbertura }}
                        <span class="font-bold">Fechamento:</span>
                        {{ chamado.dFechamento }}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        class="bg-indigo-800 rounded-lg hover-zinc-300 focus:outline-none"
                        type="submit"
                        @click="atualizarStatusFechado(chamado)"
                      >
                        <DialogClose
                          class="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
                        >
                          Finalizar Chamado
                        </DialogClose>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body-right" v-if="!dialog">
      <div
        class="flex flex-col h-96 border-[2px] shadow-lg p-1 rounded-lg border-zinc-500"
      >
        <div class="flex h-8 justify-center">
          <p v-if="!dialog" class="py-2">Chamados diários</p>
        </div>
        <div class="cards" v-if="!dialog">
          <div class="itens">
            <p class="titulo-box">Abertos ({{ listaChamadoAberto.length }})</p>

            <Card
              class="h-20 w-64 flex mt-2 bg-zinc-700 shadow-lg"
              max-width="600"
              color="#3f51b5"
              v-for="(chamado, index) in listaChamadoAberto"
              :key="index"
              variant="outlined"
            >
              <CardContent>
                <Dialog>
                  <DialogTrigger as-child>
                    <div class="flex gap-2 p-2">
                      <div class="flex flex-col gap-4">
                        <i
                          :class="getStatusflag(chamado.prioridade)"
                          class="fa-brands fa-font-awesome text-[24px]"
                        ></i>
                        <icon
                          class="fa-solid fa-users-gear text-[24px] text-green-600"
                        ></icon>
                      </div>
                      <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                          <span class="font-medium">Titulo:</span>
                          <p class="text-[12px]">
                            {{ formatText(chamado.titulo, 1) }}
                          </p>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="font-medium">Nome:</span>
                          <p class="text-[12px]">{{ chamado.Cliente }}</p>
                        </div>

                        <div class="flex items-center gap-2">
                          <span class="font-medium">Empresa:</span>
                          <p class="text-[12px]">
                            {{ formatText(chamado.Empresa, 1) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    class="sm:max-w-[425px] bg-zinc-900 text-white"
                  >
                    <DialogHeader>
                      <DialogTitle>
                        <span class="text-zinc-400 text-[16px] font-bold"
                          >Empresa:
                        </span>
                        <br />{{ chamado.Empresa }}</DialogTitle
                      >
                      <DialogDescription>
                        <span class="text-zinc-400 text-[16px] font-bold"
                          >Titulo</span
                        >
                        <p>{{ chamado.titulo }}</p>
                      </DialogDescription>
                    </DialogHeader>
                    <div class="flex flex-col py-4">
                      <p>
                        <span class="text-zinc-400 font-bold"
                          >Funcionário:</span
                        >
                        {{ chamado.Cliente }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">sistema:</span>
                        {{ chamado.sistema }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Status:</span>
                        {{ chamado.status }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">prioridade:</span>
                        {{ chamado.prioridade }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Abertura:</span>
                        {{ chamado.dAbertura }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Fechamento:</span>
                        {{ chamado.dFechamento }}
                      </p>
                    </div>
                    <DialogFooter> </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
          <div class="itens">
            <p class="titulo-box">
              Pendentes ({{ listaChamadoPendente.length }})
            </p>

            <Card
              class="h-20 w-64 flex mt-2 bg-zinc-700 shadow-lg"
              max-width="600"
              color="#3f51b5"
              v-for="(chamado, index) in listaChamadoPendente"
              :key="index"
              variant="outlined"
            >
              <CardContent>
                <Dialog>
                  <DialogTrigger as-child>
                    <div class="flex gap-2 p-2">
                      <div class="flex flex-col gap-4">
                        <i
                          :class="getStatusflag(chamado.prioridade)"
                          class="fa-brands fa-font-awesome text-[24px]"
                        ></i>
                        <icon
                          class="fa-solid fa-users-gear text-[24px] text-yellow-600"
                        ></icon>
                      </div>
                      <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                          <span class="font-medium">Titulo:</span>
                          <p class="text-[12px]">
                            {{ formatText(chamado.titulo, 1) }}
                          </p>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="font-medium">Nome:</span>
                          <p class="text-[12px]">
                            {{ formatText(chamado.Cliente, 1) }}
                          </p>
                        </div>

                        <div class="flex items-center gap-2">
                          <span class="font-medium">Empresa:</span>
                          <p class="text-[12px]">
                            {{ formatText(chamado.Empresa, 1) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    class="sm:max-w-[425px] bg-zinc-900 text-white"
                  >
                    <DialogHeader>
                      <DialogTitle>
                        <span class="text-zinc-400 text-[16px] font-bold"
                          >Empresa:
                        </span>
                        <br />{{ chamado.Empresa }}</DialogTitle
                      >
                      <DialogDescription>
                        <span class="text-zinc-400 text-[16px] font-bold"
                          >Titulo</span
                        >
                        <p>{{ chamado.titulo }}</p>
                      </DialogDescription>
                    </DialogHeader>
                    <div class="flex flex-col py-4">
                      <p>
                        <span class="text-zinc-400 font-bold"
                          >Funcionário:</span
                        >
                        {{ chamado.Cliente }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">sistema:</span>
                        {{ chamado.sistema }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Status:</span>
                        {{ chamado.status }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">prioridade:</span>
                        {{ chamado.prioridade }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Abertura:</span>
                        {{ chamado.dAbertura }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Fechamento:</span>
                        {{ chamado.dFechamento }}
                      </p>
                    </div>
                    <DialogFooter> </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
          <div class="itens">
            <p class="titulo-box">
              Fechados ({{ listaChamadoFechado.length }})
            </p>

            <Card
              class="h-20 w-64 flex mt-2 bg-zinc-700 shadow-lg"
              max-width="600"
              color="#3f51b5"
              v-for="(chamado, index) in listaChamadoFechado"
              :key="index"
              variant="outlined"
            >
              <CardContent>
                <Dialog>
                  <DialogTrigger as-child>
                    <div class="flex gap-2 p-2">
                      <div class="flex flex-col gap-4">
                        <i
                          :class="getStatusflag(chamado.prioridade)"
                          class="fa-brands fa-font-awesome text-[24px]"
                        ></i>
                        <icon
                          class="fa-solid fa-users-gear text-[24px] text-red-600"
                        ></icon>
                      </div>
                      <div class="flex flex-col">
                        <div class="flex items-center gap-2">
                          <span class="font-medium">Titulo:</span>
                          <p class="text-[12px]">
                            {{ formatText(chamado.titulo, 1) }}
                          </p>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="font-medium">Nome:</span>
                          <p class="text-[12px]">{{ chamado.Cliente }}</p>
                        </div>

                        <div class="flex items-center gap-2">
                          <span class="font-medium">Empresa:</span>
                          <p class="text-[12px]">
                            {{ formatText(chamado.Empresa, 1) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    class="sm:max-w-[425px] bg-zinc-900 text-white"
                  >
                    <DialogHeader>
                      <DialogTitle>
                        <span class="text-zinc-400 text-[16px] font-bold"
                          >Empresa:
                        </span>
                        <br />{{ chamado.Empresa }}</DialogTitle
                      >
                      <DialogDescription>
                        <span class="text-zinc-400 text-[16px] font-bold"
                          >Titulo</span
                        >
                        <p>{{ chamado.titulo }}</p>
                      </DialogDescription>
                    </DialogHeader>
                    <div class="flex flex-col py-4">
                      <p>
                        <span class="text-zinc-400 font-bold"
                          >Funcionário:</span
                        >
                        {{ chamado.Cliente }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">sistema:</span>
                        {{ chamado.sistema }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Status:</span>
                        {{ chamado.status }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">prioridade:</span>
                        {{ chamado.prioridade }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Abertura:</span>
                        {{ chamado.dAbertura }}
                      </p>
                      <p>
                        <span class="text-zinc-400 font-bold">Fechamento:</span>
                        {{ chamado.dFechamento }}
                      </p>
                    </div>
                    <DialogFooter> </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div class="flex w-full items-center gap-2 mt-4 mb-4">
        <div v-if="!dialog" class="relative items-center w-70">
          <Input
            v-if="!dialog"
            id="search"
            type="text"
            placeholder="Buscar por empresas..."
            class="pl-10 bg-zinc-800 rounded-[12px] text-zinc-600 w-70 text-white"
            @input="filtrarPorEmpresa()"
            v-model="sBuscaEmpresa"
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2 text-zinc-600"
            ><i class="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        <div v-if="!dialog" class="flex flex-grid-2 gap-4">
          <div class="max-w-50">
            <popoverTeste
              dataTitulo="Data inicio"
              isStart="true"
              @dataInicio="recebeDatainicio"
              :limparDatas="limpardatas"
              @limpar-concluido="retornaLimparDatas"
            />
          </div>
          <div class="max-w-50">
            <popoverTeste
              v-if="!dialog"
              dataTitulo="Data Final"
              isStart="false"
              :limparDatas="limpardatas"
              @dataFim="recebeDataFim"
              @limpar-concluido="retornaLimparDatas"
            />
          </div>
        </div>
        <!--   <select
            v-model="sBuscaStatus"
            placeholder="Status solicitação"
            class="bg-zinc-900 w-48 border-2 border-white placeholder-white"
          >
            <option>aberto</option>
            <option>pendente</option>
            <option>fechado</option>
          </select> -->
        <Select v-if="!dialog" v-model="sBuscaStatus">
          <SelectTrigger class="w-48 ml-2 h-8 bg-zinc-900 rounded-[12px]">
            <span v-if="sBuscaStatus == ''">Status solicitação</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent class="bg-zinc-900 w-48 text-white">
            <SelectGroup>
              <SelectItem value="aberto"> Aberto </SelectItem>
              <SelectItem value="pendente"> Pendentes </SelectItem>
              <SelectItem value="fechado"> Fechado </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select v-if="!dialog" v-model="sBuscaSistemas">
          <SelectTrigger class="w-48 ml-2 h-8 bg-zinc-900 rounded-[12px]">
            <span v-if="sBuscaSistemas == ''">Sistemas</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent class="bg-zinc-900 w-48 text-white">
            <SelectGroup>
              <SelectItem c value="PDV"> PDV </SelectItem>
              <SelectItem c value="Emissor Nf-e"> Emissor Nf-e</SelectItem>
              <SelectItem c value="Back-office"> Back-office</SelectItem>
              <SelectItem c value="Etiquetas"> Etiquetas</SelectItem>
              <SelectItem c value="Financeiro"> Financeiro</SelectItem>
              <SelectItem c value="Pré-Venda Mobile">
                Pré-Venda Mobile</SelectItem
              >
              <SelectItem c value="ecommerce"> ecommerce</SelectItem>
              <SelectItem c value="laser Report"> laser Report</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          v-if="!dialog"
          class="bg-indigo-800 text-[10px] rounded-lg text-white w-12 hover:bg-indigo-600 shadow-zinc-400"
          @Click="filtrarPorStatus()"
        >
          Buscar</Button
        >
        <Button
          class="bg-indigo-800 text-[10px] rounded-lg text-white w-12 hover:bg-indigo-600 shadow-zinc-400"
          v-if="!dialog"
          @click="limpaFiltrosBusca()"
        >
          Limpar
        </Button>
      </div>
      <!--   <v-btn :elevation="12" class="mt-2">Filtrar</v-btn> -->
      <div
        class="flex flex-col justify-center items-center max-h-[26rem] bg-zinc-800 rounded-2xl"
      >
        <!-- <p v-if="!dialog" class="mt-4">Todos os chamados Recentes</p> -->
        <div class="flex items-center gap-10 w-full pl-12 min-h-12 text-[14px]">
          <p>Empresa</p>
          <p>Funcionário</p>
          <p>Sistema</p>
          <div class="flex pl-10 gap-16">
            <p>Data</p>
            <p>Status</p>
            <p>Ações</p>
          </div>
        </div>
        <tabela
          class=""
          v-if="!dialog && listaPronta"
          @editar="abrirModalEditar"
          :listaFiltrada="novaLista"
          :itensTabela="itensChamado"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import popoverTeste from '../components/popoverTeste.vue'
import tabela from '../components/tabela.vue'

import { Card, CardContent } from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

/* import axios from 'axios' */
import HeaderVoltar from '../components/HeaderVoltar.vue'
import { onMounted, ref } from 'vue'
/* import { watch } from 'vue' */
/* import { toast } from 'vue3-toastify' */
import 'vue3-toastify/dist/index.css'

import ModalAddChamado from '../components/ModalAddChamado.vue'
/* import TabelaChamados from '../components/TabelaChamados.vue' */
import { useRoute } from 'vue-router'
import { router } from '../router'
import retornaNumberStatus from '../utils/formatStatus.ts'
import {
  postChamado,
  atualizarChamado,
  getChamadosPorData,
  getChamadosDiaAtual
} from '../services/RequestsChamados.ts'
import { Button } from '../components/ui/button'
import { Input } from '@/components/ui/input'

import { toast } from 'vue3-toastify'
import { useStore } from 'vuex'
import axios from 'axios'
import { format } from 'date-fns'
import formatText from '@/utils/formartText.ts'
import { getStatusflag } from '@/utils/coresDiv.ts'

interface Chamado {
  Analista: string
  Cliente: string
  Empresa: string
  clienteId: number
  dAbertura: string
  dFechamento: string
  descricao: string
  id: number
  prioridade: string
  redeId: number
  sistema: string
  status: string
  statusChamadoAtual: number
  titulo: string
  usuarioId: number
}

const route = useRoute()
const emit = defineEmits()
const dialog = ref(false)
const limpardatas = ref(false)
const titlepage = ref('Administração Rápida de Chamados')
const abrirChamado = ref()
const manipulaEstadoDaTabela = ref(false)
const idRede = ref<number>()
const idUser = ref<number>()
const itemEditar = ref()
const novoChamado = ref<number>()
const store = useStore()

const listaChamadoPrioridade = ref<Chamado[]>([])
const listaChamadoAberto = ref<Chamado[]>([])
const listaChamadoFechado = ref<Chamado[]>([])
const listaChamadoPendente = ref<Chamado[]>([])
const listaPendentes = ref<Chamado[]>([])
let openModalPrioridade = ref<boolean>(false)
const chamadoSelecionado = ref()
const dateStart = ref<Date>()
const dateEnd = ref<Date>()
const _listaFiltrada = ref<unknown[]>([])
const _listaChamadosDiaAtual = ref<[]>([])
const recarregar = ref<Boolean>(false)

const sBuscaEmpresa = ref<string>('')
const sBuscaStatus = ref<string>('')
const sBuscaSistemas = ref<string>('')

const listaResultado = ref<Chamado[]>([])
const itensChamado = ref<Chamado[]>([])
const novaLista = ref<Chamado[]>([])
const mensagem = ref<Boolean>(false)
const listaPronta = ref<Boolean>(false)
const user = ref(route.params.user)
const chamadosPDV = ref<Chamado[]>([])
const chamadosRetaguarda = ref<Chamado[]>([])
const chamadosEcommerce = ref<Chamado[]>([])
const chamadosEmissor = ref<Chamado[]>([])
const chamadosEtiquetas = ref<Chamado[]>([])
const chamadosPreVenda = ref<Chamado[]>([])

/* const chamadosfinanceiro = ref<Chamado[]>([]) */

onMounted(() => {
  const route = useRoute()
  console.log(import.meta.env.VITE_IP_URL)

  retornaChamadosIgualDiaAtual()
  obterDadosTratadosChamado()

  obterDadosAuthLogin()

  abrirChamado.value = route.query.abrirModal

  if (parseInt(abrirChamado.value) === 1) {
    dialog.value = true
  }
})

/* watch(
  () => recarregar.value,
  (newValue, oldValue) => {
    if (newValue === true) {
      // Chamar a função para obter os dados dos formulários
      retornaChamadosIgualDiaAtual()
      console.log('cai no case')
    }
  }
) */

const limpaFiltrosBusca = () => {
  obterDadosTratadosChamado()
  sBuscaStatus.value = ''

  sBuscaSistemas.value = ''
  limpardatas.value = true
  _listaFiltrada.value = []

  /*  if (sBuscaStatus.value) {
    sBuscaStatus.value = undefined
    obterDadosTratadosChamado()
    console.log(sBuscaStatus.value, 'depois do if ')
  } */
}
const retornaLimparDatas = () => {
  limpardatas.value = false
}

const atualizarStatusFechado = async (item: any) => {
  const data = {
    id: item.id,
    statusChamadoAtual: 3
  }
  await atualizarChamado(data)
  notifyAtualizachamado()
  obterDadosTratadosChamado()
  retornaChamadosIgualDiaAtual()

  /* console.log(response) */
}
const retornaChamadosIgualDiaAtual = async () => {
  const storedData = localStorage.getItem('user')

  if (storedData) {
    const parsedData = JSON.parse(storedData)
    const id = parsedData.id
    const response = await getChamadosDiaAtual(id)
    try {
      const responseClientes = await axios.get(
        `http://${import.meta.env.VITE_IP_URL}:3000/clientes`
      )
      /* const responseChamados = await axios.get(
      `http://localhost:3000/servicos/user/${idUser.value}`
    )  */ // refatorar aqui promisse allslteld
      const responseUser = await axios.get(
        `http://${import.meta.env.VITE_IP_URL}:3000/user-login`
      )

      const listaClientes = responseClientes.data
      const listaChamados = response.data
      const listaAnalista = responseUser.data

      if (
        listaChamados.length > 0 &&
        listaClientes.length > 0 &&
        listaAnalista.length > 0
      ) {
        _listaChamadosDiaAtual.value = listaChamados.map((chamado: any) => {
          const clienteCorrespondente = listaClientes.find(
            (cliente: any) => cliente.id === chamado.clienteId
          )
          const AnalistaCorrespondente = listaAnalista.find((analista: any) => {
            return analista.Id === chamado.usuarioId
          })

          return {
            ...chamado,
            Analista: AnalistaCorrespondente
              ? AnalistaCorrespondente.nameUser
              : 'nada',
            Empresa: clienteCorrespondente
              ? clienteCorrespondente.empresa
              : 'N/A',
            Cliente: clienteCorrespondente ? clienteCorrespondente.nome : 'n/a',
            status: getStatusText(chamado.statusChamadoAtual),
            dAbertura: formatarData(chamado.dAbertura)
          }
        })
        filtrarChamadosAbertos()
        filtrarChamadosPendentes()
        filtrarChamadosFechados()
      } else {
        console.log('lista vazia ')
        return []
      }
    } catch (error) {
      console.error('Erro ao obter dados:', error)
      return []
    }
  }
}

const formatarData = (data: any) => {
  const dataFormatada = format(new Date(data), 'dd/MM/yyyy')
  return dataFormatada
}

const getStatusText = (status: number): string => {
  switch (status) {
    case 1:
      return 'aberto'
    case 2:
      return 'pendente'
    case 3:
      return 'fechado'
    default:
      return 'Desconhecido'
  }
}

const filtrarPorEmpresa = () => {
  console.log(sBuscaEmpresa.value, 'chamei')
  if (listaResultado.value.length > 0 && sBuscaEmpresa.value) {
    novaLista.value = listaResultado.value.filter(
      (chamado: any) => chamado.Empresa.toLowerCase() === sBuscaEmpresa.value
    )
    console.log('novalista', novaLista.value)
  } else {
    novaLista.value = listaResultado.value
  }
}

const filtrarPorStatus = () => {
  console.log(sBuscaStatus.value, sBuscaSistemas.value, 'chamei aqui novo')
  if (sBuscaStatus.value && sBuscaSistemas.value === '') {
    if (listaResultado.value.length > 0 && sBuscaStatus.value) {
      novaLista.value = listaResultado.value.filter(
        (chamado: any) =>
          chamado.status.toLowerCase() === sBuscaStatus.value.toString()
      )
      console.log('novalista', novaLista.value)
    } else {
      novaLista.value = listaResultado.value
    }
  } else if (sBuscaSistemas.value && sBuscaStatus.value === '') {
    console.log('buscando por sistemas', sBuscaSistemas.value)
    if (listaResultado.value.length > 0 && sBuscaSistemas.value) {
      novaLista.value = listaResultado.value.filter(
        (chamado: any) => chamado.sistema === sBuscaSistemas.value.toString()
      )
      console.log('novalista', novaLista.value)
    } else {
      novaLista.value = listaResultado.value
    }
  } else if (sBuscaSistemas.value !== '' && sBuscaStatus.value !== '') {
    if (listaResultado.value.length > 0) {
      novaLista.value = listaResultado.value.filter(
        (chamado: any) =>
          chamado.sistema === sBuscaSistemas.value.toString() &&
          chamado.status === sBuscaStatus.value.toString()
      )
    } else {
      novaLista.value = listaResultado.value
    }
  } else {
    console.log('deu merda')
  }
}

/* if (listaResultado.value.length > 0 && sBuscaStatus.value) {
    novaLista.value = listaResultado.value.filter(
      (chamado: any) => chamado.status.toLowerCase() === sBuscaStatus.value
    )

    console.log(sBuscaStatus.value)
  } else {
    novaLista.value = listaResultado.value
  } */

const filtrarChamadosAbertos = () => {
  if (_listaChamadosDiaAtual.value.length > 0) {
    listaChamadoAberto.value = _listaChamadosDiaAtual.value.filter(
      (chamado: any) =>
        chamado.status === 'aberto' || chamado.statusChamadoAtual === 1
    )
  }
}
const filtrarChamadosPendentes = () => {
  if (_listaChamadosDiaAtual.value.length > 0) {
    listaChamadoPendente.value = _listaChamadosDiaAtual.value.filter(
      (chamado: any) =>
        chamado.status === 'pendente' || chamado.statusChamadoAtual === 2
    )
  }
}
const filtrarChamadosFechados = () => {
  if (_listaChamadosDiaAtual.value.length > 0) {
    listaChamadoFechado.value = _listaChamadosDiaAtual.value.filter(
      (chamado: any) =>
        chamado.status === 'fechado' || chamado.statusChamadoAtual === 3
    )
  }
}

const recebeDatainicio = (dataInicio: Date) => {
  dateStart.value = dataInicio
  filtrarPorDatas()
}

const recebeDataFim = (dataFim: Date) => {
  dateEnd.value = dataFim
  filtrarPorDatas()
}
const filtrarPorDatas = async () => {
  if (dateStart.value && dateEnd.value) {
    const storedData = localStorage.getItem('user')

    if (storedData) {
      const parsedData = JSON.parse(storedData)
      const id = parsedData.id
      const response = await getChamadosPorData(
        id,
        dateStart.value,
        dateEnd.value
      )
      _listaFiltrada.value = response.data

      chamadosFiltrados()
    }
  } else {
    console.log('case sem datas preenchidas ')
  }
}

const obterDadosTratadosChamado = async () => {
  try {
    const responseClientes = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/clientes`
    )
    const responseChamados = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/servicos/user/${idUser.value}`
    ) // refatorar aqui promisse allslteld
    const responseUser = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/user-login`
    )

    const listaClientes = responseClientes.data
    const listaChamados = responseChamados.data
    const listaAnalista = responseUser.data

    if (listaClientes.length > 0 && listaChamados.length > 0) {
      listaResultado.value = listaChamados.map((chamado: any) => {
        const clienteCorrespondente = listaClientes.find(
          (cliente: any) => cliente.id === chamado.clienteId
        )
        const AnalistaCorrespondente = listaAnalista.find((analista: any) => {
          return analista.Id === chamado.usuarioId
        })

        return {
          ...chamado,
          Analista: AnalistaCorrespondente
            ? AnalistaCorrespondente.nameUser
            : 'nada',
          Empresa: clienteCorrespondente
            ? clienteCorrespondente.empresa
            : 'N/A',
          Cliente: clienteCorrespondente ? clienteCorrespondente.nome : 'n/a',
          status: getStatusText(chamado.statusChamadoAtual),
          dAbertura: formatarData(chamado.dAbertura)
        }
      })

      listaPrioridadeChamado()
      if (listaResultado.value.length > 0) {
        itensChamado.value = listaResultado.value
        listaPronta.value = true

        if (itensChamado.value.length > 0) {
          TotalChamadosPDV()
          TotalChamadosRetaguarda()
          TotalChamadosEcommerce()
          TotalChamadosEmissor()
          TotalChamadosEtiquetas()
          TotalChamadosPreVenda()
          listaChamadosPendentes()
        }
      }

      /*   emit('allChamado', listaResultado.value)
      recarregar.value = false */
    } else {
      console.log('lista vazia ')
      return []
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error)
    return []
  }
}

const chamadosFiltrados = async () => {
  try {
    const responseClientes = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/clientes`
    )
    /* const responseChamados = await axios.get(
      `http://localhost:3000/servicos/user/${idUser.value}`
    )  */ // refatorar aqui promisse allslteld
    const responseUser = await axios.get(
      `http://${import.meta.env.VITE_IP_URL}:3000/user-login`
    )

    const listaClientes = responseClientes.data
    const listaChamados = _listaFiltrada.value
    const listaAnalista = responseUser.data

    if (listaClientes.length > 0 && _listaFiltrada.value.length > 0) {
      listaResultado.value = listaChamados.map((chamado: any) => {
        const clienteCorrespondente = listaClientes.find(
          (cliente: any) => cliente.id === chamado.clienteId
        )
        const AnalistaCorrespondente = listaAnalista.find((analista: any) => {
          return analista.Id === chamado.usuarioId
        })

        return {
          ...chamado,
          Analista: AnalistaCorrespondente
            ? AnalistaCorrespondente.nameUser
            : 'nada',
          Empresa: clienteCorrespondente
            ? clienteCorrespondente.empresa
            : 'N/A',
          Cliente: clienteCorrespondente ? clienteCorrespondente.nome : 'n/a',
          status: getStatusText(chamado.statusChamadoAtual),
          dAbertura: formatarData(chamado.dAbertura)
        }
      })

      if (listaResultado.value.length > 0) {
        novaLista.value = listaResultado.value
      }
    } else {
      console.log('lista vazia ')
      return []
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error)
    return []
  }
}

const abrirCardsPrioridade = (item: any) => {
  openModalPrioridade.value = true
  chamadoSelecionado.value = item
}

const obterDadosFormularios = (item: any) => {
  const statusNumber = retornaNumberStatus(item.statusChamadoString)

  if (item.id) {
    if (statusNumber === 3) {
      const data = {
        ...item,

        dFechamento: new Date(),
        statusChamadoAtual: statusNumber
      }
      const { statusChamadoString, nomeCliente, empresa, ...dataFormat } = data

      submitAtualizarChamado(dataFormat)
    } else {
      const data = {
        ...item,

        statusChamadoAtual: statusNumber
      }
      const {
        statusChamadoString,
        nomeCliente,
        empresa,
        usuarioId,
        redeId,
        ...dataFormat
      } = data

      submitAtualizarChamado(dataFormat)
    }
  } else {
    const data = {
      ...item,
      dAbertura: new Date(),
      dFechamento: new Date(),
      statusChamadoAtual: statusNumber
    }
    const { statusChamadoString, nomeCliente, empresa, ...dataFormat } = data

    submitChamado(dataFormat)
  }
}

const submitAtualizarChamado = async (data: any) => {
  const response = await atualizarChamado(data)
  notifyAtualizachamado()
  fecharModal()
  obterDadosTratadosChamado()
  retornaChamadosIgualDiaAtual()
  mensagem.value = true
  recarregar.value = true
  store.commit('limpaChamado')

  store.commit('limpaCliente')
  store.commit('limpaValores')

  return console.log(response)

  /*  if (data) {
    const response = await atualizaChamado(data)
    return console.log(response)
  }
  return */
}

const submitChamado = async (data: any) => {
  try {
    const response = await postChamado(data)
    store.commit('limpaChamado')
    store.commit('limpaCliente')
    store.commit('limpaValores')
    fecharModal()
    mensagem.value = true
    recarregar.value = true
    notifyAddchamado()
    obterDadosTratadosChamado()
    retornaChamadosIgualDiaAtual()
    return console.log(response)
  } catch (error) {
    return console.log('error ao enviar form', error)
  }
}

const escolherCliente = (item: any) => {
  router.push({
    name: 'ConsultaDeCliente',
    params: { user: user.value }
  })
  store.dispatch('salvaValores', item)
}
const abrirModalEditar = (item: any) => {
  dialog.value = true

  itemEditar.value = item
  novoChamado.value = 1
}

const abrirModal = () => {
  dialog.value = true
  itemEditar.value = undefined
}
const fecharModal = () => {
  dialog.value = false
}
const obterDadosAuthLogin = () => {
  const dadosLogin = localStorage.getItem('user')
  if (dadosLogin) {
    const dadosJson = JSON.parse(dadosLogin)
    idUser.value = parseInt(dadosJson.id)
    idRede.value = parseInt(dadosJson.rede)
  }
}

const handleChamadoAdicionado = () => {
  // Propagar o evento para o componente filho (TabelaChamados)
  /* const tabelaChamadosComponent = ref('tabelaChamados').value;
  tabelaChamadosComponent && tabelaChamadosComponent.handleChamadoAdicionado(); */

  manipulaEstadoDaTabela.value = true
}

const notifyAddchamado = () => {
  toast('Chamado adicionado com sucesso', {
    autoClose: 1000
  })
}

const notifyAtualizachamado = () => {
  toast('Atualizado com sucesso', {
    autoClose: 1000
  })
}

const listaPrioridadeChamado = () => {
  if (listaResultado.value.length > 0) {
    listaChamadoPrioridade.value = listaResultado.value.filter(
      (chamado) =>
        chamado.prioridade === 'Alta' && chamado.statusChamadoAtual != 3
    )
  }
}

const listaChamadosPendentes = () => {
  if (listaResultado.value.length > 0) {
    listaPendentes.value = listaResultado.value.filter(
      (chamado) => chamado.statusChamadoAtual == 2
    )
  }
}
const totalChamadosAlta = () => {
  if (itensChamado.value.length) {
    const chamadosAlta = listaResultado.value.filter(
      (chamado) => chamado.prioridade === 'Alta'
    )
    return chamadosAlta.length
  }
}
const totalChamadosBaixa = () => {
  if (itensChamado.value.length) {
    const chamadosAlta = listaResultado.value.filter(
      (chamado) => chamado.prioridade === 'Baixa'
    )
    return chamadosAlta.length
  }
}

const totalChamadosMedia = () => {
  if (itensChamado.value.length) {
    const chamadosAlta = listaResultado.value.filter(
      (chamado) => chamado.prioridade === 'Media'
    )
    return chamadosAlta.length
  }
}

const TotalChamadosPDV = () => {
  if (itensChamado.value.length) {
    chamadosPDV.value = listaResultado.value.filter(
      (chamado) => chamado.sistema === 'PDV'
    )
  }
}

const TotalChamadosRetaguarda = () => {
  if (itensChamado.value.length) {
    chamadosRetaguarda.value = listaResultado.value.filter(
      (chamado) => chamado.sistema === 'Back-office'
    )
  }
}

const TotalChamadosEcommerce = () => {
  if (itensChamado.value.length) {
    chamadosEcommerce.value = listaResultado.value.filter(
      (chamado) => chamado.sistema === 'ecommerce'
    )
  }
}

const TotalChamadosEmissor = () => {
  if (itensChamado.value.length) {
    chamadosEmissor.value = listaResultado.value.filter(
      (chamado) => chamado.sistema === 'Emissor Nf-e'
    )
  }
}

const TotalChamadosEtiquetas = () => {
  if (itensChamado.value.length) {
    chamadosEtiquetas.value = listaResultado.value.filter(
      (chamado) => chamado.sistema === 'Etiquetas'
    )
  }
}

const TotalChamadosPreVenda = () => {
  if (itensChamado.value.length) {
    chamadosPreVenda.value = listaResultado.value.filter(
      (chamado) => chamado.sistema === 'Pré-Venda Mobile'
    )
  }
}
</script>

<style scoped>
.body {
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;

  display: flex;
}
.body-left {
  width: 50%;
  color: white;
  max-height: 88vh;
  margin-top: 1%;

  display: flex;
  flex-direction: column;
}
.cards {
  display: flex;
  justify-content: space-around;
  margin-top: 8px;

  min-height: 88%;
  max-height: 100%;
  width: 100%;
  overflow-y: auto !important;
}
.titulo-box {
  position: sticky;
  top: 0;
  background-color: #3f51b5;
  width: 100%;
  /* Opcional: cor de fundo para tornar o texto mais visível */
  z-index: 1; /* Garante que o texto esteja acima dos elementos abaixo */
  text-align: center;
  border-radius: 8px;
  box-shadow: 100px;
}
.itens {
  width: 100%;

  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: auto !important;
  height: 100%;
}
.itens::-webkit-scrollbar {
  width: 8px;
}

.itens::-webkit-scrollbar-track {
  background: #19181f;
}
.itens::-webkit-scrollbar-thumb {
  background-color: rgb(81, 76, 85); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  /* creates padding around scroll thumb */
}
.card-customize {
  box-shadow: 0px 4px 6px rgb(54, 0, 92);
  width: 80%;
  margin: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 20%;
}
.aside {
  width: 100%;
  border: solid 2px;
  border-color: white;
}
.body-right {
  color: white;

  width: 50%;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
}

.text-card {
  color: white;
  font-size: 12px;
}
.container-acoes {
  width: 100%;

  height: 100vh;
  display: flex;
  flex-direction: column;

  align-items: center;
}
.container-prioridade {
  height: 26vh;

  display: flex;
  min-width: 100%;
  margin-top: 1%;
  display: flex;
}

.btn-chamado {
  width: 50%;
  min-height: 30%;
  right: 10%;
}
#table {
  overflow-x: hidden !important;
  border-radius: 24px;
}
#table::-webkit-scrollbar {
  width: 8px;
}

#table::-webkit-scrollbar-track {
  background: #19181f;
}
#table::-webkit-scrollbar-thumb {
  background-color: rgb(62, 34, 185); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  /* creates padding around scroll thumb */
}

/* .ModalAdicionarServiço {
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
} */
.ModalPage {
  height: 80vh !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  min-width: 100% !important;
  left: 50%;

  position: relative;
}
</style>

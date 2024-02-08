// store/index.js
import { createStore } from "vuex";
import { useStore } from "vuex";

const store = createStore({
  state() {
    return {
      // Seu estado inicial aqui
      cliente: null,
      chamado: null,
      valores: null,
    };
  },
  mutations: {
    // Suas mutações aqui --> armazena o estado
    selecionaCliente(state, clientenovo) {
      state.cliente = clientenovo;
    },

    limpaCliente(state) {
      state.cliente = null;
    },
    estadoChamado(state, chamadonovo) {
      state.chamado = chamadonovo;
      console.log("chamou", state.chamado);
    },
    limpaChamado(state) {
      state.chamado = null;
    },

    novoChamadoRecuperaValores(state, valoresForm) {
      state.valores = valoresForm;
      console.log(valoresForm, "salvei o estado");
    },

    limpaValores(state) {
      state.valores = null;
    },
  },
  actions: {
    // Suas ações aqui --> dá um set no estado , igual react state e set
    atualizarCliente({ commit }, novoCliente) {
      commit("selecionaCliente", novoCliente);
    },
    atualizaChamado({ commit }, novoChamado) {
      commit("estadoChamado", novoChamado);
    },

    salvaValores({ commit }, valores) {
      commit("novoChamadoRecuperaValores", valores);
    },
  },
  getters: {
    // Seus getters aqui
    obterCliente: (state) => state.cliente,
    recuperarChamado: (state) => state.chamado,
    recuperarValoresForm: (state) => state.valores,
  },
});

export default store;

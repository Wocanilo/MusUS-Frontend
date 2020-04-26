import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import account from '@/store/account'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [
      {
        id: 1,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 1",
        description: "Prueba"
      },
      {
        id: 2,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 3,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 4,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 5,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 6,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 7,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 8,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 9,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 10,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 11,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      },
      {
        id: 12,
        pictureUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        title: "Prueba 2",
        description: "Prueba"
      }
    ],
    config: {
      apiBaseUrl: "http://api.musus.wocat.xyz:8080/"
    }
  },
  mutations: {
    // Update cards with real data
    changeCards(state, data){
      state.cards = data;
    }
  },
  actions: {},
  modules: {account},
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
});

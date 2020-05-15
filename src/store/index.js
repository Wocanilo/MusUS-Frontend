import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import account from '@/store/account'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      apiBaseUrl: "https://api.musus.wocat.xyz/"
    }
  },
  mutations: {},
  actions: {},
  modules: {account},
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
});

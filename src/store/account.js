const state = {
    isLoggedIn: false
  };
  
  const mutations = {
    logout(state) {
      state.isLoggedIn = false;
    },
    login(state) {
      state.isLoggedIn = true;
    }
  };
  
  export default {
    state,
    mutations
  }
  
export default {
    state: {
      loggedIn:false,
      user:{},
    },
    getters: {
      isLoggedIn(state){
        return state.loggedIn;
      },
      currentUser(state){
        return state.user;
      }
    },
    mutations: {
      SET_USER(state,payload){
          state.loggedIn = true;
          state.user = payload;
      },
      REMOVE_USER(state){
        state.loggedIn = false;
        state.user = { };
      }
    },
    actions: {},
  }
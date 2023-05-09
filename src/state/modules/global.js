import axios from "axios";
export default {
    state: {
      config:{}
    },
    getters: {
        courses(state){
          return state.config.courses;
        },
        questionTypes(state){
          return state.config.question_types;
        }
    },
    mutations: {
      SET_CONFIG(state,payload){
         state.config = payload
      }
    },
    actions: {
      async setConfig({commit}){
        let response = await axios.get('config');
        let data = await response.data;
        if(data.statusCode == 200){
          commit('SET_CONFIG',data.data);
        }
      }
    },
}
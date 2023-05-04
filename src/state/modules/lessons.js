export default {
  state: {
    lessons:[],
    lessonsSelect:[]
  },
  getters: {},
  mutations: {
    SET_LESSONS : (state,lessons) => {
        state.lessons = lessons,
        lessons.forEach(lesson => {
          state.lessonsSelect.push({
            name:lesson.title,
            code :lesson.id,
           })  
        });
    }
  },
  actions: {
      setLessons({commit},payload){
        commit('SET_LESSONS',payload)
      }
  },
}
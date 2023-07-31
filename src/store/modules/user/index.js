import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  namespaced: true,
  state(){
    return {
      //isUser: false, alternativa a getters isUser
      user: {
        accounts:[]
      }
    }
  },
  mutations,
  actions,
  getters
};
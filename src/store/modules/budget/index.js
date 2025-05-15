import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  namespaced: true,
  state(){
    return {
       budgetName: null,
       budgets: [],
       accountGroups: [],
       categories:[],
       isLoading: false, 
       //totalMoneyAvailable: 0, // Total dinero disponible
       debitBalance: 0,       // Balance de crédito
       moneyAllocated: 0       // Dinero asignado
    };
  },
  mutations,
  actions,
  getters
};
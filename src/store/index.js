import { createStore } from 'vuex';

import userModule from './modules/user/index.js';
import budgetModule from './modules/budget/index.js';
import targetModule from './modules/targets/index.js';
import authModule from './modules/auth/index.js'

const store = createStore({
   modules: {
      user: userModule,
      budget: budgetModule,
      targets: targetModule,
      auth: authModule
   },
    state() {
     return {
        userId:'c3',
        isLoggedIn: false
     };
    },
    getters: {
      userId(state){
         return state.userId;
      }
    },
    mutations: {
       setAuth(state, payload){
          state.isLoggedIn = payload.isAuth;
       }
    },
    actions: {
       login(context){
           context.commit('setAuth', {isAuth:true});
       },
       logout(context){
           context.commit('setAuth', {isAuth:false});
       }
    }
 });
 
 export default store;
import { createRouter, createWebHistory } from 'vue-router';
import SignUpForm from './pages/user/SignUpForm.vue';
import Budget from './pages/budget/Budget.vue';
import ViewBudgets from './pages/budget/ViewBudgets.vue';
import SignInForm from './pages/user/SignInForm.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/',  redirect:SignInForm },
      //{ path: '/auth', component:UserAuth },
      { path: '/users/sign_up', component:SignUpForm,  meta: { requiresUnauth: true } },
      { path: '/users/sign_in', component:SignInForm, meta: { requiresUnauth: true } },
      { path: '/budget', component:Budget, meta: { requiresAuth: true }},
      { path: '/budget/:budgetId', component:Budget, meta: { requiresAuth: true }},
      { path: '/budgets', component:ViewBudgets, meta: { requiresAuth: true } },
      { payh: '/:notFound(.*)', redirect: '/users/sign_in'}
    ]   
});

router.beforeEach(function(to, _, next){
   if(to.meta.requiresAuth && !store.getters.isAuthenticated){
      next('/users/sign_in');
   } else if(to.meta.requiresUnauth && store.getters.isAuthenticated ){
      next('/budget');
   }else {
      next();
   }
})

export default router;
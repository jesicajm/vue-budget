export default {
    budgetLogin(state){
        return state.budgets[0];
    },
    userBudgets(state){
        return state.budgets;
    },
    budgetAccountGroup(state, getters, rootState, rootGetters){
        const userId = rootGetters.user;
        console.log('from getters budget'+ userId)
        return state.budgets.find(budget => budget.userId === userId).accountGroup;
    },
    hasBudget(state){
        //const userId = rootGetters.user;
        //return state.budgets.some(budget => budget.userId === userId);
        return state.budgets.length > 0;
    }
};
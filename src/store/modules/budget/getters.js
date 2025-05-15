export default {
    budgetLogin(state){
        return state.budgets[0];
    },
    userBudgets(state){
        return state.budgets;
    },
    budgetName(state){
        console.log(state.budgetName)
        return state.budgetName;
    },
    budgetId(state){
        return state.state.budgets[0].id
    },
    accountGroups:(state) => (budgetName) => {
        // const userId = rootGetters.user;
        // console.log('from getters budget'+ userId)
        return state.accountGroups.filter(accountGroup => accountGroup.budgetName === budgetName)
    },
    categoriesByGroup: (state) => (groupName) => {
        console.log('categorias', state.categories)
        return state.categories.filter(category => category.groupName === groupName);
    },
    categories(state){
        return state.categories;
    },
    hasBudget(state){
        //const userId = rootGetters.user;
        //return state.budgets.some(budget => budget.userId === userId);
        return state.budgets.length > 0;
    },
    debitBalance(state){
        return state.debitBalance;
    },
    moneyAllocated(state){
        return state.moneyAllocated;
    },
    totalMoneyAvailable(state, getters) { 
        return getters.debitBalance - getters.moneyAllocated;
    },
    accountGroup(state) {
        return state.accountGroup;
    }
};
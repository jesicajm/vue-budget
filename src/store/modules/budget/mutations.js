export default {
   setBudgets(state, payload){
      state.budgets = payload;
  },
  setLoading(state, isLoading) {
   state.isLoading = isLoading;
  },
   updateBudgetName(state, payload){
      state.budgetName = payload;
   },
   updateBudgets(state, payload){
      state.budgets.push(payload.budget); 
   },
   updateAccountGroups(state, payload){
      state.accountGroups = [...payload.accountGroups];
   },
   updateCategories(state, payload){
      state.categories = [...payload.categories];
   },
   addCategory(state, payload){
      state.budgets.find(budget => budget.id === payload.idBudget).accountGroup.find(account => account.type === payload.nameAccount).categories.push({name:payload.category, assigned: 0, activity:0, available: 0});
   },
   updateCategory(state, payload){
      let acccount = state.budgets.find(budget => budget.id === payload.idBudget).accountGroup.find(account => account.type === payload.nameAccount);
      let indexCategory = acccount.categories.findIndex(category => category.name === payload.category);
      acccount.categories[indexCategory].name = payload.renameCategory;
   },
   updateAssignedCategory(state, payload){
      let acccount = state.budgets.find(budget => budget.id === payload.idBudget).accountGroup.find(account => account.type === payload.nameAccount);
      let indexCategory = acccount.categories.findIndex(category => category.name === payload.nameCategory);
      acccount.categories[indexCategory].assigned = payload.updateAssignedCategory; 
      acccount.categories[indexCategory].available = payload.updateAvailableCategory; 
   },
   deleteCategory(state, payload){
      let acccount = state.budgets.find(budget => budget.userId === payload.userId && budget.id === payload.idBudget).accountGroup.find(account => account.type === payload.nameAccount);
      acccount.categories = acccount.categories.filter(category => category.name !== payload.category);
   },
   addAccount(state, payload){
      const newAccount = {
         type: payload.nameAccount,
         categories:[]
      };
      state.budgets.find(budget => budget.id === payload.idBudget).accountGroup.unshift(newAccount);
   },
   // setBudgets(state, payload){
   //    state.budgets = payload;
   // },
   deleteAccount(state, payload){
      let budget = state.budgets.find(budget => budget.id === payload.idBudget);
      let acccountIndex = budget.accountGroup.findIndex(account => account.type === payload.nameAccount);
      budget.accountGroup.splice(acccountIndex,1);
   },
   updateAccount(state, payload){
      let account = state.budgets.find(budget => budget.id === payload.idBudget).accountGroup.find(account => account.type === payload.nameAccount);    
      account.type = payload.renameAccount;  
   },
   deletBudget(state, payload){
      state.budgets = state.budgets.filter(budget => budget.id !== payload)
   },
   setMoneyAllocated(state, value) {
      state.moneyAllocated = value;
    },
    setDebitBalance(state, balance) {
      state.debitBalance = balance;
    },
   /* setTotalMoneyAvailable(state, value) {
      state.totalMoneyAvailable = value;
    }*/
   setAccountGroup(state, accountGroup) {
      state.accountGroup = accountGroup;
      console.log('desde mutations setAccountGroup', state.accountGroup);
   },
   updateMoneyAllocated(state, valueAssigned){
      state.moneyAllocated += valueAssigned;
   },
   updateDebitBalance(state, valueDebitBalance){
      state.debitBalance += valueDebitBalance;
   }
};
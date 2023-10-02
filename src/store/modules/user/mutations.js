export default {
    registerUser(state, payload){
        state.user.accounts.push(payload);
    },
    setUser(state, payload){
        state.user = payload
    },
    updateAccount(state, payload){
        const account = state.user.accounts.find(account => account.accountName === payload.accountName);
        account.transactions =  payload.transactions;
        account.accountBalance = payload.accountBalance;
    }
};
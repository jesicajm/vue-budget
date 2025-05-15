export default {
    registerUser(state, payload){
        state.user.accounts.push(payload);
    },
    setUser(state, payload){
        state.user = payload;
    },
    updateAccount(state, payload){
        state.user.accounts = [payload];
    },
    addTransaction(state, payload){
        const account = state.user.accounts.find(account => account.accountName.toLowerCase() === payload.accountName.toLowerCase())
        account.unshift(payload);
    }
};
export default {
    registerUser(state, payload){
        state.user.accounts.push(payload);
    },
    setUser(state, payload){
        state.user = payload
    }
};
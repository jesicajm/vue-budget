export default {
    user(state){
        return state.userId;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token;
    }
}
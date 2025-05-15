export default {
    user(state){
        return state.userId;
    },
    emailUser(state){
        return  state.email;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token;
    }
}
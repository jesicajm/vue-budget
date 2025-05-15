export default {
    setUser(state, payload){
       state.token = payload.token
       //state.refreshToken = payload.refreshToken
       state.tokenExpiration = payload.tokenExpiration
       state.userId = payload.userId
       state.email = payload.email
    }
}

//import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword/*, onAuthStateChanged*/} from "firebase/auth";

export default {
    async login(context, payload){
        /*const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgHk2IztRnedBlCQqe5-hafiA-XIcBnKA',{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })     
        });

        const responseData = await response.json();*/

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
        const user = userCredential.user;
        console.log(user.uid)
        console.log(user.accessToken)

        /*if(!response.ok){
            console.log(responseData);
            const error = new Error(responseData.message || 'Failded to authenticate')
            throw error;
        }*/

        /*const auth = getAuth();
        signInWithCustomToken(auth, token)
            .then((userCredential) => {
               // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
             // ...
        });*/

        //console.log(responseData);
 
      //  localStorage.setItem('token', user.accessToken);
       // localStorage.setItem('userId', user.uid);

        context.commit('setUser', {
           token: user.accessToken,
           userId: user.uid
           //tokenExpiration: responseData.expiresIn,
        });

    },
    async signup(context, payload){
        /*const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgHk2IztRnedBlCQqe5-hafiA-XIcBnKA',{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
            
        });*/

        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
            
        const user = userCredential.user;
        console.log(user.uid)
        //console.log(user.accessToken)                    
          
      
        /*.catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
          // ..
        });*/


        /*const responseData = await response.json();

        if(!response.ok){
            console.log(responseData);
            const error = new Error(responseData.message || 'Failded to authenticate')
            throw error;
        }

        console.log(responseData);*/

       // localStorage.setItem('token', user.accessToken);
        //localStorage.setItem('userId', user.uid);
 
        context.commit('setUser', {
           token: user.accessToken,
           userId: user.uid,
           email: payload.email
           //tokenExpiration: responseData.expiresIn,
        });

    },
    autoLogin(context){
       const token = localStorage.getItem('token');
       const userId = localStorage.getItem('userId');

       if(token && userId){
           context.commit('setUser', {
               token: token,
               userId: userId
           });
       }
    }
}
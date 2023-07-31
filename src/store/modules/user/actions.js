import db from "../../../main";
import { /*collection, addDoc,*/ doc, setDoc, getDoc } from "firebase/firestore";

export default {
    async userAccountRegistration(context,payload){
        const userId = context.rootGetters.user;
        
        const account = {
            [payload.accountName]: { accountBalance: payload.accountBalance,
                                     accountType: payload.accountType } 
        }

        /*const user = {
           [ payload.budgetId ]: { accounts: {[ payload.accountType ]: account }}
        };*/

        const docRef = doc(db, "users", userId, payload.budgetId, "accounts");
        await setDoc(docRef, account, { merge: true });

        //await setDoc(doc(db, docRef), account, { merge: true });
        //const responseData = await response.json();
        /*if(!response.ok){
            //
        }*/

        context.commit('registerUser', {
            accountBalance: payload.accountBalance,
            accountType: payload.accountType,
            accountName: payload.accountName
        });
    },
    async loadUser(context,payload){
        const userId = context.rootGetters.user;

        const docRef = doc(db, `users/${userId}/${payload}/accounts`);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document data:", docSnap.data());
        }else{
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        /*const docRef = doc(db, `users/${userId}`);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document data:", docSnap.data());
        }else{
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        
        for(const budgetId in docSnap.data()){
            user.accounts = [] 
            for(const name in docSnap.data()[budgetId].accounts){
                user.accounts.push({ budgetId: budgetId, type: docSnap.data()[budgetId].accounts[name].accountType, accountBalance:docSnap.data()[budgetId].accounts[name].accountBalance, accountName: docSnap.data()[budgetId].accounts[name].accountName })
            }
        }

        console.log(user);*/
        const user = { accounts: [] };

        for(const name in docSnap.data()){
            user.accounts.push({ accountName: name,
            accountType: docSnap.data()[name].accountType,
            accountBalance: docSnap.data()[name].accountBalance})
        }

        console.log(user)
        context.commit('setUser', user);

    }
};
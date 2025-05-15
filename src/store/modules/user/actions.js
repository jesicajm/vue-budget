import db from "../../../main";
import { /*collection, addDoc,*/ doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

export default {
    async validateAndRegisterAccount({ commit, getters, rootGetters }, { budgetId, accountName, accountBalance, accountType }) {
        const userId = rootGetters.user;

        const accountExists = getters['userAccounts'].some(account => account.accountName.toLowerCase() === accountName.toLowerCase());

        if (accountExists) {
            throw new Error('Account name already exists');
        }

        const account = {
            [accountName]: {
                accountBalance,
                accountType,
                transactions: [{
                    date: Timestamp.fromDate(new Date()),
                    category: 'saldo inicial',
                    menssage: '',
                    inflow: accountBalance,
                    outflow: null
                }]
            }
        }

        const docRef = doc(db, "users", userId, budgetId, "accounts");
        await setDoc(docRef, account, { merge: true });


        commit('registerUser', {
            accountBalance,
            accountType,
            accountName,
            transactions: account[accountName].transactions
        });
    },
    async loadUser(context, payload) {
        const userId = context.rootGetters.user;

        const docRef = doc(db, `users/${userId}/${payload}/accounts`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
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

        for (const name in docSnap.data()) {
            user.accounts.push({
                accountName: name,
                accountType: docSnap.data()[name].accountType,
                accountBalance: docSnap.data()[name].accountBalance,
                transactions: docSnap.data()[name].transactions
            })
        }

        console.log(user)
        context.commit('setUser', user);

    },
    async editAccount(context, payload) {
        const userId = context.rootGetters.user;
        console.log(payload)

        const docRef = doc(db, `users/${userId}/${payload.idBudget}/accounts`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data();
            const originalAccount = data[payload.originalAccountName];

            if (!originalAccount) {
                throw new Error("Cuenta original no encontrada.");
            }

            if (payload.originalAccountName !== payload.accountName) {

                data[payload.accountName] = { ...data[payload.originalAccountName], accountName: payload.accountName };
                delete data[payload.originalAccountName];
            }

            if (payload.inflow || payload.outflow) {
                data[payload.accountName].accountBalance = payload.accountBalance;
                data[payload.accountName].transactions.push({
                    date: Timestamp.fromDate(new Date()),
                    category: "ajuste manual saldo",
                    message: "",
                    inflow: payload.inflow,
                    outflow: payload.outflow,
                });
            }

            console.log(data[payload.accountName]);

            console.log(payload.accountName);

            console.log(docSnap.data());
            console.log(data);


            await setDoc(docRef, data);

            context.commit('updateAccount', {
                ...data
            });


        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }


    },
    async deleteAccount(context, payload) {
        const userId = context.rootGetters.user;
        console.log(payload)

        const docRef = doc(db, `users/${userId}/${payload.idBudget}/accounts`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data();
            const account = data[payload.accountName];

            if (!account) {
                throw new Error("Cuenta original no encontrada.");
            }

            delete data[payload.accountName];

            console.log(payload.accountName);

            console.log(data);

            await setDoc(docRef, data);

            context.commit('updateAccount', {
                ...data
            });

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    },
    async addTransaction({ commit, rootGetters },{ budgetId, accountName, category, inflow, outflow }){

        const userId = rootGetters.user;

        const docRef = doc(db,`users/${userId}/${budgetId}/accounts`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data();
            const originalAccount = data[accountName];

            if(!originalAccount) {
                throw new Error("Cuenta original no encontrada.");
            }

            const newTrasaction = {
                date: Timestamp.fromDate(new Date()),
                category: category,
                inflow: inflow,
                outflow: outflow,
            };
    
            data[accountName].transactions.unshift(newTrasaction);

            console.log(docSnap.data());
            console.log(data);


            await setDoc(docRef, data);

            commit('addTransaction', {
                ...newTrasaction,
                accountName
            });
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            }
        
    }
};
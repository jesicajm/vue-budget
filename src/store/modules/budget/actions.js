import db from "../../../main";
import { doc, setDoc, getDoc, updateDoc, deleteField } from "firebase/firestore";

export default {
    async addBudget(context, data){
        const userId = data.userId;

        const budget = {
            id: data.name,
            accountGroup: [{type: 'Frecuente', categories: [{name:'Salidas a comer', assigned: 0, activity:0, available: 0 }, {name:'Transporte', assigned: 0, activity:0, available: 0}, {name:'Comida', assigned: 0, activity:0, available: 0}]},
            {type: 'No mensual', categories: []},
            {type: 'Facturas', categories: [{name:'Agua', assigned: 0, activity:0, available: 0}, {name:'Internet', assigned: 0, activity:0, available: 0}, {name:'Celular', assigned: 0, activity:0, available: 0}]},
            {type: 'Calidad de vida', categories: [{name:'Hobbies', assigned: 0, activity:0, available: 0}, {name:'Entretenimiento', assigned: 0, activity:0, available: 0}]}]
        }

        const budgetBd = {
            [budget.id]: {}
        };
        
        budget.accountGroup.forEach(account => budgetBd[budget.id][account.type] = account.categories);

        await setDoc(doc(db, 'budgets', userId), budgetBd, { merge: true });

        context.commit('addBudget', {
            ...budget
        });
    },
    async addCategory(context, data){
        const userId = context.rootGetters.user;
        console.log('from actions addCategory user: ' + userId)

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget]
        budgetAccount[data.nameAccount].push({name:data.category, assigned: 0, activity:0, available: 0})
  
        await setDoc(userBudgetRef, {
            [data.idBudget] : budgetAccount
        });

        context.commit('addCategory', {
            ...data
        });
    },
    async updateCategory(context, data){
        const userId = context.rootGetters.user;

        //const budget = doc(db, "budgets", userId);
       
        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget]
        const indexCategory  = budgetAccount[data.nameAccount].findIndex(category => category.name === data.category)
  
        budgetAccount[data.nameAccount][indexCategory].name = data.renameCategory;

        await setDoc(userBudgetRef, {
            [data.idBudget] : budgetAccount
        });

        context.commit('updateCategory', {
            ...data
        });
    },
    async deleteCategory(context, data){
        
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget];
        const newBudgetAccount = budgetAccount[data.nameAccount].filter(category => category.name !== data.category);

        budgetAccount[data.nameAccount] = newBudgetAccount

        await setDoc(userBudgetRef, {
            [data.idBudget] : budgetAccount
        });
        
        context.commit('deleteCategory', {
            ...data
        });
    },
    async addAccount(context, data){
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget]
        budgetAccount[data.nameAccount] = []

        await setDoc(userBudgetRef, {
            [data.idBudget] : budgetAccount
        });

        context.commit('addAccount', {
            ...data
        });
    },
    async loadBudgets(context){
        const userId = context.rootGetters.user;

        const docRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        }else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

        const budgets = [];
        
        for(const budgetId in docSnap.data()){
            const budget = {
                id: budgetId,
                accountGroup: []
            }

            for(const type in docSnap.data()[budgetId]){
                budget.accountGroup.push({ type: type, categories: docSnap.data()[budgetId][type]})
            }

            budgets.push(budget);
            console.log(budgetId, " => ", docSnap.data()[budgetId]);
        }

        console.log(budgets);

        context.commit('setBudgets', budgets);
    },
    async deleteAccount(context, data){
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget]
        delete budgetAccount[data.nameAccount]

        await setDoc(userBudgetRef, {
            [data.idBudget] : budgetAccount
        });
        
        context.commit('deleteAccount', {
            ...data
        });
    },
    async updateAccount(context, data){
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget];

        const categoriesAccount = docSnap.data()[data.idBudget][data.nameAccount];

        delete budgetAccount[data.nameAccount];
        budgetAccount[data.renameAccount] = categoriesAccount;

        await setDoc(userBudgetRef, {
            [data.idBudget] : budgetAccount
        });
        
        context.commit('updateAccount', {
            ...data
        });
    },
    async deleteBudget(context, data){
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);

        await updateDoc(userBudgetRef, {
            [data]: deleteField()
        });

        context.commit('deletBudget', data);
    },
    async setMoneyAssigned(context, data){
        const userId = context.rootGetters.user;
       
        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        console.log(data);
        const budgetAccount = docSnap.data()[data.idBudget]
        const indexCategory  = budgetAccount[data.nameAccount].findIndex(category => category.name === data.nameCategory)
  
        budgetAccount[data.nameAccount][indexCategory].assigned = data.updateAssignedCategory;

        await setDoc(userBudgetRef, {
            [data.idBudget] : budgetAccount
        });

        context.commit('updateAssignedCategory', {
            ...data
        });
        
    }

};
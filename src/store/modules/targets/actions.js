import db from "../../../main";
import { doc, setDoc, getDoc, updateDoc,deleteField /*collection, getDocs,, updateDoc, arrayUnion, arrayRemove, deleteField*/ } from "firebase/firestore";

export default {
    async addTargetCategory(context,payload){
        const userId = context.rootGetters.user; 
        console.log('From addTargetCategory userId:' + userId)

        const target = {            
            type: payload.type,
            ammount: payload.ammount,
            by: payload.by,
            byValue: payload.byValue,
            period: payload.period,
            customRepeat: payload.customRepeat       
        };

        /*const targetDb = {
            [payload.idBudget]:{[payload.category]:target}
        }*/

        const targetDb = {
            [payload.category]: target
        }
    
        const docRef = doc(db, "targets", userId, payload.idBudget, "targetCategories");
        await setDoc(docRef, targetDb, { merge: true });
        //await setDoc(doc(db,"targets", userId), targetDb, { merge: true }); 
        
        context.commit('addTargetCategory', {
            ...target,
            category: payload.category
        });
        
    },
    async updateTarget(context, payload){
        const userId = context.rootGetters.user;

        const target = {
            type: payload.type,
            ammount: payload.ammount,
            by: payload.by,
            byValue: payload.byValue,
            period: payload.period,
            customRepeat: payload.customRepeat       
        }; 
       
        /*const targetCategory = {
            [payload.idBudget]: {[payload.category]:target}
        }*/

        const targetCategory = {
            [payload.category]:target
        }

        const docRef = doc(db, "targets", userId, payload.idBudget, "targetCategories");
        await setDoc(docRef, targetCategory, { merge: true });
       // await setDoc(doc(db,"targets", userId), targetCategory, { merge: true }); 
    
        context.commit('updateTarget', {
            ...target,
            category: payload.category
        });

    },
    async deleteTarget(context, payload){
        const userId = context.rootGetters.user;
        
       /* const userBudgetRef = doc(db, "targets", userId);
        const docSnap = await getDoc(userBudgetRef);*/

        const docRef = doc(db, "targets", userId, payload.idBudget, "targetCategories");
        await updateDoc(docRef, {
            [payload.category]: deleteField()
        });
        /*const docRef = doc(db, `targets/${userId}/${payload.idBudget}/${payload.category}`);
        const docSnap = await getDoc(docRef);

        const budgetTarget = docSnap.data()[payload.idBudget]
        delete budgetTarget[payload.category]

        await setDoc(userBudgetRef, {
            [payload.idBudget] : budgetTarget
        });*/


        context.commit('deleteTarget', payload);
    },
    async fetchTargets(context,payload){
        const userId = context.rootGetters.user;
        
        const docRef = doc(db, "targets", userId, payload, "targetCategories");
        
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document data:", docSnap.data());
        }else{
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

        const targets = [];
        
        for(const category in docSnap.data()){
            const target = {}

            target.category = category;
            target.type = docSnap.data()[category].type;
            target.ammount = docSnap.data()[category].ammount,
            target.by = docSnap.data()[category].by,
            target.byValue = docSnap.data()[category].byValue,
            target.period = docSnap.data()[category].period,
            target.customRepeat= docSnap.data()[category].customRepeat

            console.log(category)
            targets.push(target);

        }
            
        console.log(targets);

        context.commit('setTargets', targets);

    }
}
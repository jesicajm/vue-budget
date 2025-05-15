import db from "../../../main";
import { doc, setDoc, getDoc, updateDoc, deleteField, Timestamp, collection, addDoc, getDocs } from "firebase/firestore";

export default {
    async addBudget(context, data) {
        const userId = data.userId;
        const email = context.rootGetters.emailUser;
        context.commit('setLoading', true);

        const accountGroups = [
            { name: 'Frecuente', budgetName: data.name },
            { name: 'No mensual', budgetName: data.name },
            { name: 'Facturas', budgetName: data.name },
            { name: 'Calidad de vida', budgetName: data.name }
        ];

        const categories = [
            { name: 'Salidas a comer', groupName: 'Frecuente', assigned: 0, activity: 0, available: 0 },
            { name: 'Transporte', groupName: 'Frecuente', assigned: 0, activity: 0, available: 0 },
            { name: 'Comida', groupName: 'Frecuente', assigned: 0, activity: 0, available: 0 },
            { name: 'Agua', groupName: 'Facturas', assigned: 0, activity: 0, available: 0 },
            { name: 'Internet', groupName: 'Facturas', assigned: 0, activity: 0, available: 0 },
            { name: 'Celular', groupName: 'Facturas', assigned: 0, activity: 0, available: 0 },
            { name: 'Hobbies', groupName: 'Calidad de vida', assigned: 0, activity: 0, available: 0 },
            { name: 'Entretenimiento', groupName: 'Calidad de vida', assigned: 0, activity: 0, available: 0 }
        ];

        try {
            // 1. Crear el documento del usuario
            const userRef = doc(db, "users", userId);
            await setDoc(userRef, {
                createdAt: Timestamp.fromDate(new Date()),
                email: email// Suponiendo que tienes el email del usuario
            });

            // 2. Crear el documento del budget en la subcolección 'budgets'
            const budgetsRef = collection(userRef, "budgets");
            const budgetDoc = await addDoc(budgetsRef, {
                name: data.name,
                date: Timestamp.fromDate(new Date())
            });

            const budgetId = budgetDoc.id;

            for (const group of accountGroups) {
                const groupRef = collection(budgetDoc, "accountGroups");
                const groupDoc = await addDoc(groupRef, {
                    name: group.name,
                    budgetName: group.budgetName
                });

                const groupId = groupDoc.id;
                console.log(groupId);

                // 4. Añadir documentos en la subcolección 'categories' de cada 'groupId'
                const groupCategories = categories.filter((category) => category.groupName === group.name);
                for (const category of groupCategories) {
                    const categoryRef = collection(groupDoc, "categories");
                    await addDoc(categoryRef, {
                        name: category.name,
                        groupName: category.groupName,
                        assigned: category.assigned,
                        activity: category.activity,
                        available: category.available
                    });
                }
            }
            console.log("Estructura creada correctamente.");

            context.commit('updateBudgetName',{
                name: data.name
            })

            context.commit('updateBudgets', {
                id: budgetId,
                name: data.name,
                date: Timestamp.fromDate(new Date())

            });

            context.commit('updateAccountGroups', {
                accountGroups: accountGroups
            });

            context.commit('updateCategories', {
                categories: categories
            });
        } catch (error) {
            console.error("Error al crear la estructura:", error);
        }finally {
            context.commit('setLoading', false);
        }

    },
    async addCategory(context, data) {
        const userId = context.rootGetters.user;
        console.log('from actions addCategory user: ' + userId)

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget]
        budgetAccount[data.nameAccount].push({ name: data.category, assigned: 0, activity: 0, available: 0 })

        await setDoc(userBudgetRef, {
            [data.idBudget]: budgetAccount
        });

        context.commit('addCategory', {
            ...data
        });
    },
    async updateCategory(context, data) {
        const userId = context.rootGetters.user;

        //const budget = doc(db, "budgets", userId);

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget]
        const indexCategory = budgetAccount[data.nameAccount].findIndex(category => category.name === data.category)

        budgetAccount[data.nameAccount][indexCategory].name = data.renameCategory;

        await setDoc(userBudgetRef, {
            [data.idBudget]: budgetAccount
        });

        context.commit('updateCategory', {
            ...data
        });
    },
    async deleteCategory(context, data) {

        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget];
        const newBudgetAccount = budgetAccount[data.nameAccount].filter(category => category.name !== data.category);

        budgetAccount[data.nameAccount] = newBudgetAccount;

        await setDoc(userBudgetRef, {
            [data.idBudget]: budgetAccount
        });

        context.commit('deleteCategory', {
            ...data
        });
    },
    async addAccount(context, data) {
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget]
        budgetAccount[data.nameAccount] = []

        await setDoc(userBudgetRef, {
            [data.idBudget]: budgetAccount
        });

        context.commit('addAccount', {
            ...data
        });
    },
    async loadBudgetsOld(context) {
        const userId = context.rootGetters.user;

        const docRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

        const budgets = [];

        for (const budgetId in docSnap.data()) {
            const budget = {
                id: budgetId,
                date: docSnap.data()[budgetId].date,
                accountGroup: []
            }

            for (const type in docSnap.data()[budgetId]) {
                if (type !== 'date') {
                    budget.accountGroup.push({ type: type, categories: docSnap.data()[budgetId][type] })
                }
            }

            budgets.push(budget);
            console.log(budgetId, " => ", docSnap.data()[budgetId]);
        }

        console.log(budgets);

        context.commit('setBudgets', budgets);
    },
    async loadBudgets(context) {
        const userId = context.rootGetters.user; // Obtener el ID del usuario desde el store global
        context.commit('setLoading', true);

        try {
            // Validar que el ID del usuario esté definido
            if (!userId) {
                throw new Error("El ID del usuario no está definido.");
            }

            // 1. Referencia a la colección de budgets del usuario
            const userRef = doc(db, "users", userId);
            const budgetsRef = collection(userRef, "budgets");

            // 2. Obtener todos los presupuestos
            const budgetsSnap = await getDocs(budgetsRef);
            console.log("budgetsSnap:", budgetsSnap);

            if (budgetsSnap.empty) {
                throw new Error("No se encontraron presupuestos para el usuario.");
            }

            // 3. Mapear todos los presupuestos en un array
            const budgets = budgetsSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log("Presupuestos recuperados:", budgets);

            // 4. Commit para almacenar los presupuestos en el estado Vuex
            context.commit("setBudgets", budgets);

            console.log(budgets[0].id);

            context.commit("updateBudgetName", budgets[0].name);

            // 5. Cargar los grupos de cuentas y categorías del presupuesto seleccionado
            await context.dispatch("fetchBudgetById", budgets[0].id);

        } catch (error) {
            console.error("Error al cargar los presupuestos:", error.message);
            throw error;
        }
    },
    async fetchBudgetById(context, budgetId) {
        const userId = context.rootGetters.user; // Obtener el ID del usuario desde el store global
        
        try {
            // 1. Obtener referencia al documento del presupuesto
            const userRef = doc(db, "users", userId);
            const budgetRef = doc(userRef, "budgets", budgetId);

            // 2. Obtener el documento del presupuesto
            const budgetSnap = await getDoc(budgetRef);
            if (!budgetSnap.exists()) {
                throw new Error("El presupuesto no existe.");
            }
            // const budgetData = budgetSnap.data();

            // 3. Obtener los grupos de cuentas relacionados al presupuesto
            const accountGroupsRef = collection(budgetRef, "accountGroups");
            const accountGroupsSnap = await getDocs(accountGroupsRef);

            const accountGroups = [];
            const categories = [];

            for (const groupDoc of accountGroupsSnap.docs) {
                const groupData = groupDoc.data();
                groupData.id = groupDoc.id; // Añadir el ID del grupo
                accountGroups.push(groupData);

                // 4. Obtener las categorías de cada grupo de cuentas
                const categoriesRef = collection(groupDoc.ref, "categories");
                const categoriesSnap = await getDocs(categoriesRef);

                for (const categoryDoc of categoriesSnap.docs) {
                    const categoryData = categoryDoc.data();
                    categoryData.id = categoryDoc.id; // Añadir el ID de la categoría
                    categories.push(categoryData);
                }

                // 5. Añadir las categorías al grupo actual
                groupData.categories = categories;

            }
            console.log(accountGroups)
            console.log(categories)

            // 6. Commit al store
            context.commit("updateAccountGroups", { accountGroups });
            context.commit('updateCategories', {
                categories: categories
            });

        } catch (error) {
            console.error("Error al obtener el presupuesto:", error);
            throw error;
        }finally {
            context.commit('setLoading', false);
        }
    },

    async deleteAccount(context, data) {
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget]
        delete budgetAccount[data.nameAccount]

        await setDoc(userBudgetRef, {
            [data.idBudget]: budgetAccount
        });

        context.commit('deleteAccount', {
            ...data
        });
    },

    async updateAccount(context, data) {
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        const budgetAccount = docSnap.data()[data.idBudget];

        const categoriesAccount = docSnap.data()[data.idBudget][data.nameAccount];

        delete budgetAccount[data.nameAccount];
        budgetAccount[data.renameAccount] = categoriesAccount;

        await setDoc(userBudgetRef, {
            [data.idBudget]: budgetAccount
        });

        context.commit('updateAccount', {
            ...data
        });
    },

    async deleteBudget(context, data) {
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);

        await updateDoc(userBudgetRef, {
            [data]: deleteField()
        });

        context.commit('deletBudget', data);
    },

    async setMoneyAssigned(context, data) {
        const userId = context.rootGetters.user;

        const userBudgetRef = doc(db, "budgets", userId);
        const docSnap = await getDoc(userBudgetRef);

        console.log(data);
        const budgetAccount = docSnap.data()[data.idBudget]
        const indexCategory = budgetAccount[data.nameAccount].findIndex(category => category.name === data.nameCategory)

        budgetAccount[data.nameAccount][indexCategory].assigned = data.updateAssignedCategory;
        budgetAccount[data.nameAccount][indexCategory].available = data.updateAvailableCategory

        await setDoc(userBudgetRef, {
            [data.idBudget]: budgetAccount
        });

        context.commit('updateAssignedCategory', {
            ...data
        });

    },
    async calculateTotalMoneyAllocate({ commit, getters }) {

        let moneyAllocated = 0;
        getters['categories'].forEach(category => {
            moneyAllocated += category.assigned;  // Realiza los cálculos financieros
            console.log('asignado por categoria:', category.assigned);
        });

        console.log('total money allocated:', moneyAllocated);
        commit('setMoneyAllocated', moneyAllocated);
    },
    calculateDebitBalance({ commit, rootGetters }) {
        const accountsDebit = rootGetters['user/filterDebitAccounts'];

        let debitBalance = accountsDebit.reduce((acc, account) => acc + account.accountBalance, 0);
        console.log('total debit balance:', debitBalance);

        commit('setDebitBalance', debitBalance);
    },
    /* updateTotalMoneyAvailable({ commit, getters }) {
         
         const availableMoney = getters.creditBalance - getters.moneyAllocated;
 
         console.log('total disponible:', availableMoney);
         commit('setTotalMoneyAvailable', availableMoney);
     }*/
    loadAccountGroup({ commit, getters }, idBudget) {
        // Lógica para cargar accountGroup desde budgets 
        const accountGroup = getters['userBudgets'].find(budget => budget.id === idBudget).accountGroup;
        console.log('desde loasAccountGroup', accountGroup);
        commit('setAccountGroup', accountGroup);
    },
    updateMoneyAllocate({ commit }, valueAssigned) {
        commit('updateMoneyAllocated', valueAssigned);
        console.log('update money allocated', valueAssigned)
    },
    updateDebitBalance({ commit }, valueDebitBalance) {
        commit('updateDebitBalance', valueDebitBalance);
    }
};
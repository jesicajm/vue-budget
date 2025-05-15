export default {
   /*idUser(state, getters, rootState, rootGetters){
        return rootGetters.userId;
    },*/
    userAccounts(state){
        console.log('from desde getters userAccounts:', state )
        return (state.user.accounts);
    },
    filterNearSpend(_, getters){
        const accountNearSpend = ['Tarjeta de crédito', 'Línea de crédito','Cuenta corriente', 'Ahorros', 'Efectivo'];
        return getters.userAccounts.filter(account => accountNearSpend.includes(account.accountType))
    },
    filterCredtAccounts(_, getters){
        const creditAccounts = ['Hipoteca','Préstamo para automóvil','Préstamo para estudiantes','Préstamo personal','Otra deuda'];
        return getters.userAccounts.filter(account => creditAccounts.includes(account.accountType));
    },
    filterTrackingAccounts(_, getters){
        const trackingAccounts = ['Activo','Pasivo'];
        return getters.userAccounts.filter(account => trackingAccounts.includes(account.accountType));
    },
    filterDebitAccounts(_, getters){
        const debitAccount = ['Cuenta corriente', 'Ahorros', 'Efectivo'];
        return getters.userAccounts.filter(account => debitAccount.includes(account.accountType))
    }
};
<template>
  <section class="menu">
    <new-budget v-if="isVisibleNewBudget" @close-new-budget="closeNewBudget" ></new-budget>
    <add-account 
        v-if="isVisibleAddAccount" 
        :budget-id="budgetId"  
        @close-add-account="closeAddAccount" 
        @add-account-available="$emit('add-account-available', $event)"></add-account>
    <div>
        <button @click="toggleMenu" class="menu-item">{{ budgetId }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
        </button>
       <div class="menu-account" v-if="showMenu">
            <ul>
                <li>
                    <button @click="showNewBudget">
                        <svg v-show="showCaretRigth" @click=" toggleCategories" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>Nuevo presupuesto
                    </button>
                </li>
                <li>
                    <router-link to="/budgets">Ver todos los presupuestos</router-link>
                </li>
                <li>
                    <router-link to="">Configuración presupuesto</router-link>
                </li>
            </ul>
            <p>Cuenta</p>
            <ul>
                <li>
                    <router-link to="">Configuración Cuenta</router-link>
                </li>

                <li>
                    <router-link to="">Gestionar conexiones</router-link>
                </li>
            </ul>
            <button>Cerrar sesión</button>
       </div>
       <p @click="loadBudget">{{ budgetId }}</p>
       <div class="menu-item">
            <p v-if="userAccounts.length === 0" class="menu-item__without-accounts">Sin cuentas 
                <br> 
                No puede presupuestar sin agregar cuentas a YNAB primero. ¿Qué tal si agregamos uno ahora?
            </p>
            <div v-else class="menu-item__with-accounts">
                <group-accounts
                    v-if="budgetAccounts.length > 0"
                    name-group-account="PRESUPUESTO"
                    :acccount-total-balance="totalBudgetBalance"
                    @show-account-list="showAccountList('budget')"
                    @hide-account-list="hideAccountList('budget')">
                    <ul v-if="isVisibleBudgetList" class="account-list">
                        <item-budget-account 
                            v-for="account in budgetAccounts"
                            :key="account.accountName"
                            :account-type="account.accountType"
                            :account-name="account.accountName"
                            :account-balance="account.accountBalance"
                            @select-account="selectAccount(account.accountName)"
                            @show-edit-account="$emit('show-edit-account', $event)"
                            :class="{selected: account.accountName === selectedAccount }">
                        </item-budget-account>
                    </ul>
                </group-accounts>    
                <group-accounts
                    v-if="loans.length > 0"
                    name-group-account="PRÉSTAMOS"
                    :acccount-total-balance="totalCreditBalance"
                    @show-account-list="showAccountList('loans')"
                    @hide-account-list="hideAccountList('loans')">
                    <ul v-if="isVisibleLoansList" class="account-list">
                        <item-budget-account 
                            v-for="account in loans"
                            :key="account.accountName"
                            :account-type="account.accountType"
                            :account-name="account.accountName"
                            :account-balance="account.accountBalance"
                            @select-account="selectAccount(account.accountName)"
                            @show-edit-account="$emit('show-edit-account', $event)"
                            :class="{selected: account.accountName === selectedAccount }"> 
                        </item-budget-account>
                    </ul>
                </group-accounts>
                <group-accounts
                    v-if="tracking.length > 0"
                    name-group-account="SEGUIMIENTO"
                    :acccount-total-balance="totalTrackingAccounts"
                    @show-account-list="showAccountList('tracking')"
                    @hide-account-list="hideAccountList('tracking')">
                    <ul v-if="isVisibleTrackingList" class="account-list">
                        <item-budget-account 
                            v-for="account in tracking"
                            :key="account.accountName"
                            :account-type="account.accountType"
                            :account-name="account.accountName"
                            :account-balance="account.accountBalance"
                            @select-account="selectAccount(account.accountName)"
                            @show-edit-account="$emit('show-edit-account', $event)"
                            :style="{color: account.accountName === selectedAccount ? 'red' : 'green' }"> 
                        </item-budget-account>
                    </ul>
                </group-accounts>
            </div>
       </div>
       <div>
        <button @click="showAddAccount" class="menu-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              color="blue"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            ><path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
              />
            </svg>
            Agregar cuenta
        </button>
       </div>
     </div>  
  </section>
</template>

<script>
import NewBudget from '../../components/NewBudget.vue';
import AddAccount from '../../components/AddAccount.vue';
import ItemBudgetAccount from '../../components/ItemBudgetAccount.vue';
import GroupAccounts from '../../components/GroupAccounts.vue'

export default {
    emits:['budget-name', 'add-account-available','show-edit-account'],
    props:['budgetId', 'userAccounts'],
    components:{
       NewBudget,
       AddAccount,
       ItemBudgetAccount,
       GroupAccounts
    },
    data(){
        return {
           isVisibleMenu: false,
           isVisibleNewBudget: false,
           isVisibleAddAccount: false,
           isVisibleBudgetList: true,
           isVisibleLoansList: true,
           isVisibleTrackingList: true,
           accounts: null,
           isOver: false,
           budgetBalance: 0,
           creditBalance:0,
           trackingBalance:0,
           selectedAccount: null
        }
    },
    computed:{
        showMenu(){
            return this.isVisibleMenu;
        },
        budgetAccounts(){
            return this.$store.getters['user/filterNearSpend'];
        },
        loans(){
            return this.$store.getters['user/filterCredtAccounts'];
        },
        tracking(){
            return this.$store.getters['user/filterTrackingAccounts'];
        },
        totalCreditBalance(){
           this.$store.getters['user/filterCredtAccounts'].forEach(account => this.creditBalance -= account.accountBalance)
           return this.creditBalance;
        },
        totalBudgetBalance(){
            this.$store.getters['user/filterNearSpend'].forEach(account => {
                if(account.accountType !== 'Tarjeta de crédito' && account.accountType !== 'Línea de crédito'){
                    this.budgetBalance += account.accountBalance;
                }else if(account.accountType === 'Tarjeta de crédito' || account.accountType === 'Línea de crédito'){
                    this.budgetBalance -= account.accountBalance
                }
            });

            return this.budgetBalance;
        },
        totalTrackingAccounts(){
            this.$store.getters['user/filterTrackingAccounts'].forEach(account => {
                if(account.accountType === 'Activo'){
                    this.trackingBalance += account.accountBalance;
                }else if(account.accountType === 'Pasivo'){
                    this.trackingBalance -= account.accountBalance;
                }
            }); 

            return this.trackingBalance; 
        }
    },
    watch:{
        budgetAccounts(){
            console.log('from watch budgetAccounts');
            this.budgetBalance = 0;
        },
        loans(){
            console.log('from watch  loans');
            this.creditBalance = 0;
        },
        tracking(){
            console.log('from watch tracking');
            this.trackingBalance = 0;
        }

    },
    methods:{
        toggleMenu(){
            this.isVisibleMenu = !this.isVisibleMenu
        },
        showNewBudget(){
            this.isVisibleNewBudget= true;
            this.isVisibleMenu = false;
        },
        closeNewBudget(){
            this.isVisibleNewBudget = false;
        },
        showAddAccount(){
            this.isVisibleAddAccount = true;
        }, 
        closeAddAccount(){
            this.isVisibleAddAccount = false;
        },
        showAccountList(nameList){
             if(nameList == 'budget'){
                this.isVisibleBudgetList = true;
            }else if(nameList == 'loans'){
                this.isVisibleLoansList = true;
            }else if(nameList == 'tracking'){
                 this.isVisibleTrackingList = true;
            }
        },
        hideAccountList(nameList){
            if(nameList == 'budget'){
                this.isVisibleBudgetList = false;
            }else if(nameList == 'loans'){
                this.isVisibleLoansList = false;
            }else if(nameList == 'tracking'){
                 this.isVisibleTrackingList = false;
            }
        },
        budgetIsOver(){
            return this.isOver = true;
        },
        calculateTotalAccountBalance(newAccount){
            if(this.$store.getters['user/filterDebitAccounts'].includes(newAccount)){
                if(newAccount !== 'Tarjeta de crédito' && newAccount !== 'Línea de crédito'){
                    this.budgetTotalBalance += newAccount;
                }else if(newAccount === 'Tarjeta de crédito' || newAccount === 'Línea de crédito'){
                    this.budgetTotalBalance -= newAccount;
                }
            }
        },
        selectAccount(accountId){
            this.selectedAccount = accountId;
            this.$router.replace(`/budget/${this.budgetId}/${accountId}`);
        },
        loadBudget(){
            this.$router.replace(`/budget/${this.budgetId}`);
        },
    }
}
</script>

<style scoped>
.menu{
   font-size: 15px;
}

.menu-item {
    margin: 8px;
}

.menu-item__without-accounts {
   padding: 10px;
   background: rgb(78, 78, 133);
   border-radius: 5px;
   color: white;
   margin: 0;
}

.menu-item__with-accounts{
   color:white;
}

.account-list{
    list-style: none;
    padding:0;
}

/*.ccount-list li {
   display: grid;
   grid-template-columns: 1fr 4fr 2fr;
   align-items: center;
   padding: 8px;
   color: white;
}*/

.account-list li:hover{
   background: rgb(41, 41, 73);
}

.menu-account{
    position: fixed;
    padding: 24px;
    z-index: 101;
    top: 80px;
    left: 50px;
    width: 14rem;
    height: auto;
    background: rgba(232, 240, 247, 0.87);
}

.menu-account ul{
    padding: 0;
    margin: 24px 0 0;
    list-style: none;
}

.menu-account ul li{
   margin-bottom: 24px;
}

.selected{
    background: rgb(58, 58, 148);
}
</style>

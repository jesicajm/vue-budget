<template>
   <section>
        <div class="header-account">
            <div class="header-account__data">
                <h2>{{ accountName }}</h2>
                <div>
                    <span>{{ accountType }} </span>
                    <span> Aun no conciliada</span>
                </div>
            </div>
            <div class="header-account__actions">
                <svg @click="showEditAccount" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                </svg>
                <button type="button">Conciliado</button>
            </div>
        </div>
        <div class="account-balance">
            <div class="account-balance__item">
                <div>${{ accountBalance }}</div>
                <div>Borrar saldo</div>
            </div>
            <div class="account-balance__symbol">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </div>
            <div class="account-balance__item">
                <div>$</div>
                <div>Saldo no liquidado</div>
            </div>
            <div class="account-balance__symbol subtraction">
                <span>-</span>
                <span>-</span>
            </div>
            <div class="account-balance__item">
                <div>$</div>
                <div>Saldo</div>
            </div>
        </div>
        <account-balance-details :account-transactions="transactions" :budget-id="budgetId"></account-balance-details>
   </section>
</template>

<script>
import AccountBalanceDetails from '../../components/AccountBalanceDetails.vue';


export default {
    props:['budgetId','accountId'],
    emits: ['show-edit-account'],
    components: {
         AccountBalanceDetails,
    },    
    data() {
        return {
            accountName: null,
            accountType: null,
            accountBalance: null,
            transactions: null
        }
    },
    /*computed: {
      account() {
        const account = this.$store.getters["user/userAccounts"].find(
            (account) => account.accountName === this.accountId
        );
        console.log("from computed accountGroup");
        return account;
       }
    },*/   
    methods:{
       loadAccount(id){
            this.accountName = id;
            const account = this.$store.getters["user/userAccounts"].find(
            (account) => account.accountName === id);
            console.log(this.transactions);
            this.accountType = account.accountType;
            this.accountBalance = account.accountBalance;
            this.transactions = account.transactions;
       },
       showEditAccount(){
            this.$emit('show-edit-account', {
            accountName: this.accountName, 
            accountBalance: this.accountBalance});
       },
       closeEditAccount(){
          this.isVisibleEditAccount = false;
       },
       setAccount(){
          this.loadAccount(this.accountId);
       }
       
    },
    created(){
       console.log(this.accountId)
       this.loadAccount(this.accountId);
    },
    watch:{
       accountId(value){
          this.loadAccount(value);
       }
    }
}
</script>


<style scoped>
.backdrop{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
}

dialog {
   position: fixed;
   z-index: 100;
}

section {
   width: 74%;
}

.header-account {
   width: 100%;
   display: flex;
   padding: 15px;
   justify-content: space-between;
   align-items: baseline;
   background: #f5f5fa;
   border-bottom: solid 1px #9d9dc9;
}

.header-account__data{
   display: grid;
   grid-template-rows: repeat(2, auto);
}

.header-account__actions {
   display: flex;
   align-self: center;
}

.header-account__actions svg{
  margin-right: 10px;
}

.account-balance {
   width: 100%;
   display: flex;
   justify-items: center;
   padding: 15px;
   background: #f5f5fa;
   border-bottom: solid 1px #9d9dc9;
}

.account-balance__item {
    margin-right:15px;
}

.account-balance__item div:nth-child(odd){
    color: rgb(73, 160, 73);
}

.account-balance__symbol {
    text-align: center;
    margin-right:10px;
    align-self: center;
}

.account-balance__symbol span{
    /*width: 5px;*/
    font-size: 20px;
}

.subtraction {
   display:grid;
   grid-template-rows: repeat(2,4px);
   justify-items: center;
   align-items: center;
}
</style>
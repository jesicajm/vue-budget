<template>
  <edit-account v-if="isVisibleEditAccount" @close-edit-account="closeEditAccount" :account-name="accountName" :account-balance="accountBalance" :id-budget="idBudget"></edit-account>
  <div class="view-menu-budget">
    <menu-account
      v-if="!isLoading"
      class="menu"
      :budget-id="idBudget"
      :user-accounts="budgetAccounts"
      @add-account-available="addAccountAvailable"
      @show-edit-account="showEditAccount"
    ></menu-account>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuAccount from "../menu/menuAccount.vue";
import EditAccount from '../../components/EditAccount.vue';

export default {
  components: {
    MenuAccount,
    EditAccount
  },
  data() {
    return {
      isVisibleEditAccount: false,
      isLoading: false,
      idBudget: null,
      accountName: null,
      accountBalance: null
      // budgetName: null,
      // userBudget: null,
      //userAccounts: null
    };
  },
  computed: {
    budgetAccounts() {
      return this.$store.getters["user/userAccounts"];
    }
  },
  created() {
    this.idBudget = this.$route.params.budgetId;
    console.log("from created loadBudgets " + this.$route.params.budgetId);
    this.loadBudgetsTargetsAccounts();
  },
  methods: {
    async loadBudgetsTargetsAccounts() {
      console.log("from load all data components");
      console.log(this.idBudget);
      this.isLoading = true;
      await this.$store.dispatch("budget/loadBudgets");
    
      if(this.idBudget === undefined){
          this.idBudget = this.$store.getters["budget/budgetLogin"].id;
      }
      
      this.$router.replace(`/budget/${this.idBudget}`);

      await this.$store.dispatch("user/loadUser", this.idBudget);

      this.isLoading = false;
      
    },
    addAccountAvailable(balanceAccount){
       this.balanceNewAccount = balanceAccount;
    },
    showEditAccount(accountData){
      this.accountName = accountData.accountName;
      this.accountBalance = accountData.accountBalance;
      this.isVisibleEditAccount = true;
    },
    closeEditAccount(){
       this.isVisibleEditAccount = false;
    } 
  }
};
</script>

<style scoped>
.view-menu-budget {
  width: 100%;
  display:flex;
  align-items: baseline;

}

.menu {
  padding: 15px;
  background: rgb(99, 99, 163);
}

</style>
<template>
  <div v-if="isLoading">Cargando datos...</div>
  <div v-else class="view-menu-budget">
    <edit-account
      v-if="isVisibleEditAccount"
      @change-account="updateAccount"
      @close-edit-account="closeEditAccount"
      @change-menu-budget="updateMenuBudget"
      :account-name="accountName"
      :account-balance="accountBalance"
      :account-type="accountType"
      :id-budget="budgetId"
    ></edit-account>
    <menu-view 
        :budget-id="budgetId" 
        @account-selected="showAccount"
        @show-edit-account="showEditAccount"></menu-view>
    <budget
        v-if="!isLoading && isVisibleBudget"
        @update-total-money-available="handleTotalMoneyUpdate"
        :budget-name="budgetName"
    ></budget>
    <view-account
        v-if="!isLoading && isVisibleViewAccount"
        :budget-id="budgetId"
        :account-id="accountName"
        @show-edit-account="showEditAccount"
    ></view-account>
  </div>  
</template>

<script>
import MenuView from "./MenuView.vue";
import EditAccount from "../../components/EditAccount.vue";
import Budget from "./Budget.vue";
import ViewAccount from "./ViewAccount.vue";
import { mapState } from 'vuex';
import { mapGetters } from "vuex";



export default {
  components: {
    MenuView,
    Budget,
    ViewAccount,
    EditAccount
  },
  data() {
    return {
      isVisibleBudget: true,
      // isLoading: false,
      accountName: null,
      accountBalance: null,
      accountType: null,
      isVisibleViewAccount: false,
      isVisibleEditAccount: false
      // budgetName: null,
      // userBudget: null,
      //userAccounts: null
    };
  },
  computed: {
    ...mapState('budget', ['isLoading']),
    ...mapGetters('budget', ['budgetName'])
  },
  created() {
     this.loadBudgetsTargetsAccounts();
  },
  methods: {
    async loadBudgetsTargetsAccounts() {
      console.log("from load all data components");
      
      console.log(this.budgetName)

      if(!this.budgetName){
          await this.$store.dispatch("budget/loadBudgets");
      }

      console.log(this.budgetName)
      //await this.$store.dispatch("user/loadUser", this.budgetId);

    },
    showAccount(accountName) {
      this.accountName = accountName;
      this.isVisibleViewAccount = true;
      this.isVisibleBudget = false;
    },
    showEditAccount(accountData) {
      this.accountName = accountData.accountName;
      this.accountBalance = accountData.accountBalance;
      this.accountType = accountData.accountType;
      this.isVisibleEditAccount = true;
    },
    closeEditAccount() {
      this.isVisibleEditAccount = false;
    },
    async updateAccount(accountName) {
      this.isLoading = true;
      this.accountName = accountName;
      await this.$store.dispatch("user/loadUser", this.budgetId);
        this.isVisibleViewAccount = true;
        this.isVisibleBudget = false;
        this.isLoading = false;
    },
    async updateMenuBudget(){
      this.isLoading = true;
      await this.$store.dispatch("user/loadUser", this.budgetId);
      this.isVisibleBudget = true;
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.view-menu-budget {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 30fr 70fr;
  display: flex;
  align-items: baseline;
}

/* .menu {
  width: 100%;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  background: rgb(99, 99, 163);
} */

h4 {
  color: #ffffff;
}


</style>
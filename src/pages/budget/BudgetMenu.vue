<template>
  <div class="view-menu-budget">
    <menu-account
      v-if="!isLoading"
      class="menu"
      :budget-id="idBudget"
      :user-accounts="budgetAccounts"
      @add-account-available="addAccountAvailable"
    ></menu-account>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuAccount from "../menu/menuAccount.vue";

export default {
  components: {
    MenuAccount
  },
  data() {
    return {
      isLoading: false,
      idBudget: null
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
    //this.idBudget = this.$route.params.budgetId;
    //console.log("from created loadBudgets " + this.idBudget);
    this.loadBudgetsTargetsAccounts();
  },
  methods: {
    async loadBudgetsTargetsAccounts() {
      console.log("from load all data components");
      this.isLoading = true;
      await this.$store.dispatch("budget/loadBudgets");
    
      this.idBudget = this.$store.getters["budget/budgetLogin"].id;

      this.$router.replace(`/budget/${this.idBudget}`);

      await this.$store.dispatch("user/loadUser", this.idBudget);

      this.isLoading = false;
      
    },
    addAccountAvailable(balanceAccount){
       this.balanceNewAccount = balanceAccount;
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
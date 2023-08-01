<template>
  <div class="view-menu-budget">
    <menu-account
      v-if="!isLoading"
      class="menu"
      :budget-id="idBudget"
      :user-accounts="budgetAccounts"
      @add-account-available="addAccountAvailable"
    ></menu-account>
    <div class="budget-target" v-if="!isLoading">
      <div class="budget-target__header">
        <h3 class="budget-header__item">Mes</h3>
        <available-money
          class="budget-header__item"
          :account-group="accountGroup"
          :id-budget="idBudget"
          :balance-new-account="balanceNewAccount"
        ></available-money>
      </div>
      <div class="budget-target__body">
        <div class="budget">
          <div class="budget__add-group">
            <button class="add-group_button" @click="showAddAccount">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                /></svg
              >Agregar grupo
            </button>
            <new-account
              v-if="showAddNewAccount"
              class="newAccount"
              :account-group="accountGroup"
              @hide-add-category="showAddAccount"
              @save-data="saveData"
            >
            </new-account>
          </div>
          <div class="budget__body">
            <div class="budget__body-titles">
              <span>Categoria</span>
              <span>Asignado</span>
              <span>Actividad</span>
              <span>Disponible</span>
            </div>
            <div class="budget__body-category-group">
              <ul v-if="!isLoading">
                <tarjeta-group
                  v-for="account in accountGroup"
                  :key="account.type"
                  :name-account="account.type"
                  :categories="account.categories"
                  :id-budget="idBudget"
                  @update-category-delete="updateCategoryDelete"
                >
                </tarjeta-group>
              </ul>
            </div>
          </div>
        </div>
        <target-category
          v-if="!isLoading"
          :targets-categories="targets"
          :category-target="categoryTarget"
          :id-budget="idBudget"
          class="target"
        >
        </target-category>
      </div>
    </div>
  </div>
</template>

<script>
import TarjetaGroup from "../../components/TarjetaGroup.vue";
import NewAccount from "../../components/NewAccount.vue";
import TargetCategory from "../targets/TargetCategory.vue";
import MenuAccount from "../menu/menuAccount.vue";
import AvailableMoney from "../../components/AvailableMoney";

export default {
  components: {
    MenuAccount,
    TarjetaGroup,
    NewAccount,
    TargetCategory,
    AvailableMoney,
  },
  data() {
    return {
      isLoading: false,
      isVisibleAddAccount: false,
      categoryTarget: null,
      idBudget: null,
      balanceNewAccount: null
      // budgetName: null,
      // userBudget: null,
      //userAccounts: null
    };
  },
  watch: {
    budgetName(value) {
      console.log("from watch budgetName " + value);
      this.loadBudgets();
    },
  },
  provide() {
    return {
      selectTarget: this.showTargetCategory,
    };
  },
  computed: {
    accountGroup() {
      const userBudget = this.$store.getters["budget/userBudgets"].find(
        (budget) => budget.id === this.idBudget
      );
      console.log("from computed accountGroup");
      console.log(userBudget);
      console.log(this.idBudget);
      return userBudget.accountGroup;
    },
    showAddNewAccount() {
      return this.isVisibleAddAccount;
    },
    budgetAccounts() {
      return this.$store.getters["user/userAccounts"];
    },
    targets() {
      return this.$store.getters["targets/targets"];
    },
  },
  created() {
    this.idBudget = this.$route.params.budgetId;
    console.log("from created loadBudgets " + this.idBudget);
    this.loadBudgetsTargetsAccounts();
  },
  methods: {
    showAddAccount() {
      this.isVisibleAddAccount = !this.isVisibleAddAccount;
    },
    async saveData(data) {
      await this.$store.dispatch("budget/addAccount", {
        nameAccount: data,
        idBudget: this.idBudget,
      });

      this.showAddAccount();
    },
    showTarget(data) {
      this.$emit("show-target-category", data);
    },
    showTargetCategory(category) {
      this.categoryTarget = category;
    },
    async loadBudgetsTargetsAccounts() {
      console.log("from load all data components");
      this.isLoading = true;
      await this.$store.dispatch("budget/loadBudgets");

      if (this.idBudget === undefined) {
        this.idBudget = this.$store.getters["budget/budgetLogin"].id;
        console.log("from conditional undefined idBudget");
      }

      await this.$store.dispatch("targets/fetchTargets", this.idBudget);

      await this.$store.dispatch("user/loadUser", this.idBudget);

      this.isLoading = false;
    },
    addAccountAvailable(balanceAccount){
       this.balanceNewAccount = balanceAccount;
    },
    updateCategoryDelete() {
      console.log("from BUDGET emit updateCategoryDelete");
      this.categoryTarget = null;
    },
    /*updateBudgetName(name){
        this.budgetName = name;
        console.log('from emit:' + this.budgetName)
    }*/
  },
};
</script>

<style scoped>
.view-menu-budget {
  display: flex;
  align-items: baseline;
}

.menu {
  padding: 15px;
  width: 26%;
  background: rgb(99, 99, 163);
}

.budget-target {
  width: 74%;
}

.budget-target__header {
  display: flex;
  height: 88px;
  padding: 15px;
  background: #f5f5fa;
  border-bottom: solid 1px #9d9dc9;
}

.budget-target__body {
  display: flex;
}

.budget {
  display: grid;
  width: 50rem;
}

.budget-header__item {
  margin-right: 20px;
}

.budget__add-group {
  position: relative;
  border-bottom: solid 1px #9d9dc9;
}

.newAccount {
  position: absolute;
  left: -5%;
}

.add-group_button {
  background: none;
  border: none;
  margin-left: 20px;
  padding: 10px 0;
}

.budget__body {
  display: grid;
}

.budget__body-titles {
  display: grid;
  grid-template-columns: 4fr repeat(3, 1fr);
  padding-left: 20px;
  padding-top: 12px;
  padding-bottom: 10px;
  border-bottom: solid 1px #9d9dc9;
}

.budget__body-category-group {
}

.budget__body-category-group ul {
  padding-left: 20px;
}

.target {
  max-width: 40rem;
}
</style>
<template>
  <div class="budget-target" v-if="!isLoading">
    <div class="budget-target__header">
      <h3 class="budget-header__item">{{ date }}</h3>
      <available-money
        class="budget-header__item"
        :account-group="accountGroup"
        :id-budget="idBudget"
     
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
</template>

<script>
import TarjetaGroup from "../../components/TarjetaGroup.vue";
import NewAccount from "../../components/NewAccount.vue";
import TargetCategory from "../targets/TargetCategory.vue";
import AvailableMoney from "../../components/AvailableMoney";


export default {
    components: {
      TarjetaGroup,
      NewAccount,
      TargetCategory,
      AvailableMoney
    },
    data() {
        return{
          isLoading: false,
          isVisibleAddAccount: false,
          categoryTarget: null,
          idBudget: null,
          budgetDate: null,
          balanceNewAccount: null,
          date: null,
          month: null,
          year: null
        } 
    },
    watch: {
      budgetName(value) {
        console.log("from watch budgetName " + value);
        this.loadBudgets();
      }
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
      console.log(userBudget.accountGroup);
      console.log(this.idBudget);
      return userBudget.accountGroup;
    },
    showAddNewAccount() {
      return this.isVisibleAddAccount;
    },
    targets() {
      return this.$store.getters["targets/targets"];
    },
  },
  created() {
    this.idBudget = this.$route.params.budgetId;
    console.log("from created budget " + this.idBudget);
    this.setDate();

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

      await this.$store.dispatch("targets/fetchTargets", this.idBudget);

      this.isLoading = false;
      
    },
    updateCategoryDelete() {
      console.log("from BUDGET emit updateCategoryDelete");
      this.categoryTarget = null;
    },
    setDate(){
      const userBudget = this.$store.getters["budget/userBudgets"].find(
        (budget) => budget.id === this.idBudget);
        console.log(userBudget.date)

      if(userBudget.date !== undefined){     
        this.date = userBudget.date.toDate().toLocaleDateString('es-MX', { year:"numeric", month:"short"});
       }    
    }
  }
}
</script>

<style scoped>
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
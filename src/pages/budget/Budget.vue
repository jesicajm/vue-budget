<template>
  <div class="budget-target">
    <div class="budget-target__header">
      <h3 class="budget-header__item">{{ date }}</h3>
      <available-money
        class="budget-header__item"
        :id-budget="budgetId"
        @set-total-money-available="updateTotalMoneyAvailable"
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
            :account-group="accountGroup(budgetId)"
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
          <div
            class="budget__body-category-group"
          >
            <ul>
                <item-group 
                 v-for="group in accountGroups(budgetName)"
                :key="group.name"
                   
                    :groupName="group.name"
                    @toggle-show-categories="handletoggleCategories">
            
                
            </item-group>
            

              <!-- <li>
                 <tarjeta-group
                v-for="category in group.categories"
                :key="category.name"
                :name-account="group.groupName"
                :categories="account.categories"
                :id-budget="budgetId"
                @update-category-delete="updateCategoryDelete"
              >
              </tarjeta-group>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
      <target-category
        :targets-categories="targets"
        :category-target="categoryTarget"
        :id-budget="budgetId"
        class="target"
      >
      </target-category>
    </div>
  </div>
</template>

<script>
//import TarjetaGroup from "../../components/TarjetaGroup.vue";
import NewAccount from "../../components/NewAccount.vue";
import ItemGroup from "../../components/ItemGroup.vue"
import TargetCategory from "../targets/TargetCategory.vue";
import AvailableMoney from "../../components/AvailableMoney";
import { mapGetters } from "vuex";

export default {
  components: {
    // TarjetaGroup,
    NewAccount,
    ItemGroup,
    TargetCategory,
    AvailableMoney
  },
  data() {
    return {
      isVisibleAddAccount: false,
      categoryTarget: null,
      budgetDate: null,
      balanceNewAccount: null,
      date: null,
      month: null,
      year: null,
    };
  },
  provide() {
    return {
      selectTarget: this.showTargetCategory,
    };
  },
  async created() {
 

    // this.idBudget = this.$route.params.budgetId;
    //console.log("from created budget " + this.idBudget);
    /* console.log(this.budgetId);
    try {
      await this.$store.dispatch("budget/fetchBudgetById", this.budgetId);
      // Asegúrate de que los datos ya están cargados antes de ejecutar cualquier otra lógica
      console.log("AccountGroup has been loaded:", this.accountGroup);
    } catch (error) {
      console.error("Error loading account group:", error);
    }
    this.setDate();*/
  },
  computed: {
    ...mapGetters("budget", ["budgetName", "accountGroups", "categoriesByGroup"]),
    /* accountGroup() {
     
      // return this.$store.getters["budget/accountGroup"];
    
      // const userBudget = this.$store.getters["budget/userBudgets"].find(
      //   (budget) => budget.id === this.budgetId
      // );
      // console.log("from computed accountGroup");
      // console.log(userBudget.accountGroup);
      // console.log(this.budgetId);
      // return userBudget.accountGroup;*/
    showAddNewAccount() {
      return this.isVisibleAddAccount;
    },
    targets() {
      return this.$store.getters["targets/targets"];
    }
  },
  methods: {
    showAddAccount() {
      this.isVisibleAddAccount = !this.isVisibleAddAccount;
    },
    async saveData(data) {
      await this.$store.dispatch("budget/addAccount", {
        nameAccount: data,
        idBudget: this.budgetId,
      });

      this.showAddAccount();
    },
    showTarget(data) {
      this.$emit("show-target-category", data);
    },
    showTargetCategory(category) {
      this.categoryTarget = category;
    },
    updateCategoryDelete() {
      console.log("from BUDGET emit updateCategoryDelete");
      this.categoryTarget = null;
    },
    setDate() {
      const userBudget = this.$store.getters["budget/userBudgets"].find(
        (budget) => budget.id === this.budgetId
      );
      console.log(userBudget);

      if (userBudget.date !== undefined) {
        this.date = userBudget.date
          .toDate()
          .toLocaleDateString("es-MX", { year: "numeric", month: "short" });
      }
    },
    updateTotalMoneyAvailable(totalMoney) {
      // Emitir el evento al componente padre (BudgetMenu)
      this.$emit("update-total-money-available", totalMoney);
    }
  }
};
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

ul{
   list-style-type: none;
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
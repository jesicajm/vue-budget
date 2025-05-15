<template>
  <form @submit.prevent="addTransaction" class="form-transaction">
    <div class="form-transaction__inputs">
      <input type="date" id="date" class="input" v-model="transaction.date" required />
      <input type="text" id="payee" class="input" v-model="transaction.payee" required />
      <div class="input section-manually__input-to">
        <span>{{ selectAccount }}: {{ selectCategory }}</span>
        <svg
          @click="showGroupCategories"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </div>
      <menu-assign-categories
        class="group-category"
        v-if="isVisibleGroupCategories"
        @selected-category="setCategoryAccount"
      ></menu-assign-categories>
      <input
        type="number"
        id="outflow"
        class="input"
        v-model.number="transaction.outflow"
        required
      />
      <input
        type="number"
        id="amount"
        class="input"
        v-model.number="transaction.inflow"
        required
      />
    </div>
    <div class="form-transaction__actions">
      <button @click="hideAddTransaction()">Cancelar</button>
      <button @click="addTransaction()">Guardar</button>
      <button>Guardar y agregar otra</button>
    </div>
  </form>
</template>


<script>
import MenuAssignCategories from "./MenuAssignCategories.vue";

export default {
  emits: ['hide-add-transaction'],
  props:['budgetId'],
  components: {
    MenuAssignCategories,
  },
  data() {
    return {
      isVisibleGroupCategories: false,
      transaction: {
        date: null,
        payee: null,
        outflow: null,
        inflow: null,
        category: null,
      },
      selectCategory: null,
      selectAccount: null,
    };
  },
  computed: {
    accountGroup() {
      return this.$store.getters["budget/accountGroup"];
    },
  },
  methods: {
    showGroupCategories() {
      this.isVisibleGroupCategories = !this.isVisibleGroupCategories;
    },
    setCategoryAccount(selectedCategory) {
      this.selectAccount = selectedCategory.account;
      this.selectCategory = selectedCategory.category;
      //  this.moneyAllocated = selectedCategory.moneyAssigned;
      //  this.moneyAvailable = selectedCategory.moneyAvailable;
      this.isVisibleGroupCategories = false;
    },
    hideAddTransaction(){
      this.$emit('hide-add-transaction')
    },
    addTransaction(){
      this.$store.dispatch("user/addTransaction", {
          budgetId:this.budgetId,
          accountName: this.selectAccount,
          category: this.selectCategory,
          outflow: this.outflow,
          inflow: this.inflow
       });
    }
  },
};
</script>


<style scoped>
.form-transaction {
  display: grid;
  grid-template-rows: 1fr 1fr; /* Dos filas con igual altura */
  width: 100%; /* Ocupar todo el ancho del contenedor padre */
  box-sizing: border-box;
}

.section-manually__input-to {
  display: flex;
  justify-content: space-between;
  border: 2px solid rgb(133, 133, 133);
  padding: 5px 2px;
  cursor: pointer;
}

.input {
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.form-transaction__inputs{
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Cinco columnas para la primera fila */
}

.form-transaction__actions{
  display: flex; /* Usamos Flexbox para alinear los botones */
  justify-content: flex-end; /* Alinear los botones a la izquierda */
  gap: 10px; /* Espaciado entre botones */
  padding: 10px;
  background-color: #e0e0e0;
  box-sizing: border-box;
}

</style>
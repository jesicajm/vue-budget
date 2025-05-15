<template>
  <base-form-category class="allocated-form">
    <div class="header">
      <button type="button" @click="showSection('auto')">Auto</button>
      <button type="button" @click="showSection('manually')">Manual</button>
    </div>
    <section class="section-auto" v-if="isVisibleAuto">
      <div class="section-auto__item">
        <span>Subfinanciado</span>
        <span>$0</span>
      </div>
      <div class="section-auto__item">
        <span>Asignado el mes pasado</span>
        <span>$0</span>
      </div>
      <div class="section-auto__item">
        <span>Gastado el mes pasado</span>
        <span>$0</span>
      </div>
      <div class="section-auto__item">
        <span>Promedio asignado</span>
        <span>$0</span>
      </div>
      <div class="section-auto__item">
        <span>Gasto promedio</span>
        <span>$0</span>
      </div>
      <div class="section-auto__item">
        <span>Restablecer montos disponibles</span>
        <span>$0</span>
      </div>
      <div class="section-auto__item">
        <span>Restablecer montos asignados</span>
        <span>$0</span>
      </div>
    </section>
    <section class="section-manually" v-else>
      <div class="section-manually__input-assign">
        <label>Asignar:</label>
        <input
          :value="valueMoneyAllocate"
          placeholder="Ingrese una cantidad"
          @input="event => (valueMoneyAllocate = event.target.value)"
        >
      </div>
      <label>A:</label>
      <div class="section-manually__input-to">
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
      <div class="section-manually__actions">
        <button @click="hideAllocatedForm" type="button">Cancelar</button>
        <button @click="submitMoneyAllocate" type="button">Asignar</button>
      </div>
       <menu-assign-categories
          class="group-category"
          v-if="isVisibleGroupCategories"
          @selected-category="setCategoryAccount"
       >
       <p class="categories-group__tittle">
          Categorias Presupuesto
        </p></menu-assign-categories>
    </section>
  </base-form-category>
</template>

<script>
import BaseFormCategory from "./UI/BaseFormCategory.vue";
import MenuAssignCategories from './MenuAssignCategories.vue';

export default {
  emits:['hide-allocated-form','new-value-assigned','selected-category'],
  props: [ "idBudget", 'totalMoneyAvailable'],
  components: {
    BaseFormCategory,
    MenuAssignCategories
  },
  data() {
    return {
      valueMoneyAllocate: this.totalMoneyAvailable,
      isVisibleAuto: true,
      isVisibleManually: false,
      isVisibleGroupCategories: false,
      selectCategory: null,
      selectAccount: null,
      moneyAllocated: 0,
      moneyAvailable: 0,
      creditBalance: 0
    };
  },
  watch: {
    isVisibleManually(value) {
      if (!value) {
        this.isVisibleGroupCategories = false;
      }
    }
  },
  methods: {
    showSection(section) {
      if (section === "auto") {
        this.isVisibleManually = false;
        this.isVisibleAuto = true;
      } else {
        this.isVisibleAuto = false;
        this.isVisibleManually = true;
      }
    },
    showGroupCategories() {
      this.isVisibleGroupCategories = true;
    },
    hideAllocatedForm() {
        this.$emit('hide-allocated-form');
    },
    setCategoryAccount(selectedCategory){
       this.selectAccount = selectedCategory.account;
       this.selectCategory = selectedCategory.category;
       this.moneyAllocated = selectedCategory.moneyAssigned;
       this.moneyAvailable = selectedCategory.moneyAvailable;
       this.isVisibleGroupCategories = false;

    },
    submitMoneyAllocate(){
       this.valueMoneyAllocate = Number(this.valueMoneyAllocate);
       this.moneyAllocated += this.valueMoneyAllocate;
       this.moneyAvailable += this.valueMoneyAllocate;
       
       this.$store.dispatch("budget/setMoneyAssigned", {
          idBudget:this.idBudget,
          nameCategory: this.selectCategory,
          nameAccount: this.selectAccount,
          updateAssignedCategory: this.moneyAllocated,
          updateAvailableCategory: this.moneyAvailable
       });

       this.$store.dispatch("budget/updateMoneyAllocate", this.moneyAllocated);
       
       this.$emit('new-value-assigned', this.valueMoneyAllocate);

       this.$emit('hide-allocated-form');
    }
  },
};
</script>

<style scoped>
.allocated-form {
  width: 288px;
}

.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

button {
  border: none;
  background: white;
  border-bottom: solid 2px blue;
}

button:active {
}

section {
  color: rgb(133, 127, 127);
}

.section-auto__item {
  display: flex;
  justify-content: space-between;
}

.section-manually__input-assign {
  display: grid;
}

.section-manually__input-to {
  display: flex;
  justify-content: space-between;
  border: 2px solid rgb(133, 133, 133);
  padding: 5px 2px;
  cursor: pointer;
}

.section-manually__actions {
  display:flex;
  justify-content:flex-end;
  margin-top: 12px;
}

.section-manually__actions:first-child{
   margin-right: 10px;
}

.categories-group__tittle {
  margin: 0;
  border-bottom: 1px solid rgb(161, 152, 152);
  font-weight: bold;
}

</style>
<template>
  <base-form-category class="form-fix">
    <p>Desasignar la asignación de dinero de</p>
    <div class="form-fix__input">
      <svg
        @click="showGroupCategories"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        color="blue"
        fill="currentColor"
        class="bi bi-caret-down-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
        />
      </svg>
    </div>
    <div class="form-fix__actions">
      <button @click="hideAddCategory">Cancelar</button>
      <button>Ok</button>
    </div>
    <menu-assign-categories
        class="group-category"
        v-if="isVisibleGroupCategories"
        :account-group="accountGroup"
        @selected-category="setCategoryAccount"
    ></menu-assign-categories>
  </base-form-category>
</template>

<script>
import BaseFormCategory from "./UI/BaseFormCategory.vue";
import MenuAssignCategories from './MenuAssignCategories.vue';

export default {
  components: {
    MenuAssignCategories,
    BaseFormCategory
  },
  emits:['hide-allocated-form','new-value-assigned','selected-category'],
  props: ["accountGroup", "idBudget", 'totalMoneyAvailable'],
  data() {
    return {
        isVisibleGroupCategories: false,
        selectCategory: null,
        selectAccount: null,
        moneyAllocatedCategory: 0,
    }
  },
  methods: {
    showGroupCategories() {
      this.isVisibleGroupCategories = true;
    },
    setCategoryAccount(selectedCategory){
       this.selectAccount = selectedCategory.account;
       this.selectCategory = selectedCategory.category;
       this.moneyAllocatedCategory = selectedCategory.moneyAssigned;
    },
  },
};
</script>

<style scoped>
.form-fix {
  width: 310px;
}

.form-fix p {
  color: rgb(161, 156, 156);
  margin: 0;
}

.form-fix__input {
  display: flex;
  justify-content: flex-end;
  border: 2px solid rgb(34, 33, 33);
  padding: 5px 2px;
  cursor: pointer;
}

.form-fix__input svg {
}

.form-fix__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.form-fix__actions button {
  padding: 10px;
  margin-right: 12px;
}

.group-category {
  margin-top: 77.5px; 
}
</style>

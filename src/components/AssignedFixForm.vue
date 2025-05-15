<template>
  <base-form-category class="form-fix">
    <p>Desasignar la asignación de dinero de</p>
    <div class="form-fix__input">
      <span>{{ selectAccount }}: {{ selectCategory }}</span>
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
      <button type="button" @click="hideAddCategory">Cancelar</button>
      <button type="button" @click="submitMoneyAllocate">Ok</button>
    </div>
    <menu-assign-categories
        class="group-category"
        v-if="isVisibleGroupCategories"
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
  props: ["idBudget", 'totalMoneyAvailable'],
  data() {
    return {
        isVisibleGroupCategories: false,
        selectCategory: null,
        selectAccount: null,
        moneyAllocated: 0,
        moneyAvailable:0,
        valueUnassign: 0
    }
  },
  methods: {
    showGroupCategories() {
      this.isVisibleGroupCategories = true;
    },
    setCategoryAccount(selectedCategory){
       this.selectAccount = selectedCategory.account;
       this.selectCategory = selectedCategory.category;
       this.moneyAllocated = selectedCategory.moneyAssigned;
       this.moneyAvailable = selectedCategory.moneyAvailable;
       this.isVisibleGroupCategories = false;
    },
    submitMoneyAllocate(){
        console.log(this.totalMoneyAvailable);
        console.log(this.moneyAvailable);
        if(this.totalMoneyAvailable <= this.moneyAvailable){
        
          const remaining =  this.totalMoneyAvailable + this.moneyAvailable;
          console.log(remaining)

          if(remaining <= 0){
             this.moneyAllocated -= this.moneyAvailable;
             this.valueUnassign = this.moneyAvailable;
             this.moneyAvailable = 0;
             console.log(this.moneyAllocated);
             console.log(this.valueUnassign);
             console.log(this.moneyAvailable);
          }else{
             this.valueUnassign = this.moneyAvailable - remaining;
             this.moneyAllocated -= this.moneyAvailable - remaining;
             this.moneyAvailable -= this.moneyAvailable - remaining;
             
             console.log(this.moneyAllocated);
             console.log(this.valueUnassign);
             console.log(this.moneyAvailable);
          }

          this.$store.dispatch("budget/setMoneyAssigned", {
            idBudget: this.idBudget,
            nameCategory: this.selectCategory,
            nameAccount: this.selectAccount,
            updateAssignedCategory: this.moneyAllocated,
            updateAvailableCategory: this.moneyAvailable,
          });

          this.$emit('new-value-assigned', this.valueUnassign);

        } 

        this.$emit('hide-allocated-form');

    }
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
  justify-content: space-between;
  border: 2px solid rgb(34, 33, 33);
  padding: 5px 2px;
  cursor: pointer;
}

.form-fix__input span{
   color:gray;
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

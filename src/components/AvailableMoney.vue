<template>
  <div class="available-money" :class="availableMoneyStatus">
    <p>
      $ {{ totalMoneyAvailable }}<span>{{ textAvailableMoney }}</span>
    </p>
    <div class="available-money__allocated">
      <svg
        v-if="this.totalMoneyAvailable === 0"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-check-circle-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </svg>
      <button
        v-if="this.totalMoneyAvailable > 0 || this.totalMoneyAvailable < 0"
        @click="showForm"
        :class="buttonStatus"
      >
        {{ this.totalMoneyAvailable > 0 ? "Asignar" : "Arregla esto" }}
      </button>
      <assigned-fix-form
        class="available-money__fix-form"
        v-if="isVisibleFixForm"
        :id-budget="idBudget"
        :account-group="accountGroup"
        :total-money-available="totalMoneyAvailable"
        @new-value-assigned="addValueUnassigned"
        @hide-allocated-form="hideFixForm"
      ></assigned-fix-form>
      <allocated-form
        class="available-money__allocated-form"
        v-if="isVisibleFormAllocate"
        :account-group="accountGroup"
        :id-budget="idBudget"
        :total-money-available="totalMoneyAvailable"
        @new-value-assigned="subtractValueAssigned"
        @hide-allocated-form="hideAllocatedForm"
      ></allocated-form>
    </div>
  </div>
</template>

<script>
import AllocatedForm from "./AllocatedForm.vue";
import AssignedFixForm from './AssignedFixForm.vue';

export default {
  props: ["accountGroup", "idBudget", "balanceNewAccount"],
  components: { AllocatedForm, AssignedFixForm },
  data() {
    return {
      totalMoneyAvailable: 0,
      isVisibleFormAllocate: false,
      isVisibleFixForm: false,
      moneyAllocated: 0,
      creditBalance: 0
    };
  },
  created() {
    console.log("from created avalibleMoney");
    this.calculateTotalMoneyAllocate();
  },
  watch: {
    balanceNewAccount(value) {
      this.totalMoneyAvailable += value;
    },
  },
  computed: {
    availableMoneyStatus() {
      if (this.totalMoneyAvailable > 0) {
        return { positive: true };
      } else if (this.totalMoneyAvailable === 0) {
        return { zero: true };
      } else {
        return { negative: true };
      }
    },
    buttonStatus() {
      if (this.totalMoneyAvailable > 0) {
        return { positiveButton: true };
      } else if (this.totalMoneyAvailable === 0) {
        return { zeroButton: true };
      } else {
        return { negativeButton: true };
      }
    },
    textAvailableMoney() {
      if (this.totalMoneyAvailable > 0) {
        return "Listo para asignar";
      } else if (this.totalMoneyAvailable === 0) {
        return "Todo el dinero asignado";
      } else {
        return "Asignaste más de lo que tienes";
      }
    },
  },
  methods: {
    showForm() {
      if(this.totalMoneyAvailable > 0){
        this.isVisibleFormAllocate = !this.isVisibleFormAllocate;
      }else if(this.totalMoneyAvailable < 0){
        this.isVisibleFixForm = !this.isVisibleFixForm;
      }
    
    },
    hideAllocatedForm() {
      this.isVisibleFormAllocate = false;
    },
    hideFixForm(){
      this.isVisibleFixForm = false;
    },
    setTotalMoneyAvailable(moneyAvailable) {
      this.totalAllocatedMoney = moneyAvailable;
    },
    setCategoryAccount(selectedCategory){
       this.selectAccount = selectedCategory.account;
       this.selectCategory = selectedCategory.category;
       this.moneyAllocatedCategory = selectedCategory.moneyAssigned;
    },
    subtractValueAssigned(newValueAssigned) {
      this.totalMoneyAvailable -= newValueAssigned;
    },
    addValueUnassigned(valueUnassign){
      this.totalMoneyAvailable += valueUnassign;
    },
    calculateTotalMoneyAllocate() {
      for (const account of this.accountGroup) {
        account.categories.forEach(
          (category) => (this.moneyAllocated += category.assigned)
        );
      }

      console.log(this.moneyAllocated);

      this.$store.getters["user/filterDebitAccounts"].forEach(
        (account) => (this.creditBalance += account.accountBalance)
      );

      console.log(this.creditBalance);

      this.totalMoneyAvailable = this.creditBalance - (this.moneyAllocated);
      console.log(this.totalMoneyAvailable);

      this.$emit("set-total-money-available", this.totalMoneyAvailable);
    },
    submitMoneyAllocate(){
       this.moneyAllocatedCategory += Number(this.valueMoneyAllocate);
       
       this.$store.dispatch("budget/setMoneyAssigned", {
          idBudget:this.idBudget,
          nameCategory: this.selectCategory,
          nameAccount: this.selectAccount,
          updateAssignedCategory: this.moneyAllocatedCategory 
       });

       console.log(this.valueMoneyAllocate);

       this.$emit('new-value-assigned', this.valueMoneyAllocate);

       this.$emit('hide-allocated-form');
    }
  },
};
</script>


<style scoped>
.available-money {
  display: flex;
  border-radius: 12px;
  padding: 8px;
  color: white;
  height: 58px;
}

.available-money p {
  display: grid;
  margin-right: 20px;
}

.available-money__allocated {
  position: relative;
}

.available-money__allocated-form {
  position: absolute;
  top: 62px;
  left: -106.875px;
}

.available-money__allocated button {
  padding: 10px;
  color: white;
  margin: auto;
}

.positive {
  background: rgb(103, 194, 103);
}

.zero {
  background: rgb(173, 171, 171);
}

.negative {
  background: rgb(238, 115, 115);
}

.positiveButton {
  background: rgb(83, 173, 83);
  border: rgb(83, 173, 83);
}

/*.zeroButton{
    background: rgb(138, 133, 133);
    border: rgb(138, 133, 133);
}*/

.negativeButton {
  background: rgb(197, 37, 37);
  border: rgb(197, 37, 37);
}

.available-money__fix-form { 
    position: absolute;
    top: 62px;
    left: -106.875px;
}
</style>
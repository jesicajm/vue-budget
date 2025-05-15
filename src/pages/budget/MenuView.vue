<template>
  <div class="menu">
    <add-account v-if="isVisibleAddAccount" @close-add-account="closeAddAccountHandler" :budget-id="budgetId" ></add-account>
    <set-budget v-if="!isLoading" :budget-id="budgetId"></set-budget>
    <h4 @click="loadBudget">Presupuesto</h4>
    <accounts-list
      v-if="!isLoading"
      @account-selected="$emit('account-selected', $event)"
      @show-edit-account="$emit('show-edit-account', $event)"
    ></accounts-list>
    <div>
      <button @click="showAddAccount" class="menu-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          color="blue"
          fill="currentColor"
          class="bi bi-plus-circle-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
          />
        </svg>
        
        Agregar cuenta
      </button>
    </div>
    </div>
</template>

<script>
import SetBudget from "../../components/SetBudget.vue";
import AccountsList from "../../components/AccountsList.vue";
import AddAccount from "../../components/AddAccount.vue";


export default {
  props:['budgetId'],
  emits: ['account-selected','show-edit-account'],
  components: {
    AddAccount,
    SetBudget,
    AccountsList,
  },
  data() {
    return {
      isVisibleAddAccount: false,
      isLoading: false,
      accountBalance: null,
    };
  },
  methods:{
    showAddAccount() {
      this.isVisibleAddAccount = !this.isVisibleAddAccount;
    },
    closeAddAccountHandler() {
        this.isVisibleAddAccount = false;
    },
  }
}
</script>

<style scoped>
.menu {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
  align-self: stretch;
  background: rgb(99, 99, 163);
}
</style>
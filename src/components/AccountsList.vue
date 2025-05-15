<template>
  <div>
    <div>
      <div class="menu-item">
        <p
          v-if="budgetAccounts.length === 0"
          class="menu-item__without-accounts"
        >
          Sin cuentas
          <br />
          No puede presupuestar sin agregar cuentas a YNAB primero. ¿Qué tal si
          agregamos uno ahora?
        </p>
        <div v-else class="menu-item__with-accounts">
          <group-accounts
            v-if="nearSpend.length > 0"
            name-group-account="PRESUPUESTO"
            :acccount-total-balance="budgetBalance"
            @show-account-list="showAccountList('budget')"
            @hide-account-list="hideAccountList('budget')"
          >
            <ul v-if="isVisibleBudgetList" class="account-list">
              <item-budget-account
                v-for="account in budgetAccounts"
                :key="account.accountName"
                :account-type="account.accountType"
                :account-name="account.accountName"
                :account-balance="account.accountBalance"
                @account-selected="$emit('account-selected', $event)"
                @show-edit-account="$emit('show-edit-account', $event)"
                :class="{ selected: account.accountName === selectedAccount }"
              >
              </item-budget-account>
            </ul>
          </group-accounts>
          <group-accounts
            v-if="loans.length > 0"
            name-group-account="PRÉSTAMOS"
            :acccount-total-balance="totalCreditBalance"
            @show-account-list="showAccountList('loans')"
            @hide-account-list="hideAccountList('loans')"
          >
            <ul v-if="isVisibleLoansList" class="account-list">
              <item-budget-account
                v-for="account in loans"
                :key="account.accountName"
                :account-type="account.accountType"
                :account-name="account.accountName"
                :account-balance="account.accountBalance"
                @account-selected="$emit('account-selected', $event)"
                @show-edit-account="$emit('show-edit-account', $event)"
                :class="{ selected: account.accountName === selectedAccount }"
              >
              </item-budget-account>
            </ul>
          </group-accounts>
          <group-accounts
            v-if="tracking.length > 0"
            name-group-account="SEGUIMIENTO"
            :acccount-total-balance="trackingBalance"
            @show-account-list="showAccountList('tracking')"
            @hide-account-list="hideAccountList('tracking')"
          >
            <ul v-if="isVisibleTrackingList" class="account-list">
              <item-budget-account
                v-for="account in tracking"
                :key="account.accountName"
                :account-type="account.accountType"
                :account-name="account.accountName"
                :account-balance="account.accountBalance"
                @account-selected="$emit('account-selected', $event)"
                @show-edit-account="$emit('show-edit-account', $event)"
                :style="{
                  color:
                    account.accountName === selectedAccount ? 'red' : 'green',
                }"
              >
              </item-budget-account>
            </ul>
          </group-accounts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemBudgetAccount from "./ItemBudgetAccount.vue";
import GroupAccounts from "./GroupAccounts.vue";

export default {
  emits: ["budget-name", "show-edit-account", "account-selected"],
  components: {
    ItemBudgetAccount,
    GroupAccounts,
  },
  data() {
    return {
      isVisibleMenu: false,
      isVisibleNewBudget: false,
      isVisibleBudgetList: true,
      isVisibleLoansList: true,
      isVisibleTrackingList: true,
      accounts: null,
      isOver: false,
      budgetBalance: 0,
      creditBalance: 0,
      trackingBalance: 0,
    };
  },
  computed: {
    showMenu() {
      return this.isVisibleMenu;
    },
    budgetAccounts() {
      return this.$store.getters["user/userAccounts"];
    },
    nearSpend() {
      return this.$store.getters["user/filterNearSpend"];
    },
    loans() {
      return this.$store.getters["user/filterCredtAccounts"];
    },
    tracking() {
      return this.$store.getters["user/filterTrackingAccounts"];
    },
    totalCreditBalance() {
      this.$store.getters["user/filterCredtAccounts"].forEach(
        (account) => (this.creditBalance -= account.accountBalance)
      );
      return this.creditBalance;
    },
  },
  mounted() {
    console.log(this.userAccounts);
  },
  watch: {
    budgetAccounts() {
      console.log("from watch budgetAccounts");
      this.budgetBalance = 0;
    },
    loans() {
      console.log("from watch  loans");
      this.creditBalance = 0;
    },
    tracking() {
      console.log("from watch tracking");
      this.trackingBalance = 0;
    },
  },
  methods: {
    toggleMenu() {
      this.isVisibleMenu = !this.isVisibleMenu;
    },
    showNewBudget() {
      this.isVisibleNewBudget = true;
      this.isVisibleMenu = false;
    },
    closeNewBudget() {
      this.isVisibleNewBudget = false;
    },
    showAccountList(nameList) {
      if (nameList == "budget") {
        this.isVisibleBudgetList = true;
      } else if (nameList == "loans") {
        this.isVisibleLoansList = true;
      } else if (nameList == "tracking") {
        this.isVisibleTrackingList = true;
      }
    },
    totalBudgetBalance() {
      const accounts = this.nearSpend;
      this.budgetBalance = accounts.reduce((acc, account) => {
        if (
          account.accountType !== "Tarjeta de crédito" &&
          account.accountType !== "Línea de crédito"
        ) {
          return acc + account.accountBalance;
        }
        return acc - account.accountBalance;
      }, 0);
    },
    totalTrackingAccounts() {
      const accounts = this.tracking; // Evitar múltiples llamadas a getter
      this.trackingBalance = accounts.reduce((acc, account) => {
        return account.accountType === "Activo"
          ? acc + account.accountBalance
          : acc - account.accountBalance;
      }, 0);
    },
    hideAccountList(nameList) {
      if (nameList == "budget") {
        this.isVisibleBudgetList = false;
      } else if (nameList == "loans") {
        this.isVisibleLoansList = false;
      } else if (nameList == "tracking") {
        this.isVisibleTrackingList = false;
      }
    },
    budgetIsOver() {
      return (this.isOver = true);
    },
    // calculateTotalAccountBalance(newAccount) {
    //   if (
    //     this.$store.getters["user/filterDebitAccounts"].includes(newAccount)
    //   ) {
    //     if (
    //       newAccount !== "Tarjeta de crédito" &&
    //       newAccount !== "Línea de crédito"
    //     ) {
    //       this.budgetTotalBalance += newAccount;
    //     } else if (
    //       newAccount === "Tarjeta de crédito" ||
    //       newAccount === "Línea de crédito"
    //     ) {
    //       this.budgetTotalBalance -= newAccount;
    //     }
    //   }
    // },
  },
};
</script>

<style scoped>
section {
  padding: 15px;
  width: 100%;
  font-size: 15px;
}

.menu-item__without-accounts {
  padding: 10px;
  background: rgb(78, 78, 133);
  border-radius: 5px;
  color: white;
  margin: 0;
}

.menu-item__with-accounts {
  color: white;
}

.account-list {
  list-style: none;
  padding: 0;
}

/*.ccount-list li {
   display: grid;
   grid-template-columns: 1fr 4fr 2fr;
   align-items: center;
   padding: 8px;
   color: white;
}*/

.account-list li:hover {
  background: rgb(41, 41, 73);
}

.selected {
  background: rgb(58, 58, 148);
}
</style>

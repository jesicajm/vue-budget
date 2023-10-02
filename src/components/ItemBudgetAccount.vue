<template>
  <li  class="item-account" @mouseenter="isVisibleEdit = true" @mouseleave="isVisibleEdit = false">
    <div>
      <svg
        v-if="isVisibleEdit"
        @click="showEditAccount"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="currentColor"
        class="bi bi-pen-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
        />
      </svg>
    </div>
    <div class="item-account__data" @click="selectAccount">
       <span>{{ accountName }}</span>
    <span
      :class="{
        negativo:
          creditAccounts.includes(accountType) || this.accountType === 'Pasivo',
      }"
      >{{ negativeBalance }}${{ accountBalance }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: ["accountName", "accountBalance", "accountType"],
  emits: ["select-account", 'show-edit-account','select-account'],
  data() {
    return {
      creditAccounts: [
        "Tarjeta de crédito",
        "Línea de crédito",
        "Hipoteca",
        "Préstamo para automóvil",
        "Préstamo para estudiantes",
        "Préstamo personal",
        "Otra deuda",
      ],
      isVisibleEdit: false,
    };
  },
  computed: {
    negativeBalance() {
      if (
        this.creditAccounts.includes(this.accountType) ||
        this.accountType === "Pasivo"
      ) {
        return "-";
      } else {
        return "";
      }
    },
  },
  methods:{
    showEditAccount(){
      this.$emit('show-edit-account', {
        accountName: this.accountName, 
        accountBalance: this.accountBalance});
    },
    selectAccount(){
      this.$emit('select-account');
    }
  }
};
</script>

<style>
.item-account {
  display: grid;
  grid-template-columns: 1fr 6fr;
  align-items: center;
  padding: 8px 0;
  color: white;
}

.item-account__data {
   display: grid;
   grid-template-columns: 4fr 2fr;
}
.negativo {
  color: red;
  padding: 1px 5px;
  background: white;
  border-radius: 15px;
}
</style>
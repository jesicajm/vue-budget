<template>
  <div class="backdrop"></div>
  <dialog open class="card-editAccount">
    <div class="card-editAccount__header">
      <h1>Editar cuenta</h1>
      <svg @click="closeEditAccount" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
    <h2 class="card-editAccount__tittle">Información de la cuenta</h2>
    <div class="card-editAccount__body">
      <div>
        <label>Nombre de cuenta</label>
        <input v-model="localAccountName"/>
        <p v-if="nameExists" class="card-NewAccount__invalid-form"> Este nombre de cuenta ya existe</p>
        <label>Notas de cuenta</label>
        <textarea v-model.trim="budgetName"></textarea>
      </div>
      <div>
        <h2 class="card-editAccount__caption">Editar cuenta</h2>
        <input type="number" v-model.number="localAccountBalance" />
        <p>
          Se creará automáticamente una transacción de ajuste si cambia esta
          cantidad.
        </p>
      </div>
    </div>
    <div class="card-editAccount__actions">
      <div>
        <button @click="deleteAccount">Eliminar cuenta</button>
      </div>
      <div>
        <button @click="closeEditAccount" type="button">Cancelar</button>
        <button @click="submitEditAccount">Guardar</button>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  emits:['close-edit-account', 'change-account', 'change-menu-budget'],
  props:['accountName', 'accountBalance', 'accountType', 'idBudget'],
  data() {
    return {
      localAccountName: this.accountName,
      localAccountBalance: this.accountBalance,
      originalAccountName: this.accountName,
      inflow: null,
      outflow: null,
      updateBalance: this.accountBalance,
      nameExists: false
    };
  },
  created(){
      console.log('from edit account');
      console.log(this.accountBalance);
      console.log(this.balance);
  },
  watch:{
      localAccountName(newName) {
          this.nameExists = this.$store.getters['user/userAccounts'].some(
            account => account.accountName.toLowerCase() === newName.toLowerCase()
          );
      }
  },
  methods:{
      closeEditAccount(){
         this.$emit('close-edit-account');
      },
      async submitEditAccount(){
        if (this.nameExists) {
            return; // Si el nombre de la cuenta ya existe, no hacer nada
        }

        if(this.localAccountBalance < this.accountBalance){
           this.inflow = this.accountBalance - this.localAccountBalance; 
        }else if(this.localAccountBalance > this.accountBalance){
           this.outflow = this.localAccountBalance - this.accountBalance;
        }

        if (this.localAccountBalance === this.accountBalance && this.localAccountName === this.accountName) {
          return;
        }

       await this.$store.dispatch('user/editAccount', {
           idBudget: this.idBudget,
           accountName: this.localAccountName,
           originalAccountName: this.originalAccountName,
           inflow: this.inflow,
           outflow: this.outflow,
           accountBalance: this.localAccountBalance
        })

        this.$emit('change-account', this.localAccountName);

        this.closeEditAccount();
      },
      async deleteAccount(){
        await this.$store.dispatch('user/deleteAccount', {
           idBudget: this.idBudget,
           accountName: this.localAccountName
        })

        if(this.accountType === 'Ahorros' || this.accountType === 'Cuenta corriente' || this.accountType ==='Efectivo'){
           this.$store.dispatch('budget/updateDebitBalance', -this.localAccountBalance);
        }

        this.$emit('change-menu-budget');

        this.closeEditAccount();
      }
  }
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.card-editAccount {
  position: fixed;
  z-index: 100;
  display: grid;
  max-width: 30rem;
  height: 31rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.card-editAccount__header {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px grey;
}

.card-editAccount__header h1 {
  font-size: 22px;
}

.card-NewAccount__invalid-form {
    padding: 5px;
    color:white;
    background: red;
    margin: 0;
}

h2 {
  font-size: 17px;
}

label,
p {
  font-size: 15px;
}

.card-editAccount__body {
  border-bottom: solid 1px grey;
}

.card-editAccount__body div {
  display: grid;
}

.card-editAccount__body div:first-child {
  border-bottom: solid 1px grey;
  padding-bottom: 40px;
}

.card-editAccount__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

dialog {
   position: fixed;
   z-index: 100;
}

</style>
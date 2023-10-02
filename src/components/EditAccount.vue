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
        <input :value="accountName" @input="event => name=event.target.value"/>
        <label>Notas de cuenta</label>
        <textarea v-model.trim="budgetName"></textarea>
      </div>
      <div>
        <h2 class="card-editAccount__caption">Editar cuenta</h2>
        <input :value="accountBalance" @input="event => balance=event.target.value"/>
        <p>
          Se creará automáticamente una transacción de ajuste si cambia esta
          cantidad.
        </p>
      </div>
    </div>
    <div class="card-editAccount__actions">
      <div>
        <button >Cerrar cuenta</button>
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
  emits:['close-edit-account'],
  props:['accountName', 'accountBalance', 'idBudget'],
  data() {
    return {
      name: null,
      balance:null,
      inflow: null,
      outflow: null,
      updateBalance: this.accountBalance
    };
  },
  methods:{
      closeEditAccount(){
         this.$emit('close-edit-account');
      },
      submitEditAccount(){
        if(this.updateBalance < this.balance){
           this.inflow = this.balance - this.updateBalance ; 
           this.updateBalance = this.balance;
        }else if(this.updateBalance > this.balance){
           this.outflow = this.updateBalance - this.balance;
           this.updateBalance = this.balance;
        }else{
           return;
        }

        this.$store.dispatch('user/editAccount', {
           idBudget: this.idBudget,
           accountName: this.accountName,
           inflow: this.inflow,
           outflow: this.outflow,
           accountBalance: this.updateBalance
        })

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

</style>
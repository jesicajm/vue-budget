<template>
    <div class="backdrop"></div>
    <dialog open>
      <base-card class="card-NewBudget">
        <h1 class="card-NewBudget__header">Nuevo presupuesto</h1>
        <div class="card-NewBudget__body">
            <label>Nombre presupuesto:</label>
            <input v-model.trim="budgetName">
        </div>
        <p v-if="!formIsValid"> {{ messageInvlidName }}</p>
        <div class="card-NewBudget__actions">
            <button @click="closeNewBudget">Cancelar</button>
            <button @click="submitNewBudget">Crear presupuesto</button>
        </div>
      </base-card>
    </dialog>
</template>

<script>
export default {
    emits:['close-new-budget'],
    data() {
        return {
            budgetName: null,
            formIsValid: true,
            messageInvlidName: null
        };
    },
    computed:{
        /*messageInvlidName(){
            if(!budgetName){
                return 'El nombre del presupuesto es requerido';
            }else{
                const budgets = this.$store.getters['budget/budgetsUser'];
                budgets.some(budget => budget.id.toLowerCase() === budgetNametoLowerCase())
            }
        }*/
    },
    methods:{
        closeNewBudget(){
            this.$emit('close-new-budget');
        },
        submitNewBudget(){
            this.formIsValid= true;

            const budgets = this.$store.getters['budget/userBudgets'];

            if(this.budgetName === null){
                this.formIsValid = false;
                this.messageInvlidName = 'El nombre del presupuesto es requerido'
                return;
            }else{
                const exitsName = budgets.some(budget => budget.id.toLowerCase() === this.budgetName.toLowerCase());
                if(exitsName){
                    this.formIsValid= false;
                    this.messageInvlidName = 'El nombre del presupuesto ya existe'
                    return;
                }
            }

            //this.$emit('budget-name', this.budgetName);

            const userId = this.$store.getters['user']; 
            this.$store.dispatch('budget/addBudget', {
                userId: userId,
                name: this.budgetName
            });

            this.closeNewBudget();

            this.$router.replace(`/budget/${this.budgetName}`);

        }
    }
};
</script>

<style scoped>
.backdrop{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
}

dialog {
   position: fixed;
   z-index: 100;
}

.card-NewBudget { 
  display: grid;
  place-content: center;
}

.card-NewBudget__header {
  border-bottom: solid 1px grey;
}

.card-NewBudget__actions {
  display: flex;
  justify-content: flex-end;
}
</style>
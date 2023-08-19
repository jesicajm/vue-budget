<template>
    <div class="backdrop"></div>
    <dialog open>
      <base-card class="card-editAccount">
        <h1 class="card-card-editAccount__header">Editar cuenta</h1> 
        <h2 class="card-card-editAccount__caption">Editar cuenta</h2>
        <div class="card-NewBudget__body">
            <label>Nombre de cuenta</label>
            <input v-model.trim="budgetName">
            <label>Notas de cuenta</label>
            <input v-model.trim="budgetName">
        </div>
        <h2 class="card-card-editAccount__caption">Editar cuenta</h2>
        <input v-model.trim="budgetName">
        <p>Se creará automáticamente una transacción de ajuste si cambia esta cantidad.</p>
        <div class="card-NewBudget__actions">
            <button @click="closeNewBudget">Cerrar cuenta</button>
            <div>
                <button @click="submitNewBudget">Cancelar</button>
                <button @click="submitNewBudget">Guardar</button>
            </div>    
        </div>
      </base-card>
    </dialog>
</template>

<script>

export default {
    data() {
        return {

        }
    }
}
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

.card-editAccount { 
  display: grid;
  place-content: center;
}

.card-card-editAccount__header {
  border-bottom: solid 1px grey;
}


</style>
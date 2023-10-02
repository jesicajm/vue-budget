<template>
    <new-budget v-if="isVisibleNewBudget" @close-new-budget="closeNewBudget" @budget-name="$emit('budget-name', $event)"></new-budget>
    <div>
        <h1>Tus presupuestos</h1>
        <ul v-if="!isLoading">
            <card-view-budget  
                class="card"
                v-for="budget in budgets" 
                :key="budget.id"
                :name-budget="budget.id"
                @select-budget="loadBudget(budget.id)"
                @delete-budget="deleteBudget(budget.id)"
            >
            </card-view-budget>
            <li class="card-newBudget">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              color="green"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
               @click="showNewBudget"
               >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
              /></svg
            >
            <p>Crear nuevo presupuesto</p>
            </li>
        </ul>
    </div>
</template>

<script>
import CardViewBudget from "../../components/CardViewBudget.vue";
import NewBudget from '../../components/NewBudget.vue'

export default {
    components:{
        CardViewBudget,
        NewBudget
    },
    data(){
        return {
           isVisibleNewBudget: false,
           isLoading: false,
        }
    },
    computed:{
        budgets(){
            return this.$store.getters['budget/userBudgets'];
        }
    },
    created(){
        this.loadBudgets();
    },
    methods:{
        async loadBudgets(){
            this.isLoading = true;
            await this.$store.dispatch("budget/loadBudgets");
            this.isLoading= false;
        },
        loadBudget(budgetId){
            console.log(budgetId);
            this.$router.replace(`/budget/${budgetId}`);
        },
        showNewBudget(){
            this.isVisibleNewBudget= true;
        },
        closeNewBudget(){
            this.isVisibleNewBudget= false;
        },
        deleteBudget(budgetId){
           this.$store.dispatch('budget/deleteBudget', budgetId); 
        }
    }     
}
</script>

<style scoped>
h1{
  font-size: 30px;
  margin: 30px;
}

ul{
    display: flex;
    margin: 20px 30px;
    padding: 0;
}

.card {
   margin: 0 8px;
}

li {
    display: grid;
    place-items: center;
    list-style: none;
    width: 250px;
    height: 250px;
    border: 1px solid rgb(224, 219, 219);
 }

svg {
    text-align: center;
 }

</style>
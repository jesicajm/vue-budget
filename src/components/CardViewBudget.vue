<template>
    <li class="card" @mouseenter="active=true" @mouseleave="active=false">
        <div class="backdrop" v-if="active">
            <div v-if="showDelete" class="delete-budget" @click="selectBudget">
                <p>{{ nameBudget }}</p>
            </div>
            <svg v-if="showDelete" @click="showConfirmDelete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="white" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
            <div v-if="isVisibleConfirmDelete" class="confirm-delete-budget">
                <p>Estas seguro que quieres eliminar el presupuesto "{{ nameBudget }}"</p>
                <div>
                    <button @click="hideConfirmDelete">Cancelar</button>
                    <button @click="deleteBudget">Delete</button>
                </div>
            </div>
        </div>
        <div class="card-content" @click="selectBudget">
            <div class="card-content__img"></div>
            <div class="card-content__title">
                <p> {{ nameBudget }}</p>
            </div>
        </div>    
    </li>
</template>

<script>


export default {
    props:['name-budget','budget-is-not-over'],
    emits:['select-budget', 'delete-budget'],
    data() {
        return {
            active: false,
            isVisibleConfirmDelete: false
        }
    },
    computed:{
       showDelete(){
          if(this.active && !this.isVisibleConfirmDelete){
            return true;
          }else if(this.isVisibleConfirmDelete){
            return false;
          }else{
            return false;
          }
       }
    },
    watch:{
        active(){
           this.isVisibleConfirmDelete = false; 
        } 
    },
    methods:{
        showConfirmDelete(){
            this.isVisibleConfirmDelete = true;
            this.isVisibleDelete = false;
        },
        selectBudget(){
            this.$emit('select-budget');
        },
        hideConfirmDelete(){
            this.isVisibleConfirmDelete = false;
        },
        deleteBudget(){
            this.$emit('delete-budget');
        }
    }
}
</script>


<style scoped>
.card {
    width: 250px;
    height: 250px;
    border: 1px solid rgb(224, 219, 219);
 }

 .backdrop{
    width: 250px;
    height: 250px;
    position: fixed;
    background-color: rgba(165, 161, 161, 0.75);
    z-index: 10;
}

.delete-budget p{
    display: grid;
    place-content: center;
    color: white;
    font-weight: bold;
    width: 230px;
    height: 170px;
    margin: center;
}

.backdrop svg {
    position: absolute;
    right: 12px;
    bottom: 12px;
    align-self: end;
}

.confirm-delete-budget {
    margin: 0;
    padding: 0 !important;
}

.confirm-delete-budget p{
    width: 230px !important;
    margin: 0;
    color: white;
    font-weight: bold;
}

.card div{
    padding: 10px;
 }

.confirm-delete-budget div{
    margin:0;
    padding: 0;
    text-align: center;
}


 .card-content__img{
    width: 180px;
    height: 120px;
    background: rgb(167, 165, 165);
 }

.card-content__title p{
    text-align: center;
}

 
</style>
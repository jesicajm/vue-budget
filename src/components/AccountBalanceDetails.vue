<template>
    <section class="account-details">
        <div class="account-details__actions">
           <div>
                <span>Agregar transacción</span>
                <span>Importación de archivos</span>
                <span>Edit</span>
                <span>Deshacer</span>
                <span>Rehacer</span>
            </div>
            <div>
                <span>Vista</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </div>
        </div>
        <div class="account-details__transactions">
            <div class="account-details__transactions-tittles"> 
                <span>FECHA</span>
                <span>TENEDOR</span>
                <span>CATEGORÍA</span>
                <span>MEMORÁNDUM</span>
                <span>SALIDA</span>
                <span>AFLUENCIA</span>
            </div>
            <ul class="account-details__transactions-data" >
                <item-transactions
                    v-for="transaction in accountTransactions"
                    :key="transaction"
                    :transaction-data="transaction"
                ></item-transactions>
            </ul>
        </div>
        
    </section>
</template>

<script>
import ItemTransactions from './ItemTransactions.vue'

export default {
    components: { ItemTransactions },
    props:['accountTransactions'],
    data() {
        
    },
    created() {
        console.log(this.accountTransactions)
    }
}
</script>

<style scoped>
.account-details {
    width: 100%;
    
}

.account-details__actions{
   display: flex;
   justify-content: space-between;  
   padding: 8px;
   color: blue;
   border-bottom: solid 1px #9d9dc9;
}

.account-details__actions span{
   margin-right: 15px;
}

.account-details__transactions {
    display: grid;
    grid-template-rows: repeat(2, auto);
}
        
.account-details__transactions-tittles {
   /* width: 100%;
    display:flex;
    align-items: baseline;*/
    display: grid;
    grid-template-columns: repeat(6,2fr);
    border-bottom: solid 1px #9d9dc9;
    padding: 3px 0;
}

.account-details__transactions-tittles span{
   margin-right: 15px;
   padding: 8px;
   border-right: solid 1px #9d9dc9;
}

.account-details__transactions-tittles span:first-child{
    font-weight: bold;
}

.account-details__transactions-data {
    list-style: none;
    border-bottom: solid 1px #9d9dc9;
    padding:0;
}

</style>

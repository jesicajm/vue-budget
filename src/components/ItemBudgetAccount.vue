<template>
    <li>
      <span>{{ accountName }}</span>
      <span :class="{ negativo: creditAccounts.includes(accountType) || this.accountType === 'Pasivo' }">{{ negativeBalance }}${{ accountBalance}}</span>
    </li>
</template>

<script>
export default {
    props:['accountName', 'accountBalance', 'accountType'],
    data(){
        return {
            creditAccounts: ['Tarjeta de crédito', 'Línea de crédito', 'Hipoteca','Préstamo para automóvil','Préstamo para estudiantes','Préstamo personal','Otra deuda']
        }
    },
    computed:{
        negativeBalance(){
            if(this.creditAccounts.includes(this.accountType) || this.accountType === 'Pasivo'){
                return '-';
            }else{
                return '';
            }
        }
    }

}

</script>

<style>
.negativo {
    color: red;
    padding: 1px 5px;
    background: white;
    border-radius: 15px;
}

</style>
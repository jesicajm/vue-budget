<template>
    <li>
        <div>
            <span>{{ dateFormat }}</span>
            <span></span>
            <span>{{ transactionData.category }}</span>
            <span></span>
            <span>{{ transactionData.outflow === null ? '' : `$${transactionData.outflow}`}}</span>
            <span>{{ transactionData.inflow === null ? '' : `$${transactionData.inflow}`}}</span>
        </div>
    </li>
</template>


<script>

export default {
    props:['transactionData'],
    data() {
        return {

        }
    },
    computed:{
        dateFormat(){
            return this.transactionData.date.toDate().toLocaleDateString();
        }
    }
}

</script>

<style scoped>
  li div{
    display: grid;
    grid-template-columns: repeat(6, 2fr);
  }

  li span{
   margin-right: 15px;
   padding: 8px;
  }
</style>
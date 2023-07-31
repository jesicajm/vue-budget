<template>
    <div class="available-money" :class="availableMoneyStatus">
        <p>$ {{ totalMoneyAvailable }}<span>{{ textAvailableMoney }}</span></p>
        <div class="available-money__allocated">
            <button  v-if="this.totalMoneyAvailable > 0 || this.totalMoneyAvailable < 0" @click="allocateAvailableMoney" :class="buttonStatus">{{ this.totalMoneyAvailable > 0 ? 'Asignar' : 'Arregla esto'}}</button>   
            <allocated-form 
               class="available-money__allocated-form" 
               v-if="isVisibleFormAllocate"
               :account-group="accountGroup"
               :id-budget="idBudget"
               :total-money-available="totalMoneyAvailable"
               @hide-allocated-form="hideAllocatedForm"></allocated-form>
        </div>
    </div>
</template>

<script>
import AllocatedForm from './AllocatedForm.vue';

export default {
    props:['accountGroup','idBudget'],
    components:{AllocatedForm},
    data() {
        return{
            totalMoneyAvailable: 0,
            isVisibleFormAllocate: false,
            moneyAllocated: 0,
            creditBalance: 0
        }
    },
    created(){
       console.log('from created avalibleMoney');
       this.calculateTotalMoneyAllocate();
    },
    computed:{
        availableMoneyStatus(){
            if(this.totalMoneyAvailable > 0){
                return { positive: true }
            }else if(this.totalMoneyAvailable === 0){
                return { zero: true }
            }else{
                return { negative: true }
            }
        },
      buttonStatus(){
        if(this.totalMoneyAvailable > 0){
            return { positiveButton: true }
        }else if(this.totalMoneyAvailable === 0){
            return { zeroButton: true }
        }else{
            return { negativeButton: true }
        }
      },
      textAvailableMoney(){
          if(this.totalMoneyAvailable > 0){
            return 'Listo para asignar';
           }else if(this.totalMoneyAvailable === 0){
            return 'Todo el dinero asignado';
          }else{
            return 'Asignaste más de lo que tienes';
          }
      }
    },
    methods:{
        allocateAvailableMoney(){
           this.isVisibleFormAllocate = !this.isVisibleFormAllocate
        },
        hideAllocatedForm(){
            this.isVisibleFormAllocate = false
        },
        setTotalMoneyAvailable(moneyAvailable){
            this.totalAllocatedMoney = moneyAvailable
        },
        calculateTotalMoneyAllocate(){
            for(const account of this.accountGroup){
                account.categories.forEach(category => this.moneyAllocated += category.assigned)
            }

            console.log(this.moneyAllocated);

            this.$store.getters['user/filterDebitAccounts'].forEach(account => this.creditBalance += account.accountBalance)

            console.log(this.creditBalance)

            this.totalMoneyAvailable = this.creditBalance - this.moneyAllocated;

            console.log(this.totalMoneyAvailable)

            this.$emit('set-total-money-available', this.totalMoneyAvailable)
        },
    }
}
</script>


<style scoped>
.available-money {
    display: flex;
    border-radius: 12px;
    padding: 8px;
    color: white;
    height: 58px;
}

.available-money p{
   display: grid;
   margin-right: 20px;
}

.available-money__allocated {
    position: relative;
}

.available-money__allocated-form{
   position: absolute;
   top: 62px;
   left: -106.875px;
} 

.available-money__allocated button{
   padding: 10px;
   color: white;
   margin: auto;
}

.positive{
   background: rgb(103, 194, 103);
}

.zero{
   background: rgb(173, 171, 171)
}

.negative{
   background: rgb(238, 115, 115);
}

.positiveButton {
    background: rgb(83, 173, 83);
    border: rgb(83, 173, 83);
}

/*.zeroButton{
    background: rgb(138, 133, 133);
    border: rgb(138, 133, 133);
}*/

.negativeButton{
    background: rgb(197, 37, 37);
    border: rgb(197, 37, 37);
}

</style>
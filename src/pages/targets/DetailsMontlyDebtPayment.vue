<template>
    <div>
        <span>Cada</span>
        <select v-model="every">
            <option value="lastDayOfMonth" ref="lastDayOfMonth">Ultimo dia del mes</option>
            <option value="31" ref="31">31ts</option>
            <option value="30" ref="30">30ts</option>
            <option value="29" ref="29">29ts</option>
            <option value="28" ref="28">28ts</option>
            <option value="27" ref="27">27ts</option>
        </select>
    </div>
</template>

<script>

export default {
    props:['updateBy', 'dataUpdate', 'updateByValue'],
    emits:['data-debt-payment'],
    data() {
        return {
            every: 'lastDayOfMonth'
        }
    },
    mounted(){
        if(!this.dataUpdate){
            let dataTarget = {
                by: this.$refs[this.every].innerHTML,
                everyValue: this.every
            }
            this.$emit('data-debt-payment', dataTarget);
        }else{
            this.every = this.updateByValue;
        }
    },
    watch:{
        every(){
            let dataTarget = {
                by: this.$refs[this.every].innerHTML,
                everyValue: this.every
            }
            this.$emit('data-debt-payment', dataTarget);
        }
    }   
}
</script>

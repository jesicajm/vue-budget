<template>
    <div class="target-period">
            <div class="target-period__buttons">
                <button @click="setSelectedPeriod('Semanal')" :class="classPeriodSelected('Semanal')" >Semanal</button>
                <button @click="setSelectedPeriod('Mensual')" :class="classPeriodSelected('Mensual')">Mensual</button>
                <button @click="setSelectedPeriod('Anual')" :class="classPeriodSelected('Anual')">Anual</button>
                <button @click="setSelectedPeriod('Personalizado')" :class="classPeriodSelected('Personalizado')">Personalizado</button>
            </div>
            <div class="target-period__type">
               <label for="ever" v-if="selectedPeriod === 'Semanal' || selectedPeriod === 'Mensual'">Cada</label>
               <label for="yearly" v-if="selectedPeriod === 'Anual'">A partir de</label>
               <select id="target-period-weekly" v-model="every" v-if="selectedPeriod === 'Semanal'" >
                  <option value="sunday" ref="sunday">Domingo</option>
                  <option value="monday" ref="monday">Lunes</option>
                  <option value="tuesday" ref="tuesday">Martes</option>
                  <option value="wednesday" ref="wednesday">Miercoles</option>
                  <option value="thursday" ref="thursday">Jueves</option>
                  <option value="friday" ref="friday">Viernes</option>
                  <option value="saturday" ref="saturday" >Sabado</option>
               </select>
               <select id="target-period" v-model="every" v-if="selectedPeriod === 'Mensual'">
                  <option value="lastDayOfMonth" ref="lastDayOfMonth">Ultimo dia del mes</option>
                  <option value="31" ref="31">31ts</option>
                  <option value="30" ref="30">30ts</option>
                  <option value="29" ref="29">29ts</option>
                  <option value="28" ref="28">28ts</option>
                  <option value="27" ref="27">27ts</option>
               </select>
               <div v-if="selectedPeriod === 'Anual'">
                   <input type="date" v-model="every">
               </div>
            <div v-if="selectedPeriod === 'Personalizado'" class="target-period__type">
                <label for="custom" >Primer vencimiento</label>
                <input type="date" v-model="every">
                <div>
                    <input @click="toggleeRepeat" :checked="repeat" name="byDate" type="checkbox">
                    <label for="byDate">Repetir</label>
                </div>
                <div v-if="repeat">
                    <label for="byDate">Cada</label>
                    <div>
                    <select v-model="times">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    <select v-model="period">
                        <option value="mes"> {{ howOftenMonth }}</option>
                        <option value="año">{{ howOftenYear }}</option>
                    </select>
                    </div>
                </div>
            </div>
            </div>    
        </div>
</template>

<script>

export default{
    props:['updateBy', 'updatePeriod', 'dataUpdate', 'updateByValue','updateCustomRepeat'],
    emits:['data-target','selected-every'],
    data(){
        return {
            selectedPeriod: 'Semanal',
            every: 'saturday',
            repeat: true,
            times: '1',
            period: 'mes',
            customRepeat: null
        } 
    },
    computed:{
        howOftenMonth(){
            if(this.times === '1'){
               return 'Mes'
            }else{
               return 'Meses'
            }
        },
        howOftenYear(){
            if(this.times === '1'){
               return 'Año'
            }else{
               return 'Años'
            }
        }
        /*customEvery(){
            return this.$ref[this.times] + ' ' + this.$ref[this.period];
        }*/
    },
    mounted(){
        if(!this.dataUpdate){
            let dataTarget = {
                selectedPeriod: this.selectedPeriod, 
                every: this.every,
                everyRef: this.everyRef,
                customRepeat: this.customRepeat
            }

            console.log('from mounted details needed')

           if(this.selectedPeriod === 'Anual'){
                dataTarget.every = this.every
            }else{
                dataTarget.every = this.$refs[this.every].innerHTML;
            }

            this.$emit('data-target', dataTarget);

        }else{
            this.selectedPeriod = this.updatePeriod;
            if(this.selectedPeriod === 'Anual'){
                this.every =  this.updateBy;
            }else if(this.selectedPeriod === 'Personalizado'){
                this.every =  this.updateBy;
                if(!this.updateCustomRepeat){
                    this.repeat = false;
                }else{
                    this.times = this.updateCustomRepeat.split(' ')[0];
                    this.period = this.updateCustomRepeat.split(' ')[1];
                    this.customRepeat = this.updateCustomRepeat;
                }
            }else{
                this.every = this.updateByValue;
            }
        }
        
    },
    watch:{
        dataUpdate(value){
            if(!value){
                this.selectedPeriod = 'Semanal';
                this.every = 'saturday';
            }
        }
    },
    updated(){
        console.log('from updated details needed ' + this.every)
        
        let dataTarget = {
            selectedPeriod: this.selectedPeriod, 
            every: this.every,
            everyValue: null,
            customRepeat: null
        }
   
        if(this.selectedPeriod === 'Semanal' || this.selectedPeriod === 'Mensual' ){
            dataTarget.every = this.$refs[this.every].innerHTML;
            dataTarget.everyValue = this.every;
            console.log('from not year' + dataTarget.everyValue)
        }else if(this.selectedPeriod === 'Personalizado' && this.repeat ){
               console.log(this.times);
               console.log(this.period);
               this.customRepeat =  this.times + ' ' + this.period;
               dataTarget.customRepeat = this.customRepeat
               console.log('from method: ' + this.customRepeat);
        }

        this.$emit('data-target', dataTarget);
    },
    methods:{
        setSelectedPeriod(period){
            this.selectedPeriod = period;
            if(this.selectedPeriod === 'Semanal'){
                this.every = 'saturday';
            }else if(this.selectedPeriod === 'Mensual'){
                this.every = "lastDayOfMonth";
            }else{
                this.every = new Date().toISOString().substr(0, 10);
            }  
        },
        toggleeRepeat(){
            this.repeat = !this.repeat;
        },      
        classPeriodSelected(period){
             if(this.selectedPeriod === period){
                return {selected:true};
            }else{
                return false;
            }
        }
    }   
}
</script>

<style scoped>
.target-period{
    display: grid;
    margin-top: 10px;
    border: grey solid 1px;
    background: rgba(232, 240, 247, 0.87);
    padding: 15px;
}

.target-period__buttons{
    display: grid;
    grid-template-columns: repeat(4,auto);
}

.target-period__type{
   display:grid;
}

.selected{
    background: blue;
}

.target-period__type label{
    margin-top:10px;
}
</style>
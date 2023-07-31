<template>
    <div class="select-byDate"> 
        <input @click="selectedByDate" :checked="byDate" name="byDate" type="checkbox">
        <label for="byDate" >Por fecha</label>
        <div v-if="byDate">
            <select v-model="month">
                <option value="Enero">Enero</option>
                <option value="Febrero">Febrero</option>
                <option value="Marzo">Marzo</option>
                <option value="Abril">Abril</option>
                <option value="Mayo">Mayo</option>
                <option value="Junio">Junio</option>
                <option value="Julio">Julio</option>
                <option value="Agosto">Agosto</option>
                <option value="Septiembre">Septiembre</option>
                <option value="Octubre">Octubre</option>
                <option value="Noviembre">Noviembre</option>
                <option value="Diciembre">Diciembre</option>
            </select>
            <select v-model="year">
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2072">2072</option>
            </select>
        </div>
    </div>
</template>

<script>

export default {
    props:['updateBy', 'dataUpdate'],
    emits:['data-saving'],
    data(){
        return {
           byDate: false,
           month:  'Febrero',
           year:  '2023',
           by: null
        }
    },
    computed:{
        byInput(){
            return this.month + ' ' + this.year; 
        }
    },
    mounted(){
       if(!this.dataUpdate){
           this.$emit('data-saving', this.by);
       }else {
            if(this.updateBy){
               this.byDate = true;
               this.month = this.updateBy.split(' ')[0];
               this.year = this.updateBy.split(' ')[1];
               this.by = this.updateBy;
            }else{
               this.by = this.updateBy;
            }
       }
       
    },
    watch:{
        dataUpdate(value){
            if(!value){
                this.byDate = false
                this.month =  'Febrero'
                this.year=  '2023'
                this.by =  null
            }
        },
        month(){
            this.$emit('data-saving', this.byInput);
        },
        year(){
            this.$emit('data-saving', this.byInput);
        },
        byDate(value){
            if(value){
               this.$emit('data-saving', this.byInput);
            }else{
               this.by = null;
               this.$emit('data-saving', this.by);
            }
        }
    },
    methods:{
        selectedByDate(){
            this.byDate = !this.byDate;
        }
    }
}
</script>

<style scoped>
.select-byDate{
    padding: 16px;
    background: #F5F5FA;
    border-radius: 4px;
    border: solid 2px #C7C7CC;
    margin-top: 10px;
}

input,
select{
    margin-right: 8px;
}

</style>

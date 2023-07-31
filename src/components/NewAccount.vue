<template>
    <base-form-category @submit.prevent="submitForm" class="card-category">
        <input placeholder="Agregar grupo" :class="{ invalid: !account.isValid }" v-model.trim="account.val">
            <p v-if="!formIsValid"> {{ messageInvlidName }}</p>
            <div>
                <button @click="hideAddCategory">Cancelar</button>
                <button>Ok</button>
            </div>
    </base-form-category>
</template>

<script>
export default {
    props:['accountGroup'],
    emits: ['hide-add-category', 'save-data'],
    data(){
        return {
           account: {
              val: '',
              isValid: true
           },
           formIsValid: true,
           messageInvlidName: null
        }
    },
    methods: {
        hideAddCategory(){
            this.$emit('hide-add-category');
        },
        validateForm(){
          this.formIsValid = true;
          if(this.account.val === ''){
            this.account.isValid = false;
            this.formIsValid = false;
          }
        },
        submitForm(){
            this.formIsValid = true;

            console.log(this.accountGroup);

            if(this.account.val === ''){
                this.account.isValid = false;
                this.formIsValid = false;
                this.messageInvlidName = 'El nombre del presupuesto es requerido';
            }else{
                const exitsName =  this.accountGroup.some(account => account.type.toLowerCase() === this.account.val.toLowerCase());
                if(exitsName){
                    this.formIsValid= false;
                    this.messageInvlidName = 'El nombre del presupuesto ya existe';
                    return;
                }
            }
            
            this.$emit('save-data', this.account.val);
        }
    }
}
</script>

<style scoped>
.card-category__content div{
   justify-self: end;
   margin-top: 20px;
}

div button {
   margin-left: 10px;
}

.invalid{
   border: 2px solid red;
}

.card-category__content p {
    color: #ffffff;
    background-color: red;
    padding: 6px;
    margin: 0;
}

</style>
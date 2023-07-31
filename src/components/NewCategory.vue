<template>
    <base-form-category @submit.prevent="submitForm" class="card-category">
        <input placeholder="Nueva categoria" :class="{invalid: !category.isValid}" v-model.trim="category.val" @blur="clearValidity">
            <p v-if="!category.isValid">El nombre de la categoría es obligatorio.</p>
            <div>
                <button @click="hideAddCategory">Cancelar</button>
                <button>Ok</button>
            </div>
    </base-form-category>
</template>

<script>
export default {
    emits: ['hide-add-category', 'save-data'],
    data(){
        return {
           category: {
              val: '',
              isValid: true
           },
           formIsValid: true
        }
    },
    methods: {
        clearValidity(){
          this.category.isValid = true; 
        },
        hideAddCategory(){
            this.$emit('hide-add-category');
        },
        validateForm(){
          this.formIsValid = true;
          if(this.category.val === ''){
            this.category.isValid = false;
            this.formIsValid = false;
          }
 
        },
        submitForm(){
            this.validateForm();

            if(!this.formIsValid){
               return;
            } 
            
            this.$emit('save-data', this.category.val);
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
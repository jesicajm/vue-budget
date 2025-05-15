<template>
    <base-form-category @submit.prevent="submitForm" class="card-category">
        <input type="text" :class="{invalid: !category.isValid}" :value="category.val" @input="event => category.val=event.target.value" @blur="clearValidity">
            <p v-if="!category.isValid">El nombre de la {{ updateCategory ? 'categoría' : 'cuenta'}} es obligatorio.</p>
            <div>
                <div>
                    <button @click="hideUpdateCategory">Hide</button>
                    <button @click="deleteCategory">Delete</button>
                </div>
                <div>
                    <button @click="hideUpdateCategory">Cancelar</button>
                    <button>Ok</button>
                </div>
             </div>
    </base-form-category>
</template>

<script>
export default {
    //inject:['updateCategoryDelete'],
    props: ['nameCategory', 'updateCategory'],
    emits: ['hide-update-category', 'update-data', 'delete-category','update-category-delete'],
    computed:{
        valorCategoria(){
           return this.category.val;
        }
    },
    data(){
        return {
           category: {
              val: this.nameCategory,
              isValid: true
           },
           formIsValid: true
        }
    },
    methods: {
        clearValidity(){
          console.log(this.category.val)
          this.category.isValid = true; 
        },
        hideUpdateCategory(){
            this.$emit('hide-update-category');
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
            
            this.$emit('update-data', this.category.val);
        },
        deleteCategory(){
            this.$emit('delete-category');
            this.$emit('update-category-delete')
        }
    }
}
</script>

<style scoped>
.card-category{
   width: 25em;
}

.card-category div{
   display: flex;
   justify-content: space-between;
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
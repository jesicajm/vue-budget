<template>
        <li @click="selectTarget(nameCategory)">
            <div class="category"
            :style="widthButton">
                <span @click="toggleUpdateCategory" ref="styleButton">{{ nameCategory }} </span>
                <update-category 
                    :updateCategory="true"
                    class="updateCategory" 
                    :style="position"
                    :name-category="nameCategory"
                    v-if="showCardUpdate" 
                    @update-data="updateData"  
                    @hide-update-category="toggleUpdateCategory"
                    @delete-category="deleteCategory"
                    @update-category-delete="$emit('update-category-delete', $event)"
                >
                </update-category>
            </div>
            <span>${{ assignedMoney }}</span>
            <span>${{ categoryActivity }}</span>
            <span>${{ availableMoney }}</span>
            <!---<a @click="selectTarget(nameCategory)">Target</a>-->
        </li>
</template>

<script>

export default {
    inject:['selectTarget'],
    emits:['update-category-delete'],
    props:['nameCategory','account','idBudget','assignedMoney', 'categoryActivity', 'availableMoney'],
    data(){
        return {
            isVisibleUpdateCategory: false,
            selectCategory: null,
            widthButton: 0,
            position: 0
        }
    },
    mounted(){
        let left = 200 - (this.$refs.styleButton.offsetWidth/2)
        this.widthButton =  `width: ${this.$refs.styleButton.offsetWidth}px;`
        this.position = `left: -${left}px;`
    },
    computed: {
       showCardUpdate(){
           return this.isVisibleUpdateCategory;
       }
    },
    methods:{
        toggleUpdateCategory(){    
            this.isVisibleUpdateCategory = !this.isVisibleUpdateCategory;
            console.log('ancho card'+ this.widthButton )
        },
        updateData(data){
            if(data == this.nameCategory){
                this.toggleUpdateCategory();
                return;
            }
            this.$store.dispatch('budget/updateCategory', {
                renameCategory: data,
                category: this.nameCategory,
                nameAccount: this.account,
                idBudget: this.idBudget
            });
            this.toggleUpdateCategory();
        },
        deleteCategory(){
            this.$store.dispatch('budget/deleteCategory', {
                category: this.nameCategory,
                nameAccount: this.account,
                idBudget: this.idBudget
            });

            this.$store.dispatch('targets/deleteTarget', {
                category: this.nameCategory,
                idBudget: this.idBudget
            });
            
            this.toggleUpdateCategory();
        },
        showTarget(){
            this.$emit('show-target');
        }
    }
}

</script>

<style scoped>
li{
    /*display: flex;*/
    display: grid;
    grid-template-columns: 4fr repeat(3, 1fr);
    justify-items: end;
    /*justify-content: space-between;*/
    margin-right: 10px;
}

.category {
    justify-self: start;
    position: relative;
    cursor: pointer;
    border: 0;
    padding:0;
}

.updateCategory{
    position:absolute;
    top: 42px;
}

a{
    margin-right: 10px;
    cursor: pointer;
}

</style>

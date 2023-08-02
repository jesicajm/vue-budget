<template>
  <base-card
    class="categories-group"
  >
    <p class="categories-group__tittle">
      Categorias Presupuesto
    </p>
    <ul>
      <li
        class="account-type"
        v-for="account in accountGroup"
        :key="account.type"
      >
        {{ account.type }}:
        <ul>
          <li
            class="category"
            v-for="category in account.categories"
            :key="category.name"
            @click="setCategoryAccount(account.type, category.name, category.assigned)"
          >
            <span>{{ category.name }}</span>
            <span>${{ category.assigned }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </base-card>
</template>

<script>
import BaseCard from "./UI/BaseCard.vue";

export default {
    components: {
        BaseCard
    },
    props: ["accountGroup"],
    emits:['selected-category'],
    data() {
      return {
        
      }
    },
    methods:{
      setCategoryAccount(account,category,moneyAssigned){
        this.$emit('selected-category', {
          account: account,
          category: category,
          moneyAssigned: moneyAssigned
        })
    },
    }
}
</script>


<style scoped>
.categories-group{
  position: absolute;
  z-index: 20;
  width: 260px;
  color: gray;
  padding: 10px;
  background: white;
  height: 12.5rem;
  overflow-y:scroll; 
}

.categories-group__tittle {
  margin: 0;
  border-bottom: 1px solid rgb(161, 152, 152);
  font-weight: bold;
}

.categories-group ul {
  list-style: none;
  padding: 0;
}

.account-type {
  margin: 0;
  padding: 5px;
  font-weight: bold;
}

.category {
  display: flex;
  justify-content: space-between;
  padding: 2px 8px;
  font-weight: normal;
}

.category:hover {
  background: rgb(204, 198, 198);
}
</style>
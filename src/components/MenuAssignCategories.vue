<template>
  <base-card
    class="categories-group"
  >
    <slot></slot>
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
            @click="setCategoryAccount(account.type, category.name, category.assigned, category.available)"
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
    emits:['selected-category'],
    data() {
      return {
        
      }
    },
    computed: {
      accountGroup() {
        return this.$store.getters["budget/accountGroup"];
      }
    }, 
    methods:{
      setCategoryAccount(account,category,moneyAssigned, available){
        this.$emit('selected-category', {
          account: account,
          category: category,
          moneyAssigned: moneyAssigned,
          moneyAvailable: available
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
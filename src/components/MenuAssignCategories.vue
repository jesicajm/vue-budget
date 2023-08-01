<template>
  <base-card
    class="section-manually__categories-group"
    v-if="isVisibleGroupCategories"
  >
    <p class="section-manually__categories-group-tittle">
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
            @click="
              setCategoryAccount(account.type, category.name, category.assigned)
            "
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
    data() {
        return{
           isVisibleGroupCategories:false
        }
    },
}
</script>


<style scoped>
.section-manually__categories-group {
  position: absolute;
  z-index: 20;
  width: 260px;
  color: gray;
  padding: 10px;
  background: white;
}

.section-manually__categories-group-tittle {
  margin: 0;
  border-bottom: 1px solid rgb(161, 152, 152);
  font-weight: bold;
}

.section-manually__categories-group {
   height: 12.5rem;
   overflow-y:scroll;   
}

.section-manually__categories-group ul {
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
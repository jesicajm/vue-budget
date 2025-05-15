<template>
  <!-- <div class="account-content">
    <svg
      v-show="showCaretRigth"
      @click="toggleCategories"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-caret-right-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
      />
    </svg>
    <svg
      v-show="showCaretDown"
      @click="toggleCategories"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-caret-down-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
      />
    </svg>
    <div class="name-account">
      <h3 @click="toggleNameAccount" ref="nameAccount">{{ nameAccount }}</h3>
      <update-category
        class="card-update-account"
        v-if="showNameAcoount"
        :style="position"
        @hide-update-category="toggleNameAccount"
        @delete-category="deleteAccount"
        @update-data="updateData"
        :name-category="nameAccount"
      ></update-category>
    </div>
    <div class="account-category">
      <base-button @click="showAddCategory"></base-button>
      <new-category
        v-if="showAddNewCategory"
        class="cardNewCategory"
        @hide-add-category="showAddCategory"
        @save-data="saveData"
      ></new-category>
    </div>
  </div>  -->
  <li>
    <grid-budget
      :groupName="groupName"
      @toggle-show-categories="handletoggleCategories"
    >
    </grid-budget>
    <ul v-if="isCategories">
      <!-- Listar categorías que pertenecen al grupo actual -->
      <li>
        <grid-budget v-for="category in categoriesByGroup(groupName)" 
           :groupName="category.name"
           :asignado-money="category.assigned"
           :key="category.name">
        </grid-budget> 
      </li>   
    </ul>
  </li>
</template>

<script>
import GridBudget from "./UI/Grid.Budget.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    GridBudget,
  },
  props: ["groupName"],
  data() {
    return {
      isCategories: false,
    };
  },
  computed: {
    ...mapGetters("budget", ["categoriesByGroup"]),
  },
  methods: {
    toggleNameAccount() {
      this.isVisibleUpdateAccount = !this.isVisibleUpdateAccount;
    },
    handletoggleCategories(newValue) {
      this.isCategories = newValue;
    },
  },
};
</script>

<style scoped>
ul{
  padding:0;
}

li{
  list-style: none;
}
</style>


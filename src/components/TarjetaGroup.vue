<template>
  <li class="account">
    <div class="account-content">
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
    </div>
    <ul v-if="showCaretDown" class="listCategories">
      <card-category
        class="cardCategory"
        v-for="category in categories"
        :key="category.name"
        :name-category="category.name"
        :assigned-money="category.assigned"
        :category-activity="category.activity"
        :available-money="category.available"
        :account="nameAccount"
        :id-budget="idBudget"
        @update-category-delete="$emit('update-category-delete', $event)"
      >
      </card-category>
    </ul>
  </li>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";
import NewCategory from "./NewCategory.vue";
import CardCategory from "./CardCategory.vue";

export default {
  emits: ["update-category-delete"],
  props: ["nameAccount", "categories", "idBudget"],
  components: {
    BaseButton,
    NewCategory,
    CardCategory,
  },
  data() {
    return {
      isVisibleCaretDown: true,
      isVisibleCaretRigth: false,
      isVisibleAddNewCategory: false,
      isVisibleUpdateCategory: false,
      selectCategory: null,
      isVisibleUpdateAccount: false,
    };
  },
  computed: {
    showCaretRigth() {
      return this.isVisibleCaretRigth;
    },
    showCaretDown() {
      return this.isVisibleCaretDown;
    },
    showAddNewCategory() {
      return this.isVisibleAddNewCategory;
    },
    showUpdateCategory() {
      return this.isVisibleRenameCategory;
    },
    showNameAcoount() {
      return this.isVisibleUpdateAccount;
    },
  },
  mounted() {
    let left = 200 - this.$refs.nameAccount.offsetWidth / 2;
    this.widthNameAccount = `width: ${this.$refs.nameAccount.offsetWidth}px;`;
    this.position = `left: -${left}px;`;
  },
  methods: {
    toggleCategories() {
      if (this.isVisibleCaretDown) {
        this.isVisibleCaretDown = false;
        this.isVisibleCaretRigth = true;
      } else {
        this.isVisibleCaretDown = true;
        this.isVisibleCaretRigth = false;
      }
    },
    showAddCategory() {
      this.isVisibleAddNewCategory = !this.isVisibleAddNewCategory;
    },
    saveData(data) {
      this.$store.dispatch("budget/addCategory", {
        category: data,
        nameAccount: this.nameAccount,
        idBudget: this.idBudget,
      });
      this.showAddCategory();
    },
    toggleNameAccount() {
      this.isVisibleUpdateAccount = !this.isVisibleUpdateAccount;
    },
    deleteAccount() {
      this.$store.dispatch("budget/deleteAccount", {
        nameAccount: this.nameAccount,
        idBudget: this.idBudget,
      });

      this.toggleNameAccount();
    },
    updateData(data) {
      if (data === this.nameAccount) {
        this.toggleNameAccount();
        return;
      }

      this.$store.dispatch("budget/updateAccount", {
        renameAccount: data,
        nameAccount: this.nameAccount,
        idBudget: this.idBudget,
      });

      this.toggleNameAccount();
    },
  },
};
</script>

<style scoped>
.account {
  display: grid;
}

.account-content {
  display: flex;
  background: #f5f5fa;
  padding: 10px 0;
  border-bottom: solid 1px #9d9dc9;
}

.name-account {
  position: relative;
}

.name-account h3 {
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  margin: 0;
}

.card-update-account {
  position: absolute;
  top: 52px;
  left: -50%;
}

.account-category {
  display: grid;
  position: relative;
}

.cardNewCategory {
  position: absolute;
  top: 60px;
  left: -67.5%;
}

.listCategories {
  list-style: none;
  display: grid;
  padding:10px;
}

.cardCategory {
  border: 1px solid gray;
}
</style>
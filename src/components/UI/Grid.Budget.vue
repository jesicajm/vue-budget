<template>
  <div class="grid-container">
    <div class="grid-item large">
      <svg
      v-if="!isCategories"
      @click="handletoggleCategories"
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
      v-else
      @click="handletoggleCategories"
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
        <span @click="toggleUpdateNameAccount" ref="nameAccount">{{ groupName }}</span>
        <update-category
          class="card-update-account"
          v-if="isUpdateName"
          :style="position"
          @hide-update-category="toggleUpdateNameAccount"
          @delete-category="deleteAccount"
          @update-data="updateData"
          :name-category="groupName"
        ></update-category>  
    </div>
    </div>
    <div class="grid-item small">{{ asignadoMoney }}</div>
    <div class="grid-item small">Tercer elemento</div>
    <div class="grid-item small">Cuarto elemento</div>
  </div>
</template>

<script>
import UpdateCategory from '../UpdateCategory.vue'

export default {
  props: ['groupName','asignadoMoney'],
  components: {
    UpdateCategory
  },  
  data() {
    return {
      isUpdateName: false,
      isCategories: false
    };
  },
  mounted() {
    let left = 200 - this.$refs.nameAccount.offsetWidth / 2;
    this.widthNameAccount = `width: ${this.$refs.nameAccount.offsetWidth}px;`;
    this.position = `left: -${left}px;`;
  },
   methods: {
    handletoggleCategories() {
      this.isCategories = !this.isCategories;
      this.$emit('toggle-show-categories', this.isCategories); // Alternar el estado del caret
    },
    toggleUpdateNameAccount() {
      this.isUpdateName = !this.isUpdateName;
    },
   } 
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr); /* 1 parte para el primer elemento, 3 partes para el resto */
  /* gap: 16px; Espacio entre elementos */
}

.grid-item {
  display: flex;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.large {
  text-align: start;
  grid-column: span 1; /* Ocupa 1 columna de la cuadrícula */
}

.small {
  text-align: end;
  flex: 1; /* Tamaño proporcional dentro de la fila */
}

.name-account {
  position: relative;
}

.name-account span {
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
</style>
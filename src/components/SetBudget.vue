 <template>
  <button @click="toggleMenu" class="menu-item">
    {{ budgetId }}
    <svg
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
  </button>
  <new-budget v-if="isVisibleNewBudget" @close-new-budget="closeNewBudget"></new-budget>
  <div class="menu-account" v-if="showMenu">
    <ul>
      <li>
        <button @click="showNewBudget">
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
            /></svg
          >Nuevo presupuesto
        </button>
      </li>
      <li>
        <router-link to="/budgets">Ver todos los presupuestos</router-link>
      </li>
      <li>
        <router-link to="">Configuración presupuesto</router-link>
      </li>
    </ul>
    <p>Cuenta</p>
    <ul>
      <li>
        <router-link to="">Configuración Cuenta</router-link>
      </li>

      <li>
        <router-link to="">Gestionar conexiones</router-link>
      </li>
    </ul>
    <button>Cerrar sesión</button>
  </div>
</template>
    
<script>
import NewBudget from "./NewBudget.vue";

export default {
  props: ["budgetId"],
  components: {
    NewBudget
  },
  data() {
    return {
      isVisibleMenu: false,
      isVisibleNewBudget: false
    };
  },
  computed: {
    showMenu() {
      return this.isVisibleMenu;
    }
  },
  methods: {
    toggleMenu() {
      this.isVisibleMenu = !this.isVisibleMenu;
    },
    showNewBudget() {
      this.isVisibleNewBudget = true;
      this.isVisibleMenu = false;
    },
    closeNewBudget() {
      this.isVisibleNewBudget = false;
    }
  },
};
</script>

<style scoped>
.menu-item {
  margin: 8px;
}

.menu-account {
  position: fixed;
  padding: 24px;
  z-index: 101;
  top: 80px;
  left: 50px;
  width: 14rem;
  height: auto;
  background: rgba(232, 240, 247, 0.87);
}

.menu-account ul {
  padding: 0;
  margin: 24px 0 0;
  list-style: none;
}

.menu-account ul li {
  margin-bottom: 24px;
}
</style>
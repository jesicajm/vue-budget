<template>
  <div>
    <div class="target-edit">
      <p>Objetivo</p>
      <a @click="updateTarget">Editar</a>
    </div>
    <div>
      <span v-if="target.type === 'savingsBalance'">Saldo de ahorro</span>
      <span v-if="target.type === 'montlySavingsBuilder'"
        >Generador de ahorros</span>
      <span v-if="target.type === 'montlyDebtPayment'"
        >Pago de deuda mensual</span>
      <p
        v-if="target.type === 'neededForSpending' || target.type === 'savingsBalance'"
      >
        {{ target.period }}
      </p>
      <p
        v-if="
          target.type === 'neededForSpending' ||
          target.type === 'savingsBalance' ||
          target.type === 'montlySavingsBuilder'"
      >
        ${{ target.ammount }} {{ target.by ? "para el " + target.by : "" }}
      </p>
      <p v-if="target.type === 'montlyDebtPayment'">
        ${{ target.ammount }} necesarios cada {{ target.by }}
      </p>
    </div>
  </div>
</template>


<script>
export default {
  props: ["categoryTarget", "idBudget", "targetsCategories"],
  emits: ["show-set-target"],
  data() {
    return {
    };
  },
  computed: {
    target() {
      console.log("from target saved " + this.categoryTarget);
      console.log(this.targetsCategories);
      console.log(this.idBudget)
      const target = this.targetsCategories.find((target) =>
          target.category === this.categoryTarget
      );
      console.log(target);
      return target;
    },
  },
  created() {
    console.log("from create target saved");
    //this.loadTargets();
  },
  methods: {
    /*async loadTargets() {
      this.isLoading = true;
      await this.$store.dispatch("targets/fetchTargets", this.idBudget);
      this.isLoading = false;
      this.targets = this.$store.getters['targets/targets']
    },*/
    updateTarget() {
      this.$emit("show-set-target", this.categoryTarget);
    },
  },
};
</script>

<style scoped>
.target-saved {
  display: grid;
  max-width: 40rem;
}

.target-edit {
  display: flex;
  justify-content: space-between;
}

p {
  margin: 0;
}

a {
  text-decoration-line: none;
}
</style>
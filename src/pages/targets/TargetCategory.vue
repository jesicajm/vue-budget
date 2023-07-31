<template>
  <div class="target" v-if="category !== null">
    <h4 class="category">{{ category }}</h4>
    <base-card class="card-set-target">
      <section v-if="!hasTargetCategory || update" class="set-target">
        <div v-if="!isVisibleTargetDetails">
          <p>Objetivo</p>
          <a @click="showTargetDetails">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
              ref=""
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
              /></svg
            >Crear Objetivo {{ category }}</a
          >
        </div>
        <div v-if="isVisibleTargetDetails">
          <div class="target-details">
            <label for="target-type">Tipo de objetivo</label>
            <select id="target-type" v-model="targetType">
              <option value="neededForSpending">Necesario para gastar</option>
              <option value="savingsBalance">Saldo de ahorro</option>
              <option value="montlySavingsBuilder">
                Generador de ahorro mensual
              </option>
              <option value="montlyDebtPayment">
                Pago mensual de la deuda
              </option>
            </select>
          </div>
          <div
            v-if="
              targetType === 'neededForSpending' ||
              targetType === 'savingsBalance'
            "
            class="target-details"
          >
            <label for="amount-needed">Cantidad requerida</label>
            <input
              id="amount-needed"
              name="amount-needed"
              type="number"
              v-model.number="amountNeeded"
            />
          </div>
          <div
            v-if="
              targetType === 'montlySavingsBuilder' ||
              targetType === 'montlyDebtPayment'
            "
            class="target-details"
          >
            <label for="amount-needed"
              >Monto a
              {{
                targetType === "montlySavingsBuilder" ? "asignar" : "pagar"
              }}</label
            >
            <input
              id="amount-needed"
              name="amount-needed"
              type="number"
              v-model.number="amountNeeded"
            />
          </div>
          <details-montly-debt-payment
            v-if="targetType === 'montlyDebtPayment'"
            @data-debt-payment="saveDebt"
            :data-update="update"
            :update-byValue="byValue"
            :update-by="by"
            class="target-details debt-payment"
          >
          </details-montly-debt-payment>
          <details-needed-for-spending
            v-if="targetType === 'neededForSpending'"
            @data-target="savePeriod"
            :data-update="update"
            :update-byValue="byValue"
            :update-custom-repeat="customRepeat"
            :update-by="by"
            :update-period="period"
          >
          </details-needed-for-spending>
          <details-savings-balance
            v-if="targetType === 'savingsBalance'"
            @data-saving="saveBy"
            :update-by="by"
            :data-update="update"
          ></details-savings-balance>
          <div class="target-actions">
            <div>
              <a @click="deleteTarget">Eliminar</a>
              <a @click="hideTargetDetails">Cancelar</a>
            </div>
            <button @click="saveTarget">Guardar Objetivo</button>
          </div>
        </div>
      </section>
      <section v-else class="target-saved">
        <target-saved
          :category-target="category"
          :id-budget="idBudget"
          @show-set-target="showSetTarget"
          :targets-categories="targetsCategories"
        >
        </target-saved>
      </section>
    </base-card>
  </div>
</template>

<script>
import DetailsNeededForSpending from "./DetailsNeededForSpending.vue";
import DetailsSavingsBalance from "./DetailsSavingsBalance.vue";
import DetailsMontlyDebtPayment from "./DetailsMontlyDebtPayment.vue";
import TargetSaved from "./TargetSaved.vue";

export default {
  emits: ["save-target-category", "select-category"],
  props: ["categoryTarget", "idBudget", "targetsCategories"],
  components: {
    DetailsNeededForSpending,
    DetailsSavingsBalance,
    TargetSaved,
    DetailsMontlyDebtPayment,
  },
  data() {
    return {
      category: null,
      targetType: "neededForSpending",
      amountNeeded: null,
      by: null,
      byValue: null,
      period: null,
      hasTargetCategory: null,
      update: false,
      customRepeat: null,
      isLoading: false,
      isVisibleTargetDetails: false,
      //targets: null
    };
  },
  created() {
    console.log("from create set target ");
    //this.loadTargets();
  },
  watch: {
    categoryTarget(value) {
      this.isVisibleTargetDetails = false;
      this.update = false;
      // this.loadTargets();
      console.log("update: " + this.update);
      console.log("from watch category target " + value);
      this.category = value;
      console.log(this.targetsCategories);
      /* this.targets = this.$store.getters['targets/targets']
            console.log(this.targets);*/
      this.hasTargetCategory = this.targetsCategories.some(
        (target) => target.category === this.categoryTarget
      );

      console.log("has target category:" + this.hasTargetCategory);

      if (!this.hasTargetCategory) {
        this.targetType = "neededForSpending";
      }
    },
    targetType(value) {
      //this.loadTargets();
      console.log("from watch targetType: " + value + this.update);
      this.period = null;
      this.by = null;
      this.byValue = null;
      this.customRepeat = null;
    },
    update(value) {
      if (value) {
        // this.loadTargets();
        const target = this.targetsCategories.find(
          (target) => target.category === this.categoryTarget
        );
        this.targetType = target.type;
        this.amountNeeded = target.ammount;
        this.period = target.period;
        this.by = target.by;
        this.byValue = target.byValue;
      } else {
        this.amountNeeded = null;
        // this.byValue = null;
      }
    },
  },
  /* computed:{
        targetsCategories(){
           return this.targets;
        }
    },*/
  methods: {
    /*async loadTargets(){
            this.isLoading = true;

            await this.$store.dispatch('targets/fetchTargets', this.idBudget);
            this.isLoading = false;
            this.targets = this.$store.getters['targets/targets'];
            
        },*/
    savePeriod(data) {
      this.period = data.selectedPeriod;
      this.by = data.every;
      this.byValue = data.everyValue;
      this.customRepeat = data.customRepeat;
    },
    saveBy(dataBy) {
      this.by = dataBy;
    },
    saveDebt(dataDebt) {
      this.by = dataDebt.by;
      this.byValue = dataDebt.everyValue;
    },
    showSetTarget(dateUpdate) {
      this.category = dateUpdate;
      this.update = true;
      console.log("from emit event target saved" + this.hasTargetCategory);
    },
    showTargetDetails() {
      this.isVisibleTargetDetails = true;
    },
    hideTargetDetails(){
      this.isVisibleTargetDetails = false;
    },
    deleteTarget() {
      console.log("from delete target");
      console.log(this.update);
      this.$store.dispatch("targets/deleteTarget", {
        category: this.category,
        idBudget: this.idBudget,
      });

      this.update = false;
      this.category = null;

      //this.loadTargets()

      this.targetType = "neededForSpending";
      this.amountNeeded = null;
    },
    async saveTarget() {
      const target = {
        idBudget: this.idBudget,
        category: this.category,
        type: this.targetType,
        ammount: this.amountNeeded,
        by: this.by,
        byValue: this.byValue,
        period: this.period,
        customRepeat: this.customRepeat,
      };

      if (this.update === false) {
        await this.$store.dispatch("targets/addTargetCategory", target);
        this.hasTargetCategory = true;
        console.log("from condicional target saved");
      } else {
        await this.$store.dispatch("targets/updateTarget", target);
        this.update = false;
      }

      console.log("from evento click saved target");
      console.log("tiene categoria objetivo " + this.hasTargetCategory);
      console.log("update: " + this.update);
    },
  },
};
</script>


<style scoped>
.target {
    display: flex;
    flex-direction: column;
    align-items: baseline;
}

.category {
   margin:0;
   padding: 10px;
}

p {
  padding: 10px;
  border-bottom: grey solid 1px;
}

.card-set-target {
  padding: 2rem;
  box-shadow: none;
}

.target-details {
  display: grid;
  margin-top: 10px;
}

.debt-payment {
  padding: 16px;
  background: #f5f5fa;
  border-radius: 4px;
  border: solid 2px #c7c7cc;
}

.target-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
<template>
    <div class="backdrop"></div>
    <dialog open :style="{ 'overflow-y': viewType === 'addAccount' ? 'visible' : 'scroll'}">
        <div class="card-NewAccount">
            <div class="card-NewAccount__header" :style="{ gridTemplateColumns: selectedTypeAccount ? '1fr 9fr 1fr' : '9fr 1fr' }">
                <svg v-if="viewType === 'selectAccount'" @click="showAddAccount" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
                <h1>{{ viewType === 'addAccount' ? 'Agregar cuenta ' : 'Selecionar tipo de cuenta' }}</h1>
                <svg @click="closeAddAccount" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
            <section v-if="viewType === 'addAccount'" class="card-NewAccount__body">
              <div>
                <label>Ponle un nombre</label>
                <input type="text" v-model.trim="account.name" :class="{ invalid: nameExists }">
                <p v-if="nameExists" class="card-NewAccount__invalid-form"> Este nombre de cuenta ya existe</p>
                <label>¿Qué tipo de cuenta está agregando?</label>
                <div class="card-NewAccount__body-input" @click="selectAccountType">
                   <p> {{ account.type ? account.type : 'Seleccione el tipo de cuenta...'  }}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                    </svg>
                </div>    
                <label>¿Cuál es el saldo de su cuenta actual?</label>
                <input type="number" v-model.trim="account.balance" placeholder="">
              </div>
            </section>
            <button  v-if="viewType === 'addAccount'" type="button" :class="disabledButton ? 'btn btn-secondary' : 'btn btn-primary'" :disabled="disabledButton" @click="submitAccountRegistration">Siguiente</button>
            <section v-if="viewType === 'selectAccount'" class="card-NewAccount__body">
                <h2>Cuentas presupuestarias</h2>
                <label>Cuentas de las que gastará en un futuro cercano (generalmente dentro de uno o dos años).</label>
                <button class="account-type" @click="setAccountType('Cuenta corriente')">Cuenta corriente</button>
                <button class="account-type" @click="setAccountType('Ahorros')">Ahorros</button>
                <button class="account-type" @click="setAccountType('Efectivo')">Efectivo</button>
                <button class="account-type" @click="setAccountType('Tarjeta de crédito')">Tarjeta de crédito</button>
                <button class="account-type" @click="setAccountType('Línea de crédito')">Línea de crédito</button>
                <h2>Hipotecas y Préstamos</h2>
                <label>Cuentas que tienen un saldo pendiente que actualmente está pagando y no está gastando</label>
                <button class="account-type" @click="setAccountType('Hipoteca')">Hipoteca</button>
                <button class="account-type" @click="setAccountType('Préstamo para automóvil')">Préstamo para automóvil</button>
                <button class="account-type" @click="setAccountType('Préstamo para estudiantes')">Préstamo para estudiantes</button>
                <button class="account-type" @click="setAccountType('Préstamo personal')">Préstamo personal</button>
                <button class="account-type" @click="setAccountType('Otra deuda')">Otra deuda</button>
                <h2>Seguimiento de cuentas</h2>
                <label>Cuentas que contienen dinero que no planea gastar pronto, como inversiones o préstamos.</label>
                <button class="account-type" @click="setAccountType('Activo')">Activo(ej., inversión)</button>
                <button class="account-type" @click="setAccountType('Pasivo')">Pasivo(ej., hipoteca)</button>
            </section>
        </div>
    </dialog>
</template>

<script>

export default {
    props:['budgetId'],
    emits: ['close-add-account'],
    data(){
        return {
            viewType: 'addAccount',
            account: {
                name: '',
                balance: null,
                type: null
            },
            accountType: null,
            isVisibleAddAccount: false,
            nameExists: false,
        }
    },
    computed:{
        selectedTypeAccount(){
            if(this.viewType === 'selectAccount'){
                return true;
            }else {
                return false;
            }
        },
        disabledButton(){
          return !(this.account.name && this.account.balance && this.account.type)
        }
    },
    watch:{
        'account.type'(value){
           if(value){
               this.showAddAccount();
           }
        },
        'account.name': function(newName) {
            this.nameExists = this.$store.getters['user/userAccounts'].some(
            account => account.accountName.toLowerCase() === newName.toLowerCase()
        );
  }
    },
    methods:{
        selectAccountType(){
            this.viewType = 'selectAccount';
        },
        showAddAccount(){
            this.viewType = 'addAccount';
        },
        setAccountType(type){
            this.account.type = type;
        },
        async submitAccountRegistration(){

            if (this.nameExists) {
                return; // Si el nombre de la cuenta ya existe, no hacer nada
            }

            try {
                await this.$store.dispatch('user/validateAndRegisterAccount', {
                    budgetId: this.budgetId,
                    accountName: this.account.name,
                    accountBalance: this.account.balance,
                    accountType: this.account.type
                });

                console.log('cuenta registrada');

                if(this.account.type === 'Ahorros' || this.account.type === 'Cuenta corriente' || this.account.type ==='Efectivo'){
                this.$store.dispatch('budget/updateDebitBalance', this.account.balance);
                }

                this.$emit('close-add-account');   
            }catch (error) {
                console.error('Error registering account:', error.message);
            }
        },
        closeAddAccount(){
            this.$emit('close-add-account');
        }  
    }      
}

</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
}

dialog {
   position: fixed;
   z-index: 100;
}

.card-NewAccount {
    max-width: 20rem;
    height: 30rem;
}

.card-NewAccount__header {
    display: grid;
    padding-bottom: 8px;
    align-items: center;
}

.card-NewAccount__header h1 {
   text-align: center;
   font-size: 18px;
   margin:0;
}


.card-NewAccount__body {
   display: grid;
   padding: 8px;
   border-top: solid 1px gray;
   border-bottom: solid 1px gray;
}

.card-NewAccount__body label {
   margin: 4px 0;
}

.card-NewAccount__body input,
button {
   width: 304px;
}

.invalid{
   border: 2px solid red;
}

.card-NewAccount__invalid-form {
    padding: 5px;
    color:white;
    background: red;
    margin: 0;
}

.card-NewAccount__body-input {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin: 0;
   border: 2px solid rgb(133, 133, 133);
   padding: 1px 2px; 
   cursor: pointer;
   width: 304px;
}

.card-NewAccount__body-input p{
    margin:0;
}

h2 {
  font-size: 18px;
}

ul{
    list-style: none;
    padding: 0;
}

.account-type {
    border-radius: 12px;
    border: solid 2px rgb(173, 172, 172);
    padding: 14px;
    margin-bottom: 8px;
    text-align: left;
}

.account-type:hover {
    background: rgb(151, 151, 151);
}

button {
    margin: 16px 8px;
    width: 304px;
    margin: 12px 0 0 0;
}

</style>
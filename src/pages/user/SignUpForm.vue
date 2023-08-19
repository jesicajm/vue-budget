<template>
    <base-card class="sign-up-form">
        <form @submit.prevent="submitForm">
             <h1>Crear una cuenta</h1>
            <p>¿Tiene una cuenta?<router-link to="/users/sign_in">Iniciar sesión</router-link></p>
            <input type="email" placeholder="Email" v-model.trim="email">
            <input type="password" placeholder="Password" v-model.trim="password">
             <p v-if="!formIsValid">Por favor ingrese un email y contraseña validos</p>
            <button>Registrarse</button>
        </form>
    </base-card>
</template>


<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      formIsValid: true,  
      isLoading: false,
      error: null
    };
  },
  methods:{
    async submitForm(){
      this.formIsValid= true

      if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try{
        await this.$store.dispatch('signup', {
          email: this.email,
          password: this.password
        });
      }catch(err){
          this.error = err.message || 'Failded to authenticate, try later';
          throw this.error
      }

      /*this.$store.dispatch('user/registerUser', {
          email:this.userEmail,
          password: this.userPassword
      });*/
      
      const userId = this.$store.getters['user']; 
      this.$store.dispatch('budget/addBudget', {
        userId: userId,
        name: 'Mi Presupuesto'
      });
      
      this.$router.replace('/budget/Mi Presupuesto');

      this.isLoading = false;

    }
  }
};
</script>

<style scoped>
.sign-up-form{
   margin: 2rem auto;
   padding: 2rem;
}

form{
  display: grid;
}

form button, input {
  margin-top: 8px;
}
</style>

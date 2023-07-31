<template>
    <base-card class="sign-in-form">
        <h1>Iniciar sesion</h1>
         <p>¿Nuevo en?<router-link to="/users/sign_up">Registrese hoy</router-link></p>
        <form @submit.prevent="submitForm">
            <input type="email" placeholder="Email" v-model.trim="email">
            <input type="password" placeholder="Password" v-model.trim="password">
            <p v-if="!formIsValid">Por favor ingrese un email y contraseña validos</p>
            <button>Iniciar sesion</button>
        </form>
    </base-card>
</template>

<script>


export default {
    data(){
        return{
            email:'',
            password: '',
            formIsValid: true,
            mode: 'login'
        }
    },
    computed:{
        submitButtonCaption(){
            if(this.mode === 'login'){
                return  'Iniciar Sesion';
            }else{
                return 'Registrarse';
            }
        },
        switchModeButtonCaption(){
            if(this.mode === 'signup'){
                return  'Iniciar Sesion';
            }else{
                return 'Registrarse';
            }
        }
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
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
            });
            }catch(err){
                this.error = err.message || 'Failded to authenticate, try later';
                 throw this.error
            }

            this.$router.replace('/budget');
            
            this.isLoading = false;

        },
        switchAuthMode(){
            if(this.mode === 'login'){
              this.mode = 'signup'
            }else{
              this.mode = 'login'
            }
        }
    }
}
</script>




<style scoped>
.sign-in-form{
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
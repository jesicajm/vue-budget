<template>
    <main>
        <router-view></router-view>
    </main>
</template>

<script>


export default {
    data(){
        return{
          
        }
    }
   /* created(){
      //  this.$store.dispatch('autoLogin')
    }*/
}   
</script>

<style>
* {
    box-sizing: border-box;
}

body { 
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
}

main {
   display: flex;
}

</style>

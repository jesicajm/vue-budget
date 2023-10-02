<template>
    <form class="card-category">
        <div class="card-category__content">
            <figure class="triangulo-equilatero-bottom"></figure>
            <slot></slot>
        </div>
    </form>
</template>

<script>

export default {
   props: ['formNewCategory']
}
</script>


<style scoped>
   .card-category {
    display: grid;
    align-content: start;
    z-index: 10;
    /*justify-content: stretch;
    /*width: 30px;*/
}

.triangulo-equilatero-bottom {
     justify-self: center;
     width: 0;
     height: 0;
     border-right: 20px solid transparent;
     border-top: 20px solid transparent;
     border-left: 20px solid transparent;
     border-bottom: 20px solid #7226a5;
     margin: 0;
     position: relative;
     top:-52px
}

.card-category__content {
    display: grid;
    grid-template-rows: 12px 25px;
    background: #ffffff;
    padding: 12px;
    border: 2px solid blue;
}
</style>

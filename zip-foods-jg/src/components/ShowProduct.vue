<!-- src/components/ShowProduct.vue -->
<template>
  <div v-if='$route.name == "product"'>
    <div class='product'>
      <h2>{{ product.name }}</h2>
      <img class='product-thumb' :src='imageSrc' />
      <p class='product-description'>{{ product.description }}</p>
      <div class='product-price'>${{ product.price }}</div>
    </div>
  </div>
  <router-link v-else :to='{ name:"product", params: { slug: product.slug }}' class='clearlinks'>
    <div class='product'>
      <div class='product-name'>{{ product.name }}</div>
      <img class='product-thumb' :src='imageSrc' />
      <div class='product-price'>${{ product.price }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: '',
  props: ['product'],
  data: function() {
    return {};
  },
  computed: {
    imageSrc: function() {
      try {
        return require('@/assets/images/products/' +
          this.product.slug +
          '.jpg');
      } catch (e) {
        return require('@/assets/images/products/image-not-available.jpg');
      }
    }
  }
};
</script>
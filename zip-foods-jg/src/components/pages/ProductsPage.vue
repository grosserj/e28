<!-- src/components/ShowProducts.vue -->
<template>
  <div id='products'>
    <h2>Products</h2>
    <show-product v-for='product in products' :key='product.id' :product='product'></show-product>
  </div>
</template>

<script>
import ShowProduct from '@/components/ShowProduct.vue';
import * as app from '@/common/app.js';

export default {
  name: '',
  components: {
    'show-product': ShowProduct
  },
  data: function() {
    return {
      products: []
    };
  },
  mounted: function() {
    app.api.all('products').then(response => {
      this.products = response;
    });
  }
};
</script>
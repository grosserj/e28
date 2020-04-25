<template>
  <div id='product-page'>
    <show-product :product='product'></show-product>
  </div>
</template>

<script>
import ShowProduct from '@/components/ShowProduct.vue';
import * as app from '@/common/app.js';

export default {
  name: 'ProductPage',
  props: ['slug'],
  components: {
    'show-product': ShowProduct
  },
  data: function() {
    return {
      product: []
    };
  },
  mounted: function() {
    app.api.getSlug('products', this.slug).then(response => {
      this.product = response;
    });
  }
};
</script>
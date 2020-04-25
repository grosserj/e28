<template>
  <div>
    <p>ZipFoods is your one-stop-shop for convenient online grocery shopping in the greater Boston area.</p>

    <show-featured :category='featuredCategory'></show-featured>
  </div>
</template>

<script>
import ShowFeatured from '@/components/ShowFeatured.vue';

export default {
  components: {
    'show-featured': ShowFeatured
  },
  data: function() {
    return {
      featuredCategory: 'snacks'
    };
  }
};
</script>
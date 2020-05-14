<template>
  <router-link data-test='category-link' :to='{ name: "category", params: {slug: category.slug }}'>
    <b-card
      id='card-component'
      :title='category.name'
      :img-src='imgSource'
      img-alt='Image'
      img-top
      style='max-width: 40rem;'
      class='mb-2'
      :static='true'
    >
      <b-card-text>Level: {{ category.difficulty }}</b-card-text>
    </b-card>
  </router-link>
</template>

<script>
export default {
  props: ['category', 'imageWidth'],
  data: function() {
    return {};
  },
  computed: {
    // random photo from .slug as seed from:
    // src: https://picsum.photos/
    imgSource: function() {
      return (
        'https://picsum.photos/seed/' +
        this.category.slug +
        '/' +
        this.imageWidth[0] +
        '/' +
        this.imageWidth[1]
      );
    }
  }
};
</script>

<style scoped>
</style>
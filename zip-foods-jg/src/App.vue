<template>
  <div id='app'>
    <img alt='Vue logo' src='./assets/images/zipfoods-logo.png' />
    <!-- <show-home></show-home>
    <show-categories></show-categories>
    <show-products></show-products>-->
    <nav>
      <ul>
        <li v-for='link in links' :key='link'>
          <router-link :to='{name: link}' exact>{{ link }}</router-link>
        </li>
      </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      links: ['home', 'products', 'categories', 'add product']
    };
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/zipfoods.scss';
</style>

<template>
  <div id='app'>
    <h1 id='logo'>
      <b-icon-lightning-fill id='lightning-bolt' />Flash Study
      <b-icon-book />
    </h1>
    <b-navbar>
      <b-navbar-nav class='mx-auto'>
        <li v-for='link in links' :key='link'>
          <router-link :to='{ name: link }' exact>
            {{ link }}
            <span v-if='link == "create"'>
              <b-icon-plus-circle />
            </span>
            <span v-else-if='link == "home"'>
              <b-icon-house />
            </span>
          </router-link>
        </li>
      </b-navbar-nav>
    </b-navbar>
    <br />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: function() {
    return {
      links: ['home', 'create']
    };
  }
};
</script>

<style lang='scss'>
@import '@/assets/scss/flashstudy.scss';
</style>

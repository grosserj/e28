<template>
  <div id='categories'>
    <h2>Welcome to Flash Study</h2>
    <p>Select a category below to get started!</p>

    <b-container>
      <div v-for='columns in rowCount' :key='columns'>
        <b-row>
          <b-col
            v-for='column in numberOfColumns'
            :key='column + categoriesLength + columns * numberOfColumns'
          >
            <div v-if='categoriesLength >= layoutCount(columns,column)'>
              <show-category
                :category='Object.values(categories)[layoutCount(columns,column) - 1]'
                :imageWidth='imageWidth'
              ></show-category>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import ShowCategory from '@/components/ShowCategory.vue';
import * as app from '@/common/app.js';

export default {
  components: {
    'show-category': ShowCategory
  },
  data: function() {
    return {
      categories: [],
      numberOfColumns: 3,
      imageWidth: [200, 100]
    };
  },
  mounted: function() {
    app.api.all('categories').then(response => {
      this.categories = response;
    });
  },
  // https://forum.vuejs.org/t/vue-2-0-create-bootstrap-rows-and-cols-with-v-for/5628/5
  computed: {
    rowCount: function() {
      return (
        Math.floor(
          (Object.values(this.categories).length - 1) / this.numberOfColumns
        ) + 1
      );
    },
    categoriesLength: function() {
      return Object.values(this.categories).length;
    }
  },
  methods: {
    layoutCount: function(rows, columns) {
      return (rows - 1) * this.numberOfColumns + columns;
    }
  }
};
</script>

<style scoped>
</style>
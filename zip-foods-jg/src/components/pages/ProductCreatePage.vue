<template>
  <div>
    <h2>Add a Product</h2>

    <label for='name'>Name</label>
    <input type='text' v-model='product.name' id='name' />

    <label for='slug'>URL Identifier:</label>
    <input type='text' v-model='product.slug' id='slug' />

    <label for='price'>Price:</label>
    <input type='text' v-model='product.price' id='price' />

    <label for='available'>Quantity available:</label>
    <input type='text' v-model='product.available' id='available' />

    <label for='weight'>Weight (in lbs):</label>
    <input type='text' v-model='product.weight' id='weight' />

    <label for='perishable'>Perishable?</label>
    <input type='checkbox' v-model='product.perishable' id='perishable' />

    <label for='description'>Description</label>
    <textarea v-model='product.description' id='description'></textarea>

    <input type='submit' value='Add' @click.prevent='addProduct' />

    <transition name='fade'>
      <div class='alert' v-if='added'>Your product was added!</div>
    </transition>
  </div>
</template>

<script>
import * as app from '@/common/app.js';

export default {
  name: '',
  data: function() {
    return {
      added: false,
      product: {
        name: '',
        slug: '',
        price: '',
        available: '',
        weight: '',
        perishable: false,
        description: ''
      }
    };
  },
  methods: {
    addProduct: function() {
      app.api.add('products', this.product).then(id => {
        console.log('Product was added with the id: ' + id);
        this.added = true;

        setTimeout(() => (this.added = false), 3000);

        this.product = {
          name: '',
          slug: '',
          price: '',
          available: '',
          weight: '',
          perishable: false,
          description: ''
        };
      });
    }
  }
};
</script>

<style scoped>
input {
  font-size: 15pt;
}

textarea,
input[type='text'] {
  width: 50%;
}

textarea {
  height: 75px;
  display: block;
  margin: auto;
}

label {
  margin-top: 20px;
  display: block;
  font-weight: bold;
}

input[type='submit'] {
  display: inline-block;
  margin-top: 10px;
}
</style>
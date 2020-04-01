<script>
export default {
  props: ["guessed", "victory"]
};
</script>

<template>
  <div v-if="guessed" v-bind:class="{ green: victory, red: !victory}" class="banner">
    <div v-if="victory">
      <label>
        You got it, nice work!
        <button @click="$emit('reset-game')">Play again?</button>
      </label>
    </div>
    <div v-else>Sorry that is not correct, please try again.</div>
  </div>
</template>

<style scoped>
.green {
  background-color: green;
}

.red {
  background-color: red;
}

.banner {
  color: white;
  font-weight: bold;
  width: fit-content;
  padding: 5px;
}
</style>
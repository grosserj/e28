<template>
  <div>
    <br />
    <b-alert
      variant='success'
      :show='dismissCountDown'
      fade
      @dismiss-count-down='countDownChanged'
    >{{ message }}</b-alert>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data: function() {
    return {
      dismissSecs: 2,
      dismissCountDown: 0
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },
  watch: {
    message: function() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>
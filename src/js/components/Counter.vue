<template lang="pug">
.counter
    .counter_bg
        .counter_number {{ heleData.heleCount }}
</template>

<style lang="scss" scoped>
@import 'config';
.counter_bg{
    background-color: #000;
}
.counter_number{
    font-family:'digital-7';
    font-size: 80px;
    color: white;
}


</style>

<script>
export default {
  name: 'root',
  data () {
    return {
     heleData: {
        heleCount: 'Loading...',
      }
    }
  },
  methods: {
    getFirebaseData() {
      firebase
        .database()
        .ref("hele")
        .on("value", snapshot => {
          if (snapshot.exists()) {
            this.$set(this.heleData, "heleCount", snapshot.val());
          }
        });
    }
  },
  mounted: function () {
      this.getFirebaseData();
  }
};
</script>

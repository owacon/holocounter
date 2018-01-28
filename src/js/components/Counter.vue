<template lang="pug">
.counter
    .counter_bg
      .counter_frame
        .counter_hele へぇ
      .counter_number {{ heleData.heleCount }}
</template>

<style lang="scss" scoped>
@import "config";
.counter {
  width: 100%;
  height: 100%;
  &_bg {
    width: 100%;
    height: 100%;
    background: linear-gradient(#168bba, #36b9d7, #a8e7fa);
    position: relative;
  }
  &_frame {
    width: 1000px;
    height: 718px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-image: url("./img/frame1.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  &_number {
    font-family: "digital-7";
    font-size: 400px;
    color: white;
    // background-color: #000;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 80%;
    text-align: center;
  }
  &_hele {
    color: white;
    font-size: 80px;
    font-weight: bold;
    position: absolute;
    bottom: 130px;
    right: 200px;
  }
}
</style>

<script>
export default {
  name: "root",
  data() {
    return {
      heleData: {
        heleCount: "Loading..."
      }
    };
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
  mounted: function() {
    this.getFirebaseData();
  }
};
</script>

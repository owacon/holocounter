<template lang="pug">
.admin
    .div1
        input.button(type="submit" value="リセット" v-on:click="resetHeleCount")
        input.button(type="submit" value="ストップ" v-if="heleData.isActive" v-on:click="stopHeleCount")
        input.button(type="submit" value="スタート" v-else v-on:click="startHeleCount")
    .div2 へぇ制限:
        form
            input(type="text" name="limit" size="4" maxlength="4" v-model='heleData.limit.max')
            input(type="radio" id='off' value="false" v-model='heleData.limit.isLimited' v-on:change='toggleHeleLimit')
            label(for="off") off
            input(type="radio" id='on' value="true" v-model='heleData.limit.isLimited' v-on:change='toggleHeleLimit')
            label(for="on") on
    .div3 おめでとう:
        input.button(type="submit" value="on" v-if="!heleData.isCongrats" v-on:click="toggleCongrats")
        input.button(type="submit" value="off" v-else v-on:click="toggleCongrats")
</template>

<style lang="scss" scoped>
@import "config";
.admin {
  background-color: #000;
  color: #fff;
  height: 100%;
}
.button {
  width: 100px;
  border: solid 1px #ccc;
  padding: 15px 0px;
  margin: 0 20px 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
</style>

<script>
export default {
  name: "admin",
  data() {
    return {};
  },
  props: ["heleData"],
  methods: {
    resetHeleCount() {
      firebase
        .database()
        .ref("hele")
        .set(0);
    },
    stopHeleCount() {
      if (this.heleData.isActive) {
        firebase
          .database()
          .ref("isActive")
          .set(false);
      }
    },
    startHeleCount() {
      if (!this.heleData.isActive) {
        firebase
          .database()
          .ref("isActive")
          .set(true);
      }
    },
    toggleHeleLimit(e) {
      firebase
        .database()
        .ref("limit/isLimited")
        .set(!!this.heleData.limit.isLimited);
      console.log(e.target.value);
      //   else if (!e.target.valse) {
      //     firebase
      //       .database()
      //       .ref("limit/isLimited")
      //       .set(false);
      //       console.log(e.target);
      //   }
    },
    toggleCongrats() {
      if (this.heleData.isCongrats) {
        firebase
          .database()
          .ref("isCongrats")
          .set(false);
      } else if (!this.heleData.isCongrats) {
        firebase
          .database()
          .ref("isCongrats")
          .set(true);
      }
    }
  },
  mounted: function() {}
};
</script>

<template lang="pug">
.admin
    .div1
        input(type="submit" value="リセット" v-on:click="resetHeleCount")
        input(type="submit" value="ストップ" v-if="heleData.isActive" v-on:click="stopHeleCount")
        input(type="submit" value="スタート" v-else="heleData.isActive" v-on:click="startHeleCount")
    .div2 へぇ制限:
        form
            input(type="text" name="limit" size="4" maxlength="4" v-model='heleData.limit.max')
            input(type="radio" id='off' value="false" v-model='heleData.limit.isLimited' v-on:change='toggleHeleLimit')
            label(for="off") off
            input(type="radio" id='on' value="true" v-model='heleData.limit.isLimited' v-on:change='toggleHeleLimit')
            label(for="on") on

</template>

<style lang="scss" scoped>
@import "config";
.admin {
  background-color: #000;
  color: #fff;
  height: 100%;
}
</style>

<script>
export default {
  name: "admin",
  data() {
    return {
      heleData: {
        isActive: false,
        limit: {
          isLimited: false,
          max: 20
        }
      }
    };
  },
  props: ["rootData"],
  methods: {
    getFirebaseData() {
      firebase
        .database()
        .ref("isActive")
        .on("value", snapshot => {
          if (snapshot.exists()) {
            this.$set(this.heleData, "isActive", snapshot.val());
          }
        });
      firebase
        .database()
        .ref("limit")
        .on("value", snapshot => {
          if (snapshot.exists()) {
            this.$set(this.heleData, "limit", snapshot.val());
          }
        });
    },
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
    }
  },
  mounted: function() {
    this.getFirebaseData();
  }
};
</script>

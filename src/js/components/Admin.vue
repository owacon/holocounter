<template lang="pug">
.admin
    input(type="submit" value="リセット" v-on:click="resetHeleCount")
    input(type="submit" value="ストップ" v-if="heleData.isActive" v-on:click="stopHeleCount")
    input(type="submit" value="スタート" v-if="!heleData.isActive" v-on:click="startHeleCount")
</template>

<style lang="scss" scoped>
@import "config";
</style>

<script>
export default {
  name: "admin",
  data() {
    return {
      heleData: {
        isActive: false
      }
    };
  },
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
    }
  },
  mounted: function() {
    this.getFirebaseData();
  }
};
</script>

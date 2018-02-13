<template lang="pug">
.root
  router-view(:heleData='this.heleData')
</template>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  position: relative;
  // background: linear-gradient(#168bba, #36b9d7, #a8e7fa);
  background: linear-gradient(#6789f7, #36b9d7, #a8e7fa);
}
</style>

<script>
import HeleButton from "./HeleButton.vue";
import Admin from "./Admin.vue";

export default {
  name: "root",
  components: {
    HeleButton,
    Admin
  },
  data() {
    return {
      heleData: {
        ownHeleCount: 0,
        heleCount: "Loading...",
        isActive: false,
        isCongrats: false,
        defaultMax: 999,
        limit: {
          isLimited: false,
          max: 20
        }
      }
    };
  },
  computed: {},
  methods: {
    getFirebaseData() {
      firebase
        .database()
        .ref("hele")
        .on("value", snapshot => {
          if (snapshot.exists()) {
            this.$set(this.heleData, "heleCount", snapshot.val());
          }
          if (snapshot.val() === 0) {
            this.heleData.ownHeleCount = 0;
          }
        });
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
      firebase
        .database()
        .ref("isCongrats")
        .on("value", snapshot => {
          if (snapshot.exists()) {
            this.$set(this.heleData, "isCongrats", snapshot.val());
          }
        });
    }
  },
  mounted: function() {
    this.getFirebaseData();
  }
};

document.documentElement.addEventListener(
  "touchstart",
  function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  false
);

var lastTouchEnd = 0;
document.documentElement.addEventListener(
  "touchend",
  function(event) {
    var now = new Date().getTime();
    if (now - lastTouchEnd <= 100) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);
</script>

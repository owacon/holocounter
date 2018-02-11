<template lang="pug">
.root
  router-view(:rootData='this.rootData')
</template>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(#168bba, #36b9d7, #a8e7fa);
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
      rootData: {
        ownHeleCount: 0
      }
    };
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

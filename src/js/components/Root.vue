<template lang="pug">
.root
  .hele_button(v-on:click='incrementHele')
  //- .counter {{ heleData.heleCount }}
</template>

<style lang="scss" scoped>
@import "config";
.root {
  width: 100%;
  height: 100%;
  position: relative;
}
.hele_button {
  width: 70%;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: #444;
}
</style>

<script>
import axios from "axios";

let heleSound;
window.AudioContext = window.AudioContext || window.webkitAudioContext;  
const context = new AudioContext();

export default {
  name: "root",
  data() {
    return {
      heleData: {
        heleCount: "Loading...",
        isActive: false
      }
    };
  },
  methods: {
    getSound(path, buffer) {
      axios
        .get(path, { responseType: "arraybuffer" })
        .then(response => {
          const sound = response.data;
          context.decodeAudioData(sound, function(buf) {
            heleSound = buf;
            // console.log(source.buffer);
          });
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    playSound() {
      const source = context.createBufferSource();
      source.buffer = heleSound;
      source.connect(context.destination);
      source.start(0);
    },
    getFirebaseData() {
      firebase
        .database()
        .ref("hele")
        .on("value", snapshot => {
          if (snapshot.exists()) {
            this.$set(this.heleData, "heleCount", snapshot.val());
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
    },
    incrementHele() {
      if (this.heleData.isActive) {
        this.playSound();
        let addHele = this.heleData.heleCount;
        addHele++;
        firebase
          .database()
          .ref(`hele`)
          .set(addHele);
      }
    }
  },
  mounted: function() {
    this.getSound("./sound/hele.mp3");
    this.getFirebaseData();
  }
};
</script>

<template lang="pug">
.root
  .hele_button(v-on:click='incrementHele')
    .hele_button_cap(data-push='false')
    .hele_button_base
  //- .counter {{ heleData.heleCount }}
</template>

<style lang="scss" scoped>
@import "config";
.root {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;
}
.hele_button {
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  &_cap {
    width: 430*0.5px;
    height: 206*0.5px;
    background-image: url("./img/hele_button.png");
    background-size: contain;
    background-position: center;
    margin: 0 auto -53px;
    &[data-push="true"] {
      transform: translateY(5px);
    }
  }
  &_base {
    width: 570*0.5px;
    height: 269*0.5px;
    margin: 0 auto;
    background-image: url("./img/hele_base.png");
    background-size: contain;
    background-position: center;
    position: relative;
  }
}
</style>

<script>
import axios from "axios";

let heleSound;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

let hele_button_cap;

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
        hele_button_cap.setAttribute("data-push", "true");
        // let addHele = this.heleData.heleCount;
        // addHele++;
        // firebase
        //   .database()
        //   .ref(`hele`)
        //   .set(addHele);
        const databaseRef = firebase.database().ref(`hele`);
        databaseRef.transaction(function(searches) {
          if (searches !== undefined) {
            searches = searches + 1;
          }
          return searches;
        });
      }
      setTimeout(function() {
        hele_button_cap.setAttribute("data-push", "false");
      }, 80);
    }
  },
  mounted: function() {
    this.getSound("./sound/hele.mp3");
    this.getFirebaseData();
    hele_button_cap = document.querySelector(".hele_button_cap");
  }
};
</script>

<template lang="pug">
.heleButton
  .hele_own_count_bg
  .hele_own_count.hele_own_count_shadow(v-if='counterLength == 1') 8
  .hele_own_count.hele_own_count_shadow(v-if='counterLength == 2') 88
  .hele_own_count.hele_own_count_shadow(v-if='counterLength == 3') 888
  .hele_own_count {{ rootData.ownHeleCount }}
  .hele_button(v-on:click='incrementHele')
    .hele_button_cap(data-push='false')
    .hele_button_base
</template>

<style lang="scss" scoped>
@import "config";
.hele_own_count {
  font-family: "digital-7";
  font-size: 150px;
  color: white;
  // background-color: #000;
  display: block;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  text-align: center;
  &_shadow {
    color: rgba(gray, 0.3);
  }
  &_bg {
    position: absolute;
    width: 70%;
    height: 150px;
    background-color: black;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
}
}
.hele_button {
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-10%) translateX(-50%);
  -webkit-tap-highlight-color:rgba(0,0,0,0);
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
  name: "hele-button",
  data() {
    return {
      heleData: {
        heleCount: "Loading...",
        isActive: false,
        limit: {
          isLimited: false,
          max: 20
        }
      }
    };
  },
  props: ["rootData"],
  computed: {
    counterLength: function() {
      const data = this.rootData.ownHeleCount.toString();
      const digit = data.length;
      return digit;
    }
  },
  methods: {
    getSound(path, buffer) {
      axios
        .get(path, { responseType: "arraybuffer" })
        .then(response => {
          const sound = response.data;
          context.decodeAudioData(sound, function(buf) {
            heleSound = buf;
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
          if (snapshot.val() === 0) {
            console.log("reset");
            this.rootData.ownHeleCount = 0;
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
    },
    incrementHele() {
      if (this.heleData.isActive) {
        this.playSound();
        if (this.rootData.ownHeleCount < 999){
          this.rootData.ownHeleCount = this.rootData.ownHeleCount + 1;
        }
        hele_button_cap.setAttribute("data-push", "true");
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

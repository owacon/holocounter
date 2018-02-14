<template lang="pug">
.heleButton
  canvas#bg_bubble(width='1280' height='960')
  .hele_own_count.hele_own_count_bg
  .hele_own_count.hele_own_count_shadow(v-if='counterLength == 1') 8
  .hele_own_count.hele_own_count_shadow(v-if='counterLength == 2') 88
  .hele_own_count.hele_own_count_shadow(v-if='counterLength == 3') 888
  .hele_own_count.hele_own_count.js-is-max(data-is-max='false') {{ heleData.ownHeleCount }}
  .hele_button(v-on:click='incrementHele')
    .hele_button_cap.js-push(data-push='false')
    .hele_button_base
  .hele_button_flash.js-push(data-push='false')
</template>

<style lang="scss" scoped>
  @import "config";
  .heleButton {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .hele_own_count {
    font-family: "digital-7";
    font-size: 40vw;
    color: white;
    // background-color: #000;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    width: 80%;
    text-align: center;
    &[data-is-max="true"] {
      color: red;
    }
    &_shadow {
      color: rgba(gray, 0.3);
    }
    &_bg {
      position: absolute;
      width: 70vw;
      height: 40vw;
      background-color: black;
      border-radius: 4vw;
      // max-width: 262.5px;
      transform: translateX(-50%) translateY(-130%);
    }
  }
  
  .hele_button {
    width: 100vw;
    height: 45vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(10%) translateX(-50%);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &_cap {
      width: 60vw;
      height: 206 / 430 * 60vw;
      background-image: url("./img/hele_button.png");
      background-size: 100% auto;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 auto;
      margin-bottom: -15vw;
      &[data-push="true"] {
        transform: translateY(5px);
      }
    }
    &_base {
      width: 80vw;
      height: 269 / 570 * 80vw;
      margin: 0 auto;
      background-image: url("./img/hele_base.png");
      background-size: 100% auto;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
    }
    &_flash {
      background-image: url("./img/hele_flash3.png");
      background-size: contain;
      background-position: center;
      width: 100vh;
      height: 100vh;
      left: 50%;
      top: 50%;
      position: absolute;
      transform: translateX(-50%) translateY(-42%);
      display: none;
      pointer-events: none;
      &[data-push="true"] {
        display: block;
        animation: flash 0.8s ease 0s;
        animation-fill-mode: forwards;
      }
    }
  }
  
  @keyframes flash {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0.3;
    }
    90% {
      opacity: 0.3;
    }
    100% {
      opacity: 0;
    }
  }
</style>

<script>
  import axios from "axios";
  
  import Bubble from "../lib/Bubble.js";
  
  const omedetouPath = [
    "./sound/omedetou/misato.mp3",
    "./sound/omedetou/asuka.mp3",
    "./sound/omedetou/rei.mp3",
    "./sound/omedetou/kensuke.mp3",
    "./sound/omedetou/touji.mp3"
  ];
  const omedetouSounds = [];
  let heleSound;
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();
  
  let pushAnimationDom;
  let countNumDom;
  let canvas;
  
  const resize = () => {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
  };
  
  export default {
    name: "hele-button",
    data() {
      return {};
    },
    props: ["heleData"],
    computed: {
      counterLength: function() {
        const data = this.heleData.ownHeleCount.toString();
        const digit = data.length;
        return digit;
      }
    },
    methods: {
      getHeleSound(path, buffer) {
        axios
          .get(path, {
            responseType: "arraybuffer"
          })
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
      getOmedetouSoundss(array, buffer) {
        for (let path of omedetouPath) {
          axios
            .get(path, {
              responseType: "arraybuffer"
            })
            .then(response => {
              const sound = response.data;
              context.decodeAudioData(sound, function(buf) {
                omedetouSounds.push(buf);
              });
            })
            .catch(err => {
              console.log("err:", err);
            });
        }
      },
      playSound() {
        if (!this.heleData.isCongrats) {
          const source = context.createBufferSource();
          source.buffer = heleSound;
          source.connect(context.destination);
          source.start(0);
        } else if (this.heleData.isCongrats) {
          const source = context.createBufferSource();
          source.buffer =
            omedetouSounds[Math.floor(Math.random() * omedetouSounds.length)];
          source.connect(context.destination);
          source.start(0);
        }
      },
  
      incrementHele() {
        if (this.heleData.isActive) {
          if (this.heleData.limit.isLimited) {
            if (this.heleData.ownHeleCount < this.heleData.limit.max) {
              this.playSound();
              this.heleData.ownHeleCount = this.heleData.ownHeleCount + 1;
              for (let val of pushAnimationDom) {
                val.setAttribute("data-push", "true");
              }
              const databaseRef = firebase.database().ref(`hele`);
              databaseRef.transaction(function(searches) {
                if (searches !== undefined) {
                  searches = searches + 1;
                }
                return searches;
              });
            }
          } else if (!this.heleData.limit.isLimited) {
            if (this.heleData.ownHeleCount < this.heleData.defaultMax) {
              this.playSound();
              this.heleData.ownHeleCount = this.heleData.ownHeleCount + 1;
              for (let val of pushAnimationDom) {
                val.setAttribute("data-push", "true");
              }
              const databaseRef = firebase.database().ref(`hele`);
              databaseRef.transaction(function(searches) {
                if (searches !== undefined) {
                  searches = searches + 1;
                }
                return searches;
              });
            }
          }
        }
        setTimeout(function() {
          for (let val of pushAnimationDom) {
            val.setAttribute("data-push", "false");
          }
        }, 80);
      }
    },
    watch: {
      "heleData.ownHeleCount": function() {
        if (this.heleData.limit.isLimited) {
          if (this.heleData.limit.max <= this.heleData.ownHeleCount) {
            countNumDom.setAttribute("data-is-max", "true");
          } else if (this.heleData.limit.max > this.heleData.ownHeleCount) {
            countNumDom.setAttribute("data-is-max", "false");
          }
        } else if (!this.heleData.limit.isLimited) {
          if (this.heleData.defaultMax <= this.heleData.ownHeleCount) {
            countNumDom.setAttribute("data-is-max", "true");
          } else if (this.heleData.defaultMax > this.heleData.ownHeleCount) {
            countNumDom.setAttribute("data-is-max", "false");
          }
        }
      }
    },
    mounted: function() {
      this.getHeleSound("./sound/hele.mp3");
      this.getOmedetouSoundss(omedetouPath);
      pushAnimationDom = document.querySelectorAll(".js-push");
      countNumDom = document.querySelector(".js-is-max");
      canvas = document.querySelector("#bg_bubble");
      resize();
      Bubble(window, document, 20, 7);
    }
  };
</script>

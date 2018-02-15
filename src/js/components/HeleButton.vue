<template lang="pug">
.heleButton
  .corner.corner--1
  .corner.corner--2
  .corner.corner--3
  .corner.corner--4
  .hele_own_count.hele_own_count_bg
    .hele_own_count_bg--inner
      p.hele_own_count.hele_own_count_num.hele_own_count_num--shadow(v-if='counterLength == 1') 8
      p.hele_own_count.hele_own_count_num.hele_own_count_num--shadow(v-if='counterLength == 2') 88
      p.hele_own_count.hele_own_count_num.hele_own_count_num--shadow(v-if='counterLength == 3') 888
      p.hele_own_count.hele_own_count_num.hele_own_count.js-is-max(data-is-max='false') {{ heleData.ownHeleCount }}
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
  
  .corner {
    @include pc-layout {
      width: 20vw;
      height: 20vw;
    }
    @include sp-layout {
      width: 40vw;
      height: 40vw;
    }
    background-image: url('./img/corner.png');
    background-size: contain;
    position: absolute;
    &--1 {
      right: 0;
    }
    &--2 {
      bottom: 0;
      right: 0;
      transform: rotateX(180deg);
    }
    &--3 {
      bottom: 0;
      transform: rotateX(180deg) rotateY(180deg);
    }
    &--4 {
      transform: rotateY(180deg);
    }
  }
  
  .hele_own_count {
    position: absolute;
    bottom: -6%;
    left: 50%;
    &_num {
      @include pc-layout {
        font-size: 20vw;
      }
      @include sp-layout {
        font-size: 40vw;
      }
      font-family: "digital-7";
      color: white;
      display: block;
      text-align: center;
      line-height: 1;
      vertical-align: baseline;
      transform: translateX(-50%);
      &[data-is-max="true"] {
        color: red;
      }
      &--shadow {
        color: rgba(gray, 0.3);
      }
    }
    &_bg {
      @include pc-layout {
        width: 40vw;
        height: 20vw;
        border-radius: 2vw;
        transform: translateX(-50%) translateY(-26vw);
      }
      @include sp-layout {
        width: 70vw;
        height: 40vw;
        border-radius: 4vw;
        transform: translateX(-50%) translateY(-48vw);
      }
      display: block;
      top: 50%;
      left: 50%;
      background-color: black;
      &--inner {
        position: relative;
        @include pc-layout {
          width: 40vw;
          height: 20vw;
          border-radius: 2vw;
        }
        @include sp-layout {
          width: 70vw;
          height: 40vw;
          border-radius: 4vw;
        }
      }
    }
  }
  .android {
    bottom: 12%;
  }
  
  .hele_button {
    @include pc-layout {
      width: 30vw;
      height: 13.5vw;
      top: 50%;
      left: 50%;
      transform: translateY(10%) translateX(-50%);
    }
    @include sp-layout {
      width: 100vw;
      height: 45vw;
      top: 50%;
      left: 50%;
      transform: translateY(10%) translateX(-50%);
    }
    position: absolute;
    -webkit-tap-highlight-color: rgba(0,
    0,
    0,
    0);
    &_cap {
      background-image: url("./img/hele_button.png");
      background-size: 100% auto;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 auto;
      margin-bottom: -13vw;
      pointer-events: none;
      @include pc-layout {
        width: 22.5vw;
        height: 206 / 430 * 22.5vw;
        margin-bottom: -5vw;
      }
      @include sp-layout {
        width: 52.5vw;
        height: 206 / 430 * 52.5vw;
      }
      &[data-push="true"] {
        @include pc-layout {
          transform: translateY(1vw);
        }
        @include sp-layout {
          transform: translateY(1.5vw);
        }
      }
    }
    &_base {
      @include pc-layout {
        width: 30vw;
        height: 269 / 570 * 30vw;
      }
      @include sp-layout {
        width: 70vw;
        height: 269 / 570 * 70vw;
      }
      margin: 0 auto;
      background-image: url("./img/hele_base.png");
      background-size: 100% auto;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      pointer-events: none;
    }
    &_flash {
      @include pc-layout {
        width: 100vw;
        height: 100vw;
      }
      @include sp-layout {
        width: 100vh;
        height: 100vh;
      }
      background-image: url("./img/hele_flash3.png");
      background-size: contain;
      background-position: center;
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
      if (navigator.userAgent.indexOf('Android') > 0){
        for(let dom of document.querySelectorAll('.hele_own_count_num')){
          dom.classList.add('android');
        }
      }
      pushAnimationDom = document.querySelectorAll(".js-push");
      countNumDom = document.querySelector(".js-is-max");
      canvas = document.querySelector("#bg_bubble");
    }
  };
</script>

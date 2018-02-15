<template lang="pug">
.counter
    .counter_bg
      canvas#bg_bubble(width='1280' height='960')
      .counter_frame
        .counter_hele へぇ
        .counter_number.counter_number_shadow(v-if='counterLength == 1') 8
        .counter_number.counter_number_shadow(v-if='counterLength == 2') 88
        .counter_number.counter_number_shadow(v-if='counterLength == 3') 888
        .counter_number.counter_number_shadow(v-if='counterLength == 4') 8888
        .counter_number {{ heleData.heleCount }}
</template>

<style lang="scss" scoped>
@import "config";
.counter {
  width: 100%;
  height: 100%;
  &_bg {
    width: 100%;
    height: 100%;
    // background: linear-gradient(#168bba, #36b9d7, #a8e7fa);
    background: linear-gradient(#6789f7, #36b9d7, #a8e7fa);
    position: relative;
  }
  &_frame {
    @include pc-layout {
      width: 718px / 1000px * 100%;
      height: 100%;
    }
    @include sp-layout {
      width: 359px / 500px * 100%;
      height: 100%;
    }
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-image: url("./img/frame2.png");
    background-size: 100% auto;
    background-position: center;
    background-repeat: no-repeat;
  }
  &_number {
    font-family: "digital-7";
    font-size: 26vw;
    color: white;
    // background-color: #000;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-47%) translateX(-50%);
    width: 80%;
    text-align: center;
    &_shadow {
      color: rgba(gray, 0.2);
    }
  }
  &_hele {
    color: white;
    font-weight: bold;
    position: absolute;
    font-size: 6vw;
    top: 50%;
    left: 50%;
    transform: translateY(88%) translateX(101%);
    @include pc-layout {
    }
    @include sp-layout {

    }
  }
}
</style>

<script>
import Bubble from "../lib/Bubble.js";

let canvas;
const resize = () => {
  canvas.setAttribute("width", window.innerWidth);
  canvas.setAttribute("height", window.innerHeight);
};

// let timer = 0;

// window.onresize = function() {
//   if (timer > 0) {
//     clearTimeout(timer);
//   }
//   timer = setTimeout(() => {
//     resize();
//   }, 200);
// };

export default {
  name: "counter",
  data() {
    return {
      heleData: {
        heleCount: "---"
      }
    };
  },
  computed: {
    counterLength: function() {
      const data = this.heleData.heleCount.toString();
      const digit = data.length;
      return digit;
    }
  },
  methods: {
    getFirebaseData() {
      firebase
        .database()
        .ref("hele")
        .on("value", snapshot => {
          if (snapshot.exists()) {
            this.$set(this.heleData, "heleCount", snapshot.val());
          }
        });
    }
  },
  mounted: function() {
    this.getFirebaseData();
    canvas = document.querySelector("#bg_bubble");
    resize();
    Bubble(window, document, 500, 7);
  }
};
</script>

<template lang="pug">
.admin
  .admin_inner
    .div1
      .num_title NOW HELE
      .num_title MAX HELE
    .div.div2
      div.nowCount {{ heleData.heleCount}}
      input.max_num(type="number" name="limit" size="3" maxlength="3" v-model='heleData.limit.max' v-on:change='setMaxNum($event)')
    .div.div3
      input.toggle_button.toggle_button--congrats(type="checkbox" data-off-label="MEDETAKUNAI" data-on-label="MEDETAI" v-model='heleData.isCongrats' v-on:change="toggleCongrats($event)")
      input.toggle_button.toggle_button--limit(type="checkbox" data-off-label="UNLIMITED" data-on-label="LIMITED" v-model='heleData.limit.isLimited' v-on:change='toggleHeleLimit($event)')
    .div.div4
      input.toggle_button.toggle_button--stop(type="checkbox" data-off-label="STOP" data-on-label="RUN" v-model='heleData.isActive' v-on:change='toggleHeleCount($event)')
    .div.div5
      button.button.button--reset(type="submit" value="RESET" v-on:click="resetHeleCount")
    .div.div6
      button.button.button--hele(type="submit" value="SUPER HELE" v-on:click="superIncrementHele")
</template>

<style lang="scss" scoped>
@import "config";
.admin {
  background-color: #555;
  color: #fff;
  height: 100%;
  &_inner {
    max-width: 375px;
    position: absolute;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.div {
  margin: 0 0 20px 0;
}
.num_title {
  width: 50%;
  display: inline-block;
  text-align: center;
}
.nowCount {
  display: inline-block;
  margin:0 1% 0 0.5%;
}
.max_num {
  vertical-align: top;
  border: none;
}
.nowCount,
.max_num {
  line-height: 64px;
  background-color: #000;
  width: 45%;
  height: 64px;
  text-align: center;
  color: white;
  font-family: "digital-7";
  font-size: 50px;
  padding: 2%;
  border-radius: 10px;
}

.toggle_button:focus:hover {
  outline: none;
}
.button,
.toggle_button {
  appearance: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  vertical-align: top;
  height: 64px;
  margin: 0;
  border-radius: 8px;
  border: 1px solid #888;
  background-color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  cursor: pointer;
  transition: 200ms;
  &--stop {
    width: 100%;
  }
  &--limit,
  &--congrats {
    width: 50%;
  }
}

.button:active,
.toggle_button:active {
  height: 62px;
  margin-top: 2px;
  transition: none;
}

.toggle_button:not(:checked)::after {
  display: inline;
  content: attr(data-off-label);
  color: #888;
  transition: none;
}
.toggle_button:checked::after {
  display: inline;
  content: attr(data-on-label);
  color: #cfc;
  text-shadow: 0px 0px 10px #cfc, 0px 0px 20px #cfc, 0px 0px 30px #cfc;
  transition: 400ms;
}
.toggle_button:active::after {
  transition: none;
}

.button {
  &--reset {
    width: 100%;
  }
  &--hele {
    width: 100%;
  }
}
.button--reset::after {
  display: inline;
  content: attr(value);
  color: #f77;
  text-shadow: 0px 0px 10px #f77, 0px 0px 20px #f77;
  transition: none;
}
.button--hele::after {
  display: inline;
  content: attr(value);
  color: #99f;
  text-shadow: 0px 0px 10px #99f, 0px 0px 20px #99f;
  transition: none;
}
</style>

<script>
export default {
  name: "admin",
  data() {
    return {};
  },
  props: ["heleData"],
  methods: {
    resetHeleCount() {
      firebase
        .database()
        .ref("hele")
        .set(0);
    },
    toggleHeleCount(e) {
      if (e.target.checked) {
        firebase
          .database()
          .ref("isActive")
          .set(e.target.checked);
      } else if (!e.target.checked) {
        firebase
          .database()
          .ref("isActive")
          .set(e.target.checked);
      }
    },
    toggleHeleLimit(e) {
      if (e.target.checked) {
        firebase
          .database()
          .ref("limit/isLimited")
          .set(true);
      } else if (!e.target.checked) {
        firebase
          .database()
          .ref("limit/isLimited")
          .set(false);
      }
    },
    toggleCongrats(e) {
      if (e.target.checked) {
        firebase
          .database()
          .ref("isCongrats")
          .set(e.target.checked);
      } else if (!e.target.checked) {
        firebase
          .database()
          .ref("isCongrats")
          .set(e.target.checked);
      }
    },
    setMaxNum(e) {
      firebase
        .database()
        .ref("limit/max")
        .set(e.target.value);
    },

    superIncrementHele() {
      const databaseRef = firebase.database().ref(`hele`);
      databaseRef.transaction(function(searches) {
        if (searches !== undefined) {
          searches = searches + 1;
        }
        return searches;
      });
    }
  },
  mounted: function() {}
};
</script>

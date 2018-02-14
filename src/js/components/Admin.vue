<template lang="pug">
.admin
  .admin_inner
    .div1
      .num_title CURRENT HELE
      .num_title MAX HELE
    .div.div2
      input.nowCount(type="number" name="count" size="4" maxlength="4" v-model='heleData.heleCount' v-on:change='setCountNum($event)')
      input.max_num(type="number" name="limit" size="3" maxlength="3" v-model='heleData.limit.max' v-on:change='setMaxNum($event)')
    .div.div3
      .button_count.button_count--up(type='submit' value='▲' v-on:click='superIncrementHele')
      .button_count.button_count--down(type='submit' value='▼' v-on:click='superDecrementHele')
      .button_count.button_count--up(type='submit' value='▲' v-on:click='incrementLimit')
      .button_count.button_count--down(type='submit' value='▼' v-on:click='decrementLimit')
    .div.div4
      input.toggle_button.toggle_button--congrats(type="checkbox" data-off-label="MEDETAKUNAI" data-on-label="MEDETAI" v-model='heleData.isCongrats' v-on:change="toggleCongrats($event)")
      input.toggle_button.toggle_button--limit(type="checkbox" data-off-label="UNLIMITED" data-on-label="LIMITED" v-model='heleData.limit.isLimited' v-on:change='toggleHeleLimit($event)')
    .div.div5
      input.toggle_button.toggle_button--stop(type="checkbox" data-off-label="STOP" data-on-label="RUN" v-model='heleData.isActive' v-on:change='toggleHeleCount($event)')
    .div.div6
      button.button.button--reset(type="submit" value="RESET" v-on:click="resetHeleCount")
    .div.div7
      button.button.button--hele(type="submit" value="HELE" data-is-active='false' v-on:click="incrementHele")
    //- .div.div7
    //-  button.button.button--super(type="submit" value="SUPER HELE" data-is-active='true' v-on:click="superIncrementHele")
</template>

<style lang="scss" scoped>
@import "config";
.admin {
  position: relative;
  background-color: #555;
  color: #fff;
  width: 100%;
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
  margin: 0 auto 20px;
  &2{
    margin: 0 auto 5px;
  }
}
.num_title {
  width: 50%;
  display: inline-block;
  text-align: center;
  font-weight: bold;
}
.nowCount {
  display: inline-block;
  margin:0 2% 0 0;
}
.max_num {
  vertical-align: top;
}
.nowCount,
.max_num {
  border: none;
  box-sizing:border-box;
  line-height: 64px;
  background-color: #000;
  width: 49%;
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
.button_count,
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

.button_count{
  width:25%;
  height:32px;
  box-sizing:border-box;
  line-height: 29px;
  &--up::after,&--down::after{
    display: inline;
    content: attr(value);
    transition: none;
    color: #888;
    vertical-align: bottom;
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
  &--hele,&--super {
    width: 100%;
    &[data-is-active='true']::after{
      color: #99f;
      text-shadow: 0px 0px 10px #99f, 0px 0px 20px #99f;
    }
  }
}
.button--reset::after {
  display: inline;
  content: attr(value);
  color: #f77;
  text-shadow: 0px 0px 10px #f77, 0px 0px 20px #f77;
  transition: none;
}
.button--hele::after, .button--super::after{
  display: inline;
  content: attr(value);
  transition: none;
  color: #888;
}
</style>

<script>
let heleButtonDom;

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
        .set(parseInt(e.target.value));
    },
    setCountNum(e) {
      firebase
        .database()
        .ref("hele")
        .set(parseInt(e.target.value));
    },
    incrementHele() {
      if(this.heleData.isActive){
        this.superIncrementHele();
      }
    },
    superIncrementHele() {
      const databaseRef = firebase.database().ref(`hele`);
      databaseRef.transaction(function(searches) {
        if (searches !== undefined) {
          searches = searches + 1;
          return searches;
        }
      });
    },
    superDecrementHele() {
      const databaseRef = firebase.database().ref(`hele`);
      databaseRef.transaction(function(searches) {
        if (searches !== undefined) {
          if(searches > 0){
            searches = searches - 1;
            return searches;
          }
        }
      });
    },
    incrementLimit() {
      const databaseRef = firebase.database().ref(`limit/max`);
      databaseRef.transaction(function(searches) {
        if (searches !== undefined) {
          searches = searches + 1;
          return searches;
        }
      });
    },
    decrementLimit() {
      const databaseRef = firebase.database().ref(`limit/max`);
      databaseRef.transaction(function(searches) {
        if (searches !== undefined) {
          if(searches > 0){
            searches = searches - 1;
            return searches;
          }
        }
      });
    }
  },
  watch: {
    'heleData.isActive': function(){
      heleButtonDom.setAttribute('data-is-active', this.heleData.isActive);
    }
  },
  mounted: function() {
    heleButtonDom = document.querySelector('.button--hele');
  }
};
</script>

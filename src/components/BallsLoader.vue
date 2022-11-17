<template>
<div class="balls__box" :style="boxCss">
  <div class="balls__bounce">
    <div class="balls__child b1"></div>
    <div class="balls__child b2"></div>
    <div class="balls__child b3"></div>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import {view_actions} from "../core/actions.js";

export default {
  name: "BallsLoader",
  computed: {
    ...mapGetters(['isFetching', 'activeView']),
    boxCss() {
      return this.isFetching && this.isActive ? "display: block;" : "display: none"
    },
    isActive() {
      switch (this.activeView) {
        case view_actions.ABOUT: return false
        default: return true
      }
    }
  }
}
</script>

<style scoped>
.balls__box {
  position:relative;
  min-height: 100px;
}
.balls__box .balls__bounce {
  position:absolute;
  z-index:1000;
  top:0;
  right:0;
  bottom:0;
  left:0
}
.balls__bounce {
  margin:40px auto;
  width:80px;
  text-align:center
}
.balls__child {
  width:20px;
  height:20px;
  background-color:#999;
  border-radius:100%;
  display:inline-block;
  -webkit-animation:balls-bounce 1.4s ease-in-out 0s infinite both;
  animation:balls-bounce 1.4s ease-in-out 0s infinite both
}
.balls__bounce .b1 {
  -webkit-animation-delay:-.32s;
  animation-delay:-.32s
}
.balls__bounce .b2 {
  -webkit-animation-delay:-.16s;
  animation-delay:-.16s
}
@-webkit-keyframes balls-bounce {
  0%,
  80%,
  to {
    transform:scale(0)
  }
  40% {
    transform:scale(1)
  }
}
@keyframes balls-bounce {
  0%,
  80%,
  to {
    transform:scale(0)
  }
  40% {
    transform:scale(1)
  }
}
</style>

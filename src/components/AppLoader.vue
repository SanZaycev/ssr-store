<template>
  <div v-if="isFetching && isActive" class="app-loader"><div class="loader-svg"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block;" width="190" height="190" viewBox="0 0 100 100"><circle cx="35" cy="57.5" r="5" fill="#cdcdcd"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="0.9345794392523364s" begin="-0.5607476635514018s"></animate></circle><circle cx="50" cy="57.5" r="5" fill="#cdcdcd"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="0.9345794392523364s" begin="-0.37383177570093457s"></animate></circle><circle cx="65" cy="57.5" r="5" fill="#aaaaaa"><animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="0.9345794392523364s" begin="-0.18691588785046728s"></animate></circle></svg></div></div>
</template>

<script>
import { mapGetters } from "vuex";
import {view_actions} from "../core/actions.js";

export default {
  name: "AppLoader",
  props: {
    action: {
      type: String,
      required: false,
      default: view_actions.DEFAULT
    }
  },
  computed: {
    ...mapGetters(['isFetching', 'activeView']),
    isActive() {
      switch (this.activeView) {
        case view_actions.OFFICE_ORDERS:
          switch (this.action) {
            case view_actions.OFFICE_ORDERS: return false
            default: return true
          }
        case view_actions.PRODUCTS: return true
        case view_actions.PRODUCT_DETAIL: return true
        case view_actions.PROFILE_SETTINGS:
          switch (this.action) {
            case view_actions.PROFILE_SETTINGS: return false
            default: return true
          }
        default: return false
      }
    }
  }
}
</script>

<style scoped>
.app-loader {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 0;
  right: 0;
  bottom: -5px;
  left: 0;
  z-index: 5;
  border-radius: 4px;
  min-height: 200px;
}
.loader-svg {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  background-size: cover;
}
</style>

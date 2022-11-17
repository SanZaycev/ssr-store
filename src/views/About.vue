<template>
  <div class="view-box">
    <h1>О нас</h1>
    <hr>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "About",
  methods: {
    ...mapActions(['setActiveView', 'fetchingTimeout']),
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  },
}
</script>

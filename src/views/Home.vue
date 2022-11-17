<template>
  <div class="view-box">
    <h1>Домашняя страница</h1>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Home',
  methods: {
    ...mapActions(['setActiveView', 'fetchingTimeout']),
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  },
}
</script>

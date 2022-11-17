<template>
  <div class="view-box">
    <div class="view-title">
      <h2>Мой офис</h2>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "OfficeDashboard",
  methods: {
    ...mapActions(['setActiveView', 'fetchingTimeout']),
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  },
}
</script>

<style scoped>

</style>

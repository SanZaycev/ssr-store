<template>
  <div class="view-box">
    <h2>Настройки пользователя</h2>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ProfileSettings",
  methods: {
    ...mapActions(['setActiveView', 'fetchingTimeout'])
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  },
}
</script>

<style scoped>

</style>

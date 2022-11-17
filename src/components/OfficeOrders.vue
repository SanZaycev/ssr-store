<template>
  <div class="view-box">
    <div class="view-title">
      <h2>Заказы пользователя</h2>
    </div>
    <div class="orders-box">
      <ul class="orders-list">
        <li class="order" v-for="o in orders" :key="o.id">{{ o }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "OfficeOrders",
  computed: {
    ...mapGetters('orders', { orders: 'all' }),
  },
  methods: {
    ...mapActions(['fetchingTimeout']),
    ...mapActions(['setActiveView'])
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  },
}
</script>

<style scoped>
.orders-box {
  display: block;
  position: relative;
}
</style>

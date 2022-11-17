<template>
  <div class="view-box">
    <h1>Мой офис</h1>
    <hr>
    <div class="row">
      <div class="col-12 col-md-3">
        <ul class="list-group">
          <router-link tag="li" class="list-group-item" :to="{name: 'office'}">
            <span class="nav-text">Главная</span>
          </router-link>
          <router-link tag="li" class="list-group-item" :to="{name: 'office-orders'}">
            <span class="nav-text">История заказов</span>
          </router-link>
        </ul>
      </div>
      <div class="col-12 col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Office",
  methods: {
    ...mapActions('orders', ['setOrders'])
  },
  async beforeMount() {
    await this.setOrders()
  },
}
</script>

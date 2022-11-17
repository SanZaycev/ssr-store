<template>
	<div class="view-box">
		<div class="view-title"><h1>Оформление заказа</h1></div>
		<hr>
    <div class="view-link"><router-link :to="{name: 'cart'}">&#128281; Назад</router-link></div>
		<p>Сейчас тут пусто</p>
	</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Checkout",
  methods: {
    ...mapActions(['setActiveView', 'fetchingTimeout'])
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  },
}
</script>

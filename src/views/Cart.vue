<template>
	<div class="view-box" v-if="isCart">
		<div class="view-title"><h1>Корзина</h1></div>
		<hr>
		<div v-if="hasProducts" class="cart-content">
      <div class="cart-table">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Итого</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in products" :key="p.id">
              <td>{{ p.title }}</td>
              <td>{{ p.price }}</td>
              <td>{{ p.cnt }}</td>
              <td>{{ p.price * p.cnt }}</td>
              <td>
                <button type="button" class="btn btn-warning mr-1"
                  :disabled="inProccess(p.id) || p.cnt < 2"
                  @click="setCnt({id: p.id, cnt: p.cnt - 1})"
                >-</button>
                <button type="button" class="btn btn-success mr-1"
                  @click="setCnt({id: p.id, cnt: p.cnt + 1})"
                  :disabled="inProccess(p.id)"
                >+</button>
                <button type="button" class="btn btn-danger"
                  @click="remove({id: p.id})"
                  :disabled="inProccess(p.id)"
                >X</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr>
			<router-link class="btn btn-success" :to="{name: 'checkout'}">Оформить покупку</router-link>
		</div>
		<div v-else class="alert alert-warning">Ваша корзина пуста</div>
	</div>
  <Checkout v-else-if="isCheckout" />
  <E404 v-else />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Checkout from "../components/Checkout.vue";
import E404 from "./E404.vue";
import routes from '../router/names.js'

export default {
  name: "Cart",
  components: {
    Checkout,
    E404
  },
  computed: {
    ...mapGetters('cart', {
      products: 'productsDetail',
      inProccess: 'inProccess'
    }),
    hasProducts() {
      return this.products.length > 0;
    },
    isCart() {
      return this.$route.name === routes.Cart
    },
    isCheckout() {
      return this.$route.name === routes.Checkout
    }
  },
  methods: {
    ...mapActions('cart', ['setCnt', 'remove']),
    ...mapActions(['setActiveView', 'fetchingTimeout']),
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  },
}
</script>

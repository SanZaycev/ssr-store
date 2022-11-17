<template>
  <div class="view-box" v-if="hasProducts">
    <div class="view-title"><h1>Товары</h1></div>
    <div class="row">
      <div class="col col-sm-4"
        :class="$style.col"
        v-for="p in products"
        :key="p.id"
      >
        <div class="card">
          <div class="card-body">
            <h3>{{ p.title }}</h3>
            <div>{{ p.price }}</div>
            <router-link :to="{name: 'product-detail', params: {id: p.id}}">Подробнее</router-link>
            <hr>
            <ProductControls :id="p.id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProductControls from "./ProductControls.vue";

export default {
  name: "ProductsList",
  components: {
    ProductControls
  },
  computed: {
    ...mapGetters('products', { products: 'all' }),
    hasProducts() {
      return Array.isArray(this.products) && this.products.length;
    },
  },
  methods: {
    ...mapActions(['setActiveView', 'fetchingTimeout']),
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  }
}
</script>

<style module>
.col{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>

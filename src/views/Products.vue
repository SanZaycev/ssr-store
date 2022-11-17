<template>
<div class="wrap">
  <ProductsList v-if="isList" />
  <ProductDetail v-else-if="isDetail" />
  <E404 v-else />
</div>
</template>

<script>
import ProductsList from "../components/ProductsList.vue";
import ProductDetail from "../components/ProductDetail.vue";
import AppLoader from "../components/AppLoader.vue";
import E404 from "./E404.vue";
import routerNames from "../router/names.js";

export default {
  name: "Products",
  components: {
    ProductsList,
    ProductDetail,
    AppLoader,
    E404
  },
  computed: {
    isList() {
      return this.$route.name === routerNames.Products
    },
    isDetail() {
      return this.$route.name === routerNames.ProductDetail
    }
  }
}
</script>

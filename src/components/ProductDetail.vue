<template>
	<div class="view-box" v-if="hasProduct">
		<div class="view-title"><h1>{{ product.title }}</h1></div>
		<hr>
		<div class="alert alert-success">
			{{ product.price }}
		</div>
		<hr>
		<product-controls :id="id"></product-controls>
		<hr>
		<router-link :to="{name: 'products'}">Назад к продуктам</router-link>
    <hr>
    <div class="box">
      <div class="mb-3">
        Рейтинг товара: {{ rating.average }} ({{ rating.count }} оценок)
      </div>
      <div class="row">
        <div class="col col-2" v-if="canSetRating">
          <div><small>Ваша последняя оценка: {{ userMark.last || 'нет оценки' }} </small></div>
          <div><small>Ваша текущая оценка: {{ userMark.current || 'нет оценки' }}</small></div>
        </div>
        <div class="col col-8">
          <app-rating v-model:value="rating.current" @onupdate="onUpdateRating"></app-rating>
        </div>
        <div class="col col-2" v-if="isAuthenticated">
          <button class="btn btn-primary" :disabled="!canSendMark" @click="sendMark">Оценить</button>
        </div>
        <div class="col col-2" v-else>
          <button class="btn btn-primary" @click="goToLogin">Оценить</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="box mt-3">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis voluptate necessitatibus ullam dolorum laudantium, eos deleniti cupiditate atque magnam autem dignissimos aliquam aut aliquid quae vero, quaerat consectetur eius animi!</p>
      <p>Iusto facere fuga, voluptatum numquam optio eos modi aliquam, odit a ad alias ex laborum quis voluptates, iste incidunt! Veritatis rem fuga aspernatur, sapiente saepe iste libero ab quo aliquid.</p>
      <p>Consequatur nulla voluptates cum minus illo tempore architecto magnam dolorem reiciendis saepe, recusandae eaque nihil beatae mollitia minima quae natus, facilis. Maxime dolore, nobis. Iusto numquam eligendi amet enim inventore!</p>
      <p>Qui reprehenderit quae, ipsam odio tempore minima molestias placeat vel, eius quidem itaque assumenda sed dolores a commodi, quibusdam fuga eveniet cum. Doloremque, assumenda rem. Vel perferendis architecto, ab magnam.</p>
    </div>
	</div>
	<E404 v-else />
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import E404 from '../views/E404.vue';
import ProductControls from './ProductControls.vue';
import AppRating from "./AppRating.vue";
import AppLoader from "./AppLoader.vue";
import routerNames from '../router/names.js'
import {setToastMessage} from "../services/setters.js";

export default {
  name: "ProductDetail",
  components: {
    E404,
    ProductControls,
    AppRating,
    AppLoader
  },
  async asyncData(api, routeParams) {
    const { res, data } = await api.products.rating(routeParams.id);
    const { average, current, count, your } = res
        ? { ...data, current: data.average ?? 0 }
        : { average: 0, current: 0, count: 0, your: null };
    const toFixedAverage = average ? Number.parseInt(average.toFixed(2)) : 0;
    return {
      rating: {
        average: toFixedAverage,
        current,
        count,
        your
      }
    };
  },
  data() {
    return {
      rating: {
        average: 0,
        current: 0,
        count: 0,
        your: null,
      },
      userMark: {
        current: 0,
        last: 0,
        pending: false
      }
    }
  },
  computed: {
    ...mapGetters('products', { productProxy: 'one' }),
    ...mapGetters('user', ['isAuthenticated', 'checkRole']),
    ...mapGetters(['isStoreReady']),
    id() {
      return Number(this.$route.params.id); // @change to slug field
    },
    product() {
      return this.productProxy(this.id);
    },
    hasProduct() {
      return typeof this.product !== "undefined";
    },
    canSetRating() {
      return this.checkRole(['auditor']);
    },
    canSendMark() {
      return !this.userMark.pending && this.userMark.current !== this.userMark.last;
    },
  },
  methods: {
    ...mapActions(['setActiveView', 'fetchingTimeout']),
    async getRating() {
      const { res, data } = await this.$api.products.rating(this.id);
      console.log(data)
      if (res) {
        const { average, count, your } = data;
        this.rating.average = average ? Number.parseInt(average.toFixed(2)) : 0
        this.rating.current = this.rating.average
        this.rating = { ...this.rating, count, your };
        if (your){
          this.userMark.last = your;
          this.userMark.current = your;
        }
      }
    },
    async sendMark() {
      if (!this.canSetRating) { return setToastMessage('У вас недостаточно прав на совершение данного действия') }
      if (this.canSendMark) {
        this.userMark.pending = true;
        const res = await this.$api.products.mark(this.id, this.userMark.current);
        if (res){
          await this.getRating();
          //this.calculateNewRating()
        }
        this.userMark.pending = false;
      }
    },
    onUpdateRating(num) {
      if (num){
        this.rating.current = num
        this.userMark.current = num;
      }
    },
    goToLogin() {
      this.$router.push({name: routerNames.Login, query: {to: this.$route.path}})
      this.setActiveView(routerNames.Login)
    }
    /*calculateNewRating() {
      this.rating.average = Math.max((this.rating.average * this.rating.count + this.userMark.current) / (this.rating.count + 1)).toFixed(2)
    }*/
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  },
  async created() {
    if (this.isStoreReady){ await this.getRating() }
  }
}
</script>

<template>
<div class="app-content">
  <AppAlerts/>
	<div id="store" class="app-store">
    <header id="header" class="app-header" :class="boxFetchingClass">
			<div class="container">
				<div class="head-row">
					<div class="col flex-norm">
						<router-link :to="{name: 'home'}">SSR Store</router-link>
						<div class="w-text">E-commerce cайт на vue 3</div>
					</div>
					<div class="col flex-norm">
						<div>В корзине: {{ cartCount }}</div>
						<div>Итого: {{ cartTotal }}</div>
					</div>
				</div>
				<hr>
				<nav class="navbar navbar-expand p-0">
					<ul class="navbar-nav nav-tabs">
						<li v-for="i in appNav" :key="i.route" class="nav-item">
							<router-link class="nav-link"
                :class="tabClass(i.route)"
								:to="{name: i.route}"
								:exact="i.exact"
							>{{i.title}}</router-link>
						</li>
					</ul>
				</nav>
				<hr>
			</div>
		</header>
		<section id="main" class="app-main">
      <BallsLoader/>
			<div class="container" :class="mainFetchingClass">
				<router-view v-slot="{ Component }">
					<transition name="slide" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</div>
		</section>
		<footer id="footer" class="app-footer" :class="boxFetchingClass">
			<div class="container">
				<hr>
        <router-link :to="{name: 'about'}">О нас</router-link>
				<div>&copy; SSR-Store</div>
			</div>
		</footer>
	</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import AppAlerts from "./components/AppAlerts.vue";
import BallsLoader from "./components/BallsLoader.vue";
import routerNames from "./router/names.js";
import {getActiveView} from "./core/actions.js";

export default {
  components: {
    AppAlerts,
    BallsLoader
  },
  data() {
    return {
      menu: [
        { route: routerNames.Products, title: 'Товары', exact: false },
        { route: routerNames.Cart, title: 'Корзина', exact: true },
        { route: routerNames.Login, title: 'Вход', exact: true },
        { route: routerNames.Profile, title: 'Мой профиль', exact: false },
        { route: routerNames.Office, title: 'Мой офис', exact: false },
      ],
    }
  },
  computed: {
    ...mapGetters('cart', {cartCount: 'totalCnt', cartTotal: 'totalSum'}),
    ...mapGetters('user', ['isAuthenticated']),
    ...mapGetters(['activeView', 'isStoreReady', 'isFetching']),
    appNav() {
      return this.isAuthenticated
          ? [ this.menu[0], this.menu[1], this.menu[3], this.menu[4] ]
          : [ this.menu[0], this.menu[1], this.menu[2] ]
    },
    boxFetchingClass() {
      return this.isStoreReady ? "" : "box-fetching"
    },
    mainFetchingClass() {
      return this.isFetching || !this.isStoreReady ? "box-fetching" : ""
    },
  },
  methods: {
    tabClass(route) {
      return getActiveView(route) === this.activeView ? "w-active" : "w-default"
    },
  }
}
</script>

<style>
.box-fetching {
  opacity: 0;
}
.flex-norm{
  flex: 0 1 auto;
  width: auto;
}
.slide-enter-active{
  animation: slideIn 0.3s;
}
.slide-leave-active{
  animation: slideOut 0.3s;
}
@keyframes slideIn{
  from{transform: rotateY(90deg);}
  to{transform: rotateY(0deg);}
}
@keyframes slideOut{
  from{transform: rotateY(0deg);}
  to{transform: rotateY(90deg);}
}
</style>

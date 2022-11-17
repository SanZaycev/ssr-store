import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../components/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../components/Checkout.vue'
import ProfileBase from '../views/me/Profile.vue'
import ProfileDashboard from "../components/ProfileDashboard.vue";
import ProfileSettings from '../components/ProfileSettings.vue'
import OfficeBase from '../views/me/Office.vue'
import OfficeDashboard from "../components/OfficeDashboard.vue";
import OfficeOrders from '../components/OfficeOrders.vue'
import About from '../views/About.vue'
import E404 from '../views/E404.vue';
import {viewsTitles} from "../core/state.js";
import {dispatchAsyncData} from "../core/async.js";


export default function initRouter(context, api, store) {
  const routes = [
    {
      name: "home",
      path: "/",
      component: Home,
      meta: { isSSR: true }
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      meta: { isSSR: true },
      beforeEnter(to, from, next) {
        context.appMounted && store.getters["user/isAuthenticated"] ? next(to.query.to ?? { name: "profile" }) : next()
      }
    },
    {
      name: "products",
      path: "/products/",
      component: Products,
      meta: { isSSR: false },
      children: [
        {
          name: "product-detail",
          path: ":id/",
          component: ProductDetail,
          meta: { isSSR: true }
        },
      ]
    },
    {
      name: "cart",
      path: "/cart/",
      component: Cart,
      children: [
        {
          name: "checkout",
          path: "checkout/",
          component: Checkout
        },
      ]
    },
    {
      name: "profile-base",
      path: "/me/",
      meta: { isAuth: true },
      component: ProfileBase,
      children: [
        {
          name: "profile",
          path: "",
          meta: { isAuth: true },
          component: ProfileDashboard
        },
        {
          name: "profile-settings",
          path: "settings/",
          meta: { isAuth: true },
          component: ProfileSettings
        },
      ]
    },
    {
      name: "office-base",
      path: "/office/",
      meta: { isAuth: true },
      component: OfficeBase,
      children: [
        {
          name: "office",
          path: "",
          meta: { isAuth: true },
          component: OfficeDashboard
        },
        {
          name: "office-orders",
          path: "orders/",
          meta: { isAuth: true },
          component: OfficeOrders
        }
      ]
    },
    {
      name: "about",
      path: "/about/",
      component: About,
      meta: { isSSR: true }
    },
    {
      name: "error-404",
      path: "/:any(.*)",
      component: E404,
      meta: { is404: true }
    }
  ];

  const router = createRouter({
    history: process.__SERVER__ ? createMemoryHistory() : createWebHistory(process.env.BASE_URL),
    linkActiveClass: "active",
    linkExactActiveClass: "active",
    routes
  })

  router.beforeEach((to, from, next) => {
    context.isSSR = to.matched.some(r => r.meta.isSSR) || typeof to.meta.isSSR !== "undefined"
    context.is404 = to.matched.some(r => r.meta.is404) || typeof to.meta.is404 !== "undefined"

    if (process.__CLIENT__ && to.meta.isAuth && !store.getters["user/isAuthenticated"]) {
      next({name: "login", query: {to: to.path}})
      document.title = viewsTitles.LOGIN
    } else if (!context.appMounted) {
      dispatchAsyncData(context, api, to)
        .then(() => next())
        .catch(err => { console.log("asyncData error => ", err); next() })
    } else {
      next()
    }
  });

  return router
}

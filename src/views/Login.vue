<template>
<div class="auth-container">
  <div v-if="loggedIn" class="view-box">
    <div class="view-title"><h1>Вы авторизованы</h1></div>
    <hr>
    <div class="box">Добро пожаловать {{name}}</div>
    <span class="pr-1"><router-link :to="{name: 'home'}">Главная</router-link></span>
    <span class="pr-1"><router-link :to="{name: 'profile'}">Мой профиль</router-link></span>
  </div>
  <div v-else class="view-box">
    <div class="view-title"><h1>Вход</h1></div>
    <form class="form-row">
      <div class="col-12 col-lg-6">
        <div class="form-group">
          <input class="form-control" type="text" v-model="data.login" placeholder="Логин">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" v-model="data.password" placeholder="Пароль">
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" @click="authenticate">Вход</button>
        </div>
        <div class="form-group" v-if="isErrors">
          <div class="mt-2 mb-0 text-danger" v-for="(e, i) in data.errors" :key="i">{{ e }}</div>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {isObject, isTypeUndefined} from "../services/getters.js";
import {setToastMessage} from "../services/setters.js";

export default {
  name: "Login",
  components: {},
  data(){
    return {
      data: {
        login: '',
        password: '',
        errors: []
      }
    }
  },
  computed: {
    ...mapGetters("user", ["isAuthenticated", "name"]),
    ...mapGetters(['isStoreReady']),
    isErrors() {
      return !!this.data.errors.length;
    },
    loggedIn() {
      return this.isStoreReady && this.isAuthenticated
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    ...mapActions(['setActiveView', 'fetchingTimeout']),
    authenticate(){
      this.login({
        login: this.data.login,
        password: this.data.password
      }).then((data) => {
        if (isObject(data)) {
          if (data.res){
            this.data.login = '';
            this.data.password = '';
            this.data.errors = [];
            !isTypeUndefined(this.$route.query.to)
            ? this.$router.replace(this.$route.query.to.toString())
            : this.$router.replace({ name: "office" })
          }
          else if (Array.isArray(data.errors) && data.errors.length) {
            this.data.errors = [ ...data.errors ];
          }
          else {
            this.data.errors = []
            setToastMessage('Bad response on Login')
          }
        } else {
          this.data.errors = []
          setToastMessage('Ошибка запроса авторизации')
        }
      }).catch(e => setToastMessage(e.message))
    }
  },
  beforeMount() {
    this.fetchingTimeout(200)
    this.setActiveView(this.$route.name)
  }
}
</script>

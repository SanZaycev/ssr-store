<template>
  <div class="view-box">
    <h1>Мой профиль</h1>
    <hr>
    <div class="box">Добро пожаловать {{username}}</div>
    <hr>
    <button type="button" class="btn btn-secondary" @click="userLogout">Выход</button>
    <hr>
    <div class="row">
      <div class="col-12 col-md-3">
        <ul class="list-group">
          <router-link tag="li" class="list-group-item" :to="{name: 'profile'}">
            <span class="nav-text">Мой профиль</span>
          </router-link>
          <router-link tag="li" class="list-group-item" :to="{name: 'profile-settings'}">
            <span class="nav-text">Нстройки профиля</span>
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
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "Profile",
  computed: {
    ...mapGetters('user', {username: 'name'})
  },
  methods: {
    ...mapActions('user', ['logout']),
    async userLogout(){
      const res = await this.logout();
      if (res) {
        this.$router.push({name: 'login', query: {to: this.$route.path}}).then(() => location.reload());
      }
    }
  }
}
</script>

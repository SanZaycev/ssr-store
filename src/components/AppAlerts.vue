<template>
  <div class="app-alerts">
    <transition-group name="item">
      <div class="alert-box" v-for="a in alerts" :key="a.id" :class="a.position">
        <div class="notification" :class="a.type">
          <button class="delete" v-if="a.closable" @click="removeAlert(a.id)">x</button>
          <div class="w-text">{{ a.text }}</div>
          <a href="#" class="w-link" v-if="a.is_critical" @click="location.reload()"><span class="text-link">Перезагрузить страницу</span></a>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: "AppAlerts",
  computed: {
    ...mapGetters('alerts', { alerts: 'all' }),
    location() { return window.location }
  },
  methods: {
    ...mapActions('alerts', { removeAlert: 'remove' })
  },
}
</script>

<style scoped>
.app-alerts {
  display: block;
  width: 100%;
  pointer-events: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  padding: 15px;
}
.alert-box {
  display: flex;
  width: 100%;
  height: min-content;
  flex-wrap: wrap;
  flex-direction: row;
}
.alert-box.top-right {
  text-align: right;
  align-items: flex-start;
  justify-content: flex-end;
}
.alert-box.top-left {
  text-align: left;
  align-items: flex-start;
  justify-content: flex-start;
}
.alert-box.bottom-right {
  text-align: right;
  align-items: flex-end;
  justify-content: flex-end;
}
.alert-box.bottom-left {
  text-align: left;
  align-items: flex-end;
  justify-content: flex-start;
}
.alert-box.top-center {
  text-align: center;
  align-items: flex-start;
  justify-content: center;
}
.alert-box.bottom-center {
  text-align: center;
  align-items: flex-end;
  justify-content: center;
}
.alert-box.center {
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>

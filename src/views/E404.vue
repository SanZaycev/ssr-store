<template>
  <div class="view-box">
    <div class="view-title"><h1>Страница не найдена</h1></div>
    <hr>
    <p>Мы не смогли найти данную страницу. Возможно она просрочена или удалена.</p>
    <span class="pr-1"><router-link :to="{name: 'home'}">Главная</router-link></span>
    <span class="pr-1"><router-link :to="{name: 'products'}">Продукты и товары</router-link></span>
  </div>
</template>

<script>

export default {
  name: "E404"
}
</script>

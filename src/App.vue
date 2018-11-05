<template>
  <div id="app">
    <menu-bar></menu-bar>
    <router-view></router-view>
  </div>
</template>

<script>
const MenuBar = () => import(/* webpackChunkName: 'menu-bar' */ './components/MenuBar')
export default {
    components: {
        MenuBar
    }
}
</script>

<style>

</style>

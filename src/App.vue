<template>
  <div id="app">
    <menu-bar></menu-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar'
export default {
    components: {
        MenuBar
    }
}
</script>

<style>

</style>

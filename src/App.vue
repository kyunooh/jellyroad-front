<template>
  <div id="app">
    <Navigation />
    <router-view :places="placeList"/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'


export default {
  name: 'App',
  data () {
    return {
      placeList: []
    }
  },
  components: {
    Navigation
  }
}
</script>

<style>
</style>

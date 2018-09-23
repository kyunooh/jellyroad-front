<template>
  <nav class="jellyload-nav">
    <a href="/" id="service-name">
      Jellyroad
    </a>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
  nav.jellyload-nav {
    margin: 0;
    height: 80px;
    width: 100%;
    background-color: orange;
    color: white;
    line-height: 80px;
  }

  #service-name {
    margin-left: 15px;
    font-size: 3em;
    text-decoration: none;
    color: white;
  }
</style>

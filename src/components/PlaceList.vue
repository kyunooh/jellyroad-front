<template>
  <div id="place-list-wrapper">
    <Map v-if="places !== null" :places="places"/>
    <ul class="place-list">
      <li class="place-item" v-for="place in places" :key="place.pk">
        <img class="place-image" v-bind:src="place.image" alt="">
        <div class="place-info">
          <div class="place-title"><router-link :to="{ name: 'place-detail', params: { placeId: place.pk }}">{{ place.name }}</router-link></div>
          <div class="place-menu" v-html="place.menu"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Map from './Map'

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://road.jellyms.kr/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  name: 'PlaceList',
  components: {
    Map
  },
  data () {
    return {
      places: null
    }
  },
  methods: {
    getPlaces () {
      const getPlaceUrl = 'places/'
      api.get(getPlaceUrl)
        .then((response) => {
          this.places = response.data
        })
    }
  },
  created () {
    this.getPlaces()
  }
}
</script>

<style scoped>
  #place-list-wrapper {
    width: 95%;
    max-width: 100%;
    margin: 15px auto;
  }

  .place-list {
    display: flex;
    flex-flow: row wrap;
    align-content: stretch;
    justify-content: left;
    padding: 0;
    margin: 15px auto;
  }

  .place-item {
    display: inline-flex;
    margin: 10px auto;
    width: 500px;
    min-width: 300px;
    box-sizing: border-box;
    flex-grow: 1;
  }

  .place-image {
    width: 300px;
    height: 300px;
    min-width: 150px;
    min-height: 60px;
    object-fit: cover;
  }

  .place-info {
    word-break: break-all;
    overflow-wrap: break-word;
    max-width: 600px;
    padding: 5px 0.5em 0.5em;
    min-width: 120px;
  }

  .place-title {
    padding-left: 5px;
    font-size: 1.5em;
  }

  .place-menu {
    margin-top: 5px;
    padding-left: 5px;
    font-size: 1em;
  }

</style>

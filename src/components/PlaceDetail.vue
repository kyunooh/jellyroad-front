<template>
  <div id="place-detail-wrapper">
    <Map v-if="place !== null" v-bind:location="place"/>
    <h1>{{ place.name }}</h1>
    <div v-html="place.menu"></div>
    <ul>
      <li v-for="review in place.jelly_reviews" v-bind:key="review.pk">
        <pre>{{ review.content }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Map from './Map'

const api = axios.create({
  baseURL: 'https://road.jellyms.kr/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  name: 'PlaceDetail',
  props: ['placeId'],
  components: {
    Map
  },
  data () {
    return {
      place: null
    }
  },

  created () {
    api.get(`/places/${this.placeId}/`)
      .then((response) => {
        this.place = response.data
      })
  }
}
</script>

<style scoped>
  #place-detail-wrapper {
    padding: 1em;
  }

ul {
  list-style: none;
}

</style>

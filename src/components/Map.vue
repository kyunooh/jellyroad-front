<template>
  <div id="map-wrapper">
    <div id="map" style="width:100%;height:600px;max-height:50vh"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: ['location', 'places'],
  data () {
    return {
      mainLocation: {longitude: 127, latitude: 37},
      map: {}
    }
  },
  methods: {
    initMap () {
      this.map = new window.naver.maps.Map('map')
    },

    setPlaces () {
      const maps = window.naver.maps

      this.places.forEach((place) => {
        const point = new maps.Point(place.lon, place.lat)
        const marker = new maps.Marker({
          position: point,
          map: this.map
        })

        maps.Event.addListener(marker, 'click', (e) => {
          const infowindow = new maps.InfoWindow({
            content: `<h4>${place.name}</h4><pre>${place.menu}</pre>`
          })
          if (infowindow.getMap()) {
            infowindow.close()
          } else {
            infowindow.open(this.map, marker)
          }
        })
      })
      console.log(this.mainLocation)
      const point = new maps.Point(this.mainLocation.longitude, this.mainLocation.latitude)
      this.map.setCenter(point) // 검색된 좌표로 지도 이동
    },

    setLocation () {
      console.log(this.location)
      this.mainLocation = {
        longitude: this.location.lon,
        latitude: this.location.lat,
        name: this.location.name,
        menu: this.location.menu
      }

      const maps = window.naver.maps
      const point = new maps.Point(this.mainLocation.longitude, this.mainLocation.latitude)
      const marker = new maps.Marker({
        position: point,
        map: this.map
      })

      maps.Event.addListener(marker, 'click', (e) => {
        const infowindow = new maps.InfoWindow({
          content: `<h4>${this.mainLocation.name}</h4><pre>${this.mainLocation.menu}</pre>`
        })
        if (infowindow.getMap()) {
          infowindow.close()
        } else {
          infowindow.open(this.map, marker)
        }
      })
      this.map.setCenter(point) // 검색된 좌표로 지도 이동
    },

    setCurrentPosition () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mainLocation = position.coords
        this.initMap()
        this.setPlaces()
      })
      navigator.permissions.query({name: 'geolocation'}).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition((position) => {
            this.mainLocation = position.coords
          })
        }

        result.addEventListener('change', function () {
          this.setCurrentPosition()
        })
      })
      navigator.geolocation.getCurrentPosition((position) => {
        this.mainLocation = position.coords
      })
    }
  },
  mounted () {
    this.initMap()
    if (this.location && this.location.lon) {
      console.log(this.location)
      this.setLocation()
    } else {
      this.setCurrentPosition()
      this.setPlaces()
    }
  }
}
</script>

<style scoped>

</style>

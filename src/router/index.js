import Vue from 'vue'
import Router from 'vue-router'
import PlaceList from '@/components/PlaceList'
import PlaceDetail from '@/components/PlaceDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: PlaceList
    }, {
      path: '/placeDetail/:placeId',
      name: 'place-detail',
      component: PlaceDetail,
      props: true
    }
  ]
})

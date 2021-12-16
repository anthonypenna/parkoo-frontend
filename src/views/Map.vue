<template>
  <div class="map">
    <ParkooMap ref="map" :accessToken="accessToken" :center="center" :theme="theme" :zoom="zoom" @load="onMapLoad">
      <UserMarker :lat="lat" :lng="lng" />
      <StreetMarker
        v-for="street of streets"
        :key="street._id"
        :lat="street.lat"
        :lng="street.lng"
        :cleanedTomorrow="isStreetCleanedTomorrow(street)" />
    </ParkooMap>
    <NoStreetsModal v-show="showNoStreetsModal" @close="onNoStreetsModalClose" @addstreet="onNoStreetsModalAddStreet" />
    <AddStreetModal v-show="showAddStreetModal" @cancel="onAddStreetModalCancel" @add="onAddStreetModalAdd" />
    <AddButton class="map__add-street-button" @click.native="onAddButtonClick" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ParkooMap, { MapComponent } from '@/components/molecules/Map.vue'
import UserMarker from '@/components/atoms/UserCursor.vue'
import StreetMarker from '@/components/atoms/StreetMarker.vue'
import NoStreetsModal from '@/components/molecules/NoStreetsModal.vue'
import AddStreetModal from '@/components/molecules/AddStreetModal.vue'
import AddButton from '@/components/atoms/AddButton.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { LngLat, Map } from 'mapbox-gl'
import { areEqual } from '@/utils/array'
import { MAPBOX_FLY_SPEED } from '@/constants/mapbox'
import { mapMiddleware } from '@/middleware/map'
import { BannerType } from '@/constants/banner'
import { until } from '@/utils/async'
import { reverseGeocode } from '@/services/geocoding'
import { createStreet } from '@/services/streets'
import { Street } from '@/models/Street'

export default Vue.extend({
  name: 'MapView',
  mixins: [mapMiddleware],

  components: {
    ParkooMap,
    UserMarker,
    StreetMarker,
    NoStreetsModal,
    AddStreetModal,
    AddButton
  },

  computed: {
    ...mapGetters('mapbox', ['accessToken', 'center', 'map', 'theme', 'zoom']),
    ...mapGetters('user', ['lat', 'lng']),
    ...mapGetters('streets', ['streets', 'hasStreets', 'isStreetCleanedTomorrow']),
    ...mapGetters(['showNoStreetsModal', 'showAddStreetModal'])
  },

  data() {
    return {
      streetID: '',
      streetName: ''
    }
  },

  methods: {
    ...mapMutations([
      'setShowLoading',
      'setShowNoStreetsModal',
      'setShowAddStreetModal',
      'setBannerState',
      'setNameOfStreetBeingAdded'
    ]),

    ...mapActions('streets', ['getStreets']),

    onMapLoad() {
      const map = this.map as Map
      const mapCenter = map.getCenter().toArray()
      const userPosition = new LngLat(this.lng, this.lat)

      if (areEqual(mapCenter, userPosition.toArray())) {
        this.onMapReady()
        return
      }

      map.once('moveend', this.onMapReady)
      map.flyTo({ center: userPosition, speed: MAPBOX_FLY_SPEED })
    },

    onMapReady() {
      this.setShowLoading(false)
      if (!this.hasStreets) this.setShowNoStreetsModal(true)
    },

    onNoStreetsModalClose() {
      this.setShowNoStreetsModal(false)
    },

    async onNoStreetsModalAddStreet() {
      const [error, response] = await until(() => reverseGeocode(this.lat, this.lng, this.accessToken))

      if (error) {
        this.setBannerState({
          text: 'Oh oh! An error occured. Please try again later!',
          type: BannerType.Error,
          visible: true
        })
        return
      }

      this.streetID = response?.features[0].id as string
      this.setNameOfStreetBeingAdded(response?.features[0].text)
      this.setShowAddStreetModal(true)
    },

    onAddStreetModalCancel() {
      this.setShowAddStreetModal(false)
    },

    async onAddStreetModalAdd(street: Street) {
      street.id = this.streetID

      const [err, res] = await until(() => createStreet(street))

      if (err || res) {
        this.setBannerState({
          text: 'Oh Oh! An error occurred while adding the street',
          type: BannerType.Error,
          visible: true
        })
        return
      }

      this.setShowAddStreetModal(false)
      this.setShowNoStreetsModal(false)

      this.setBannerState({
        text: `Successfully added ${this.streetName}!`,
        type: BannerType.Success,
        visible: true
      })

      await this.getStreets()

      const map = this.$refs.map as MapComponent
      map.updateMarkers()
    },

    onAddButtonClick() {
      this.onNoStreetsModalAddStreet()
    }
  }
})
</script>

<style lang="scss" scoped>
.map {
  &__add-street-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
  }
}
</style>

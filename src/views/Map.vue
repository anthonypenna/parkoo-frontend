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
    <NoStreetsModal
      v-show="isNoStreetsModalVisible"
      @close="onNoStreetsModalClose"
      @addstreet="onNoStreetsModalAddStreet" />
    <AddStreetModal v-show="isAddStreetModalVisible" @cancel="onAddStreetModalCancel" @add="onAddStreetModalAdd" />
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
import { LngLat, Map } from 'mapbox-gl'
import { areEqual } from '@/utils/array'
import { MAPBOX_FLY_SPEED } from '@/constants/mapbox'
import { mapMiddleware } from '@/middleware/map'
import { until } from '@/utils/async'
import { reverseGeocode } from '@/services/geocoding'
import { createStreet } from '@/services/streets'
import { Street } from '@/models/Street'
import { mapBannerActions } from '@/store/banner/helpers'
import { mapLoadingActions } from '@/store/loading/helpers'
import { mapMapboxGetters } from '@/store/mapbox/helpers'
import { mapModalActions, mapModalGetters, mapModalMutations } from '@/store/modal/helpers'
import { mapStreetCreationGetters, mapStreetCreationMutations } from '@/store/street-creation/helpers'
import { mapStreetsActions, mapStreetsGetters } from '@/store/streets/helpers'
import { mapUserGetters } from '@/store/user/helpers'

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
    ...mapMapboxGetters(['accessToken', 'center', 'map', 'theme', 'zoom']),
    ...mapModalGetters({
      isAddStreetModalVisible: 'showAddStreetModal',
      isNoStreetsModalVisible: 'showNoStreetsModal'
    }),
    ...mapStreetCreationGetters(['streetID', 'streetName']),
    ...mapStreetsGetters(['streets', 'hasStreets', 'isStreetCleanedTomorrow']),
    ...mapUserGetters(['lat', 'lng'])
  },

  methods: {
    ...mapBannerActions(['showErrorBanner', 'showSuccessBanner']),
    ...mapLoadingActions(['stopLoading']),
    ...mapModalActions(['showAddStreetModal', 'showNoStreetsModal']),
    ...mapStreetsActions(['getStreets']),
    ...mapModalMutations(['setShowAddStreetModal', 'setShowNoStreetsModal']),
    ...mapStreetCreationMutations(['setStreetID', 'setStreetName']),

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
      this.stopLoading()
      if (!this.hasStreets) this.showNoStreetsModal()
    },

    onNoStreetsModalClose() {
      this.setShowNoStreetsModal(false)
    },

    async onNoStreetsModalAddStreet() {
      const { accessToken, lat, lng } = this
      const [error, response] = await until(() => reverseGeocode(lat, lng, accessToken))

      if (error || !response) {
        this.showErrorBanner('Oh oh! An error occured. Please try again later!')
        return
      }

      const { id, text } = response.features[0]
      this.setStreetID(id)
      this.setStreetName(text)
      this.showAddStreetModal()
    },

    onAddStreetModalCancel() {
      this.setShowAddStreetModal(false)
    },

    async onAddStreetModalAdd(street: Street) {
      const [streetCreationError, streetCreationResponse] = await until(() => createStreet(street))

      if (streetCreationError || (streetCreationResponse && 'message' in streetCreationResponse)) {
        this.showErrorBanner('Oh Oh! An error occurred while adding the street')
        return
      }

      this.setShowAddStreetModal(false)
      this.setShowNoStreetsModal(false)
      this.showSuccessBanner(`Successfully added ${this.streetName}!`)

      const [streetsFetchingError] = await until(this.getStreets)

      if (streetsFetchingError) {
        this.showErrorBanner('Oh Oh! An error occurred while fetching streets')
        return
      }

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

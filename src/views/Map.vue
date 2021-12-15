<template>
  <div class="map">
    <ParkooMap
      :accessToken="accessToken"
      :center="center"
      :theme="theme"
      :zoom="zoom"
      @load="onMapLoad"
    >
      <UserMarker :lat="lat" :lng="lng" />
      <StreetMarker
        v-for="street of streets"
        :key="street._id"
        :lat="street.lat"
        :lng="street.lng"
        :cleanedTomorrow="isStreetCleanedTomorrow(street)"
      />
    </ParkooMap>
    <NoStreetsModal
      v-show="showNoStreetsModal"
      @close="onNoStreetsModalClose"
      @addstreet="onNoStreetsModalAddStreet"
    />
    <AddStreetModal
      v-show="showAddStreetModal"
      @cancel="onAddStreetModalCancel"
      @add="onAddStreetModalAdd"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ParkooMap from "@/components/molecules/Map.vue";
import UserMarker from "@/components/atoms/UserCursor.vue";
import StreetMarker from "@/components/atoms/StreetMarker.vue";
import NoStreetsModal from "@/components/molecules/NoStreetsModal.vue";
import AddStreetModal from "@/components/molecules/AddStreetModal.vue";
import { mapGetters, mapMutations } from "vuex";
import { LngLat, Map } from "mapbox-gl";
import { areEqual } from "@/utils/array";
import { MAPBOX_FLY_SPEED } from "@/constants/mapbox";
import { mapMiddleware } from "@/middleware/map";

export default Vue.extend({
  name: "MapView",
  mixins: [mapMiddleware],

  components: {
    ParkooMap,
    UserMarker,
    StreetMarker,
    NoStreetsModal,
    AddStreetModal,
  },

  computed: {
    ...mapGetters("mapbox", ["accessToken", "center", "map", "theme", "zoom"]),
    ...mapGetters("user", ["lat", "lng"]),
    ...mapGetters("streets", [
      "streets",
      "hasStreets",
      "isStreetCleanedTomorrow",
    ]),
    ...mapGetters(["showNoStreetsModal", "showAddStreetModal"]),
  },

  methods: {
    ...mapMutations([
      "setShowLoading",
      "setShowNoStreetsModal",
      "setShowAddStreetModal",
    ]),

    onMapLoad() {
      const map = this.map as Map;
      const mapCenter = map.getCenter().toArray();
      const userPosition = new LngLat(this.lng, this.lat);

      if (areEqual(mapCenter, userPosition.toArray())) {
        this.onMapReady();
        return;
      }

      map.once("moveend", this.onMapReady);
      map.flyTo({ center: userPosition, speed: MAPBOX_FLY_SPEED });
    },

    onMapReady() {
      this.setShowLoading(false);
      if (!this.hasStreets) this.setShowNoStreetsModal(true);
    },

    onNoStreetsModalClose() {
      this.setShowNoStreetsModal(false);
    },

    onNoStreetsModalAddStreet() {
      this.setShowAddStreetModal(true);
    },

    onAddStreetModalCancel() {
      this.setShowAddStreetModal(false);
    },

    onAddStreetModalAdd() {
      alert("Todo!");
    },
  },
});
</script>

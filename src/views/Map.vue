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
import { BannerType } from "@/constants/banner";
import { until } from "@/utils/async";
import { reverseGeocode } from "@/services/geocoding";
import { createStreet } from "@/services/streets";
import { Street } from "@/models/Street";

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

  data() {
    return {
      streetID: "",
      streetName: "",
    };
  },

  methods: {
    ...mapMutations([
      "setShowLoading",
      "setShowNoStreetsModal",
      "setShowAddStreetModal",
      "setBannerState",
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

    async onNoStreetsModalAddStreet() {
      const [error, response] = await until(() =>
        reverseGeocode(this.lat, this.lng, this.accessToken)
      );

      if (error) {
        this.setBannerState({
          text: "Oh oh! An error occured. Please try again later!",
          type: BannerType.Error,
          visible: true,
        });
        return;
      }

      this.streetID = response?.features[0].id as string;
      this.streetName = response?.features[0].text as string;
      this.setShowAddStreetModal(true);
    },

    onAddStreetModalCancel() {
      this.setShowAddStreetModal(false);
    },

    async onAddStreetModalAdd(street: Street) {
      street.id = this.streetID;

      const [err] = await until(() => createStreet(street));

      if (err) {
        this.setBannerState({
          text: "Oh Oh! An error occurred while adding the street",
          type: BannerType.Error,
          visible: true,
        });
        return;
      }

      this.setBannerState({
        text: `Successfully added ${this.streetName}!`,
        type: BannerType.Success,
        visible: true,
      });
    },
  },
});
</script>

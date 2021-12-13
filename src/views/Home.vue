<template>
  <div class="home">
    <Loading v-if="isLoading" />
    <Map
      v-if="isMapReadyToLoad"
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
    </Map>
    <GeolocationErrorModal v-if="isGeolocationError" />
    <StreetsFetchingErrorModal v-if="isStreetsFetchingError" />
    <NoStreetsModal
      v-if="showNoStreetsModal"
      @close="onNoStreetsModalClose"
      @addstreet="onAddStreet"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Loading from "@/components/molecules/Loading.vue";
import { mapActions, mapGetters } from "vuex";
import { until } from "@/utils/async";
import { LngLat, Map } from "mapbox-gl";
import { areEqual } from "@/utils/array";
import { MAPBOX_FLY_SPEED } from "@/constants/mapbox";
import { isStreetCleanedTomorrow } from "@/utils/street";

export default Vue.extend({
  name: "Home",

  components: {
    Loading,

    GeolocationErrorModal: () =>
      import("@/components/molecules/GeolocationErrorModal.vue"),

    StreetsFetchingErrorModal: () =>
      import("@/components/molecules/StreetsFetchingErrorModal.vue"),

    NoStreetsModal: () => import("@/components/molecules/NoStreetsModal.vue"),

    Map: () => import("@/components/molecules/Map.vue"),

    UserMarker: () => import("@/components/atoms/UserCursor.vue"),

    StreetMarker: () => import("@/components/atoms/StreetMarker.vue"),
  },

  data() {
    return {
      isGeolocationError: false,
      isStreetsFetchingError: false,
      isMapReadyToLoad: false,
      isLoading: true,
      showNoStreetsModal: false,
    };
  },

  computed: {
    ...mapGetters("mapbox", ["accessToken", "center", "map", "theme", "zoom"]),
    ...mapGetters("user", ["lat", "lng"]),
    ...mapGetters("streets", ["streets", "hasStreets"]),
  },

  methods: {
    ...mapActions("user", ["getPosition"]),
    ...mapActions("streets", ["getStreets"]),

    isStreetCleanedTomorrow,

    async initialize() {
      const [geolocationError] = await until(this.getPosition);

      if (geolocationError) {
        this.isGeolocationError = true;
        return;
      }

      const [streetsFetchingError] = await until(this.getStreets);

      if (streetsFetchingError) {
        this.isStreetsFetchingError = true;
        return;
      }

      this.isMapReadyToLoad = true;
    },

    onMapLoad() {
      const map = this.map as Map;
      const mapCenter = map.getCenter().toArray();
      const userPosition = new LngLat(this.lng, this.lat);

      if (areEqual(mapCenter, userPosition.toArray())) return this.onMapReady();

      map.once("moveend", this.onMapReady);
      map.flyTo({ center: userPosition, speed: MAPBOX_FLY_SPEED });
    },

    onMapReady() {
      this.isLoading = false;

      if (!this.hasStreets) {
        this.showNoStreetsModal = true;
      }
    },

    onNoStreetsModalClose() {
      this.showNoStreetsModal = false;
    },

    onAddStreet() {
      alert("Todo!");
    },
  },

  mounted() {
    this.initialize();
  },
});
</script>

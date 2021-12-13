<template>
  <div class="home">
    <Overlay v-if="isLoading">
      <Loader />
    </Overlay>
    <Map
      :accessToken="accessToken"
      :center="center"
      :theme="theme"
      :zoom="zoom"
      @load="handleMapLoad"
    >
      <UserCursor :lat="lat" :lng="lng" />
      <StreetMarker
        v-for="street of streets"
        :key="street.id"
        :cleanedTomorrow="isCleanedTomorrow(street)"
        :lat="street.lat"
        :lng="street.lng"
      />
    </Map>
    <StreetsFetchingErrorModal
      v-if="showStreetsFetchingErrorModal"
      @tryagain="onStreetsFetchingTryAgain"
    />
    <GeolocationErrorModal
      v-if="showGeolocationErrorModal"
      @tryagain="onGeolocationTryAgain"
    />
  </div>
</template>

<script lang="ts">
import { until } from "@/utils/async";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import * as Mapbox from "mapbox-gl";
import { Street } from "@/models/Street";

export default Vue.extend({
  name: "Home",

  components: {
    Loader: () => import("@/components/atoms/Loader.vue"),
    Overlay: () => import("@/components/atoms/Overlay.vue"),
    StreetMarker: () => import("@/components/atoms/StreetMarker.vue"),
    UserCursor: () => import("@/components/atoms/UserCursor.vue"),
    Map: () => import("@/components/molecules/Map.vue"),
    StreetsFetchingErrorModal: () =>
      import("@/components/molecules/StreetsFetchingErrorModal.vue"),
    GeolocationErrorModal: () =>
      import("@/components/molecules/GeolocationErrorModal.vue"),
  },

  data() {
    return {
      isLoading: true,
      showGeolocationErrorModal: false,
      showStreetsFetchingErrorModal: false,
    };
  },

  methods: {
    ...mapActions("user", ["getPosition"]),
    ...mapActions("streets", ["getStreets"]),

    async handleStreetsFetching() {
      const [error] = await until(this.getStreets);
      if (error) this.handleStreetsFetchingError();
    },

    handleStreetsFetchingError() {
      this.showStreetsFetchingErrorModal = true;
    },

    onStreetsFetchingTryAgain() {
      this.showStreetsFetchingErrorModal = false;
      this.handleStreetsFetching();
    },

    async handleGeolocation() {
      const [error] = await until(this.getPosition);
      if (error) this.handleGeolocationError();
    },

    handleGeolocationError() {
      this.showGeolocationErrorModal = true;
    },

    onGeolocationTryAgain() {
      this.showGeolocationErrorModal = false;
      this.handleGeolocation();
    },

    stopLoading() {
      this.isLoading = false;
    },

    handleMapLoad() {
      if (this.isError) return;
      this.goToCoordinates(this.lat, this.lng);
    },

    goToCoordinates(lat: number, lng: number) {
      const map = this.map as Mapbox.Map;
      const center = [lng, lat] as Mapbox.LngLatLike;
      map.flyTo({ center, speed: 2 });
    },

    isCleanedTomorrow(street: Street) {
      return !!street.cleaningDays[this.currentDay + 1];
    },
  },

  computed: {
    ...mapGetters("mapbox", ["map", "accessToken", "center", "theme", "zoom"]),
    ...mapGetters("user", ["lat", "lng"]),
    ...mapGetters("streets", ["streets"]),
    ...mapGetters("date", ["currentDay"]),

    isError(): boolean {
      return (
        this.showGeolocationErrorModal || this.showStreetsFetchingErrorModal
      );
    },
  },

  async mounted() {
    await Promise.all([this.handleStreetsFetching(), this.handleGeolocation()]);
    if (!this.isError) this.stopLoading();
  },
});
</script>


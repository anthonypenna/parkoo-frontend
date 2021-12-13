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
    <NoStreetsModal
      v-if="showNoStreetsModal"
      @close="onCloseNoStreetsModal"
      @addstreet="onAddStreet"
    />
  </div>
</template>

<script lang="ts">
import { until } from "@/utils/async";
import Vue from "vue";
import Loader from "@/components/atoms/Loader.vue";
import Overlay from "@/components/atoms/Overlay.vue";
import { mapActions, mapGetters } from "vuex";
import * as Mapbox from "mapbox-gl";
import { Street } from "@/models/Street";

export default Vue.extend({
  name: "Home",

  components: {
    Loader,
    Overlay,

    StreetMarker: () => {
      return import("@/components/atoms/StreetMarker.vue");
    },

    UserCursor: () => {
      return import("@/components/atoms/UserCursor.vue");
    },

    Map: () => {
      return import("@/components/molecules/Map.vue");
    },

    StreetsFetchingErrorModal: () => {
      return import("@/components/molecules/StreetsFetchingErrorModal.vue");
    },

    GeolocationErrorModal: () => {
      return import("@/components/molecules/GeolocationErrorModal.vue");
    },

    NoStreetsModal: () => {
      return import("@/components/molecules/NoStreetsModal.vue");
    },
  },

  data() {
    return {
      isLoading: true,
      showGeolocationErrorModal: false,
      showStreetsFetchingErrorModal: false,
      showNoStreetsModal: false,
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

    onCloseNoStreetsModal() {
      this.showNoStreetsModal = false;
    },

    onAddStreet() {
      //
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

    isReady(): boolean {
      return !this.isLoading && !this.isError;
    },

    hasStreets(): boolean {
      return this.streets.length > 1;
    },
  },

  async mounted() {
    await this.handleGeolocation();
    await this.handleStreetsFetching();
    if (!this.isError) this.stopLoading();
    if (this.isReady && !this.hasStreets) this.showNoStreetsModal = true;
  },
});
</script>


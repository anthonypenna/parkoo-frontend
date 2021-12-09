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
      @moveend="handleMapMoveEnd"
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

    handleGeolocationError() {
      this.showGeolocationErrorModal = true;
    },

    async handleGeolocation() {
      const [error] = await until(this.getPosition);
      if (error) this.handleGeolocationError();
    },

    handleStreetsFetchingError() {
      this.showStreetsFetchingErrorModal = true;
    },

    async handleStreetsFetching() {
      const [error] = await until(this.getStreets);
      if (error) this.handleStreetsFetchingError();
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

    handleMapMoveEnd() {
      // this.stopLoading();
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
    await Promise.all([this.handleGeolocation(), this.handleStreetsFetching()]);
    this.stopLoading();
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active {
  opacity: 0;
}

.fade-leave-active {
  opacity: 0;
}
</style>

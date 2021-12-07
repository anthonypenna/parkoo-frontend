<template>
  <div class="home">
    <Map
      :accessToken="accessToken"
      :center="center"
      :theme="theme"
      :zoom="zoom"
    >
      <UserCursor :lat="lat" :lng="lng" />
    </Map>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Map from "@/components/molecules/Map.vue";
import UserCursor from "@/components/atoms/UserCursor.vue";
import { mapActions, mapGetters } from "vuex";
import { until } from "@/utils/async";

export default Vue.extend({
  name: "Home",
  components: { Map, UserCursor },

  computed: {
    ...mapGetters("mapbox", ["accessToken", "center", "theme", "zoom", "map"]),
    ...mapGetters("user", ["lat", "lng"]),
  },

  methods: {
    ...mapActions("user", ["getPosition"]),
    ...mapActions("mapbox", ["goToCoordinates"]),

    handleGeolocationError(error: GeolocationPositionError): void {
      switch (error.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
        case GeolocationPositionError.TIMEOUT:
          return alert("We need permission to use your location :(");
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          return alert("Seems like your position is currently unavailable :(");
      }
    },
  },

  async mounted() {
    const [error] = await until(this.getPosition);

    if (error) {
      this.handleGeolocationError(error as GeolocationPositionError);
      return;
    }

    const { lat, lng } = this;
    this.goToCoordinates({ lat, lng });
  },
});
</script>


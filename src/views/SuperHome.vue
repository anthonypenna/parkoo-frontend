<script lang="ts">
import { until } from "@/utils/async";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import * as Mapbox from "mapbox-gl";

export default Vue.extend({
  name: "Home",

  data() {
    return {
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

    goToCoordinates(lat: number, lng: number) {
      const map = this.map as Mapbox.Map;
      const center = [lat, lng] as Mapbox.LngLatLike;
      map.flyTo({ center });
    },
  },

  computed: {
    ...mapGetters("mapbox", ["map"]),
    ...mapGetters("user", ["lat", "lng"]),

    isError(): boolean {
      return (
        this.showGeolocationErrorModal || this.showStreetsFetchingErrorModal
      );
    },
  },

  async mounted() {
    await Promise.all([this.handleGeolocation(), this.handleStreetsFetching()]);
    if (this.isError) return;
    this.goToCoordinates(this.lat, this.lng);
  },
});
</script>

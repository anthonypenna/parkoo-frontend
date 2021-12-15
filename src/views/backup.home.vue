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
    <AddButton v-show="showAddStreetButton" class="home__add-street-button" />
    <GeolocationErrorModal v-show="isGeolocationError" />
    <StreetsFetchingErrorModal v-show="isStreetsFetchingError" />
    <NoStreetsModal
      v-show="showNoStreetsModal"
      @close="onNoStreetsModalClose"
      @addstreet="onAddStreet"
    />
    <AddStreetModal
      v-show="showAddStreetModal"
      @cancel="onAddStreetModalCancel"
      @add="onAddStreetModalAdd"
    >
      <template #street-name>{{ nameOfStreetBeingAdded }}</template>
    </AddStreetModal>
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
import { Street } from "@/models/Street";
import { createStreet } from "@/services/streets";

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

    AddStreetModal: () => import("@/components/molecules/AddStreetModal.vue"),

    AddButton: () => import("@/components/atoms/AddButton.vue"),
  },

  data() {
    return {
      isGeolocationError: false,
      isStreetsFetchingError: false,
      isMapReadyToLoad: false,
      isLoading: true,
      showNoStreetsModal: false,
      showAddStreetModal: false,
      showAddStreetButton: false,
      idOfStreetBeingAdded: "",
      nameOfStreetBeingAdded: "",
    };
  },

  computed: {
    ...mapGetters("mapbox", ["accessToken", "center", "map", "theme", "zoom"]),
    ...mapGetters("user", ["lat", "lng"]),
    ...mapGetters("streets", ["streets", "hasStreets"]),
  },

  methods: {
    ...mapActions("user", ["getPosition"]),
    ...mapActions("streets", ["getStreets", "createStreet"]),
    ...mapActions("mapbox", ["getStreetNameFromCoordinates"]),

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
      this.showAddStreetButton = true;
    },

    async onAddStreet() {
      const [error, response] = await until(() =>
        this.getStreetNameFromCoordinates(this)
      );

      if (error) {
        this.isStreetsFetchingError = true;
        this.showNoStreetsModal = false;
        return;
      }

      this.idOfStreetBeingAdded = response.id;
      this.nameOfStreetBeingAdded = response.text;
      this.showNoStreetsModal = false;
      this.showAddStreetModal = true;
    },

    onAddStreetModalCancel() {
      this.showAddStreetModal = false;
    },

    async onAddStreetModalAdd(street: Street) {
      street.id = this.idOfStreetBeingAdded;

      const [error, response] = await until(() => createStreet(street));

      if (error) {
        console.error(error);
        return;
      }

      console.log(response);
    },
  },

  mounted() {
    this.initialize();
  },
});
</script>

<style lang="scss" scoped>
.home {
  &__add-street-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
  }
}
</style>

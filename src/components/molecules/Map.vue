<template>
  <div :id="id" style="width: 100%; height: 100vh">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserCursor } from "@/components/atoms/UserCursor.vue";
import { mapGetters } from "vuex";
import * as Mapbox from "mapbox-gl";
import { MAPBOX_CENTER, MAPBOX_THEME, MAPBOX_ZOOM } from "@/constants/mapbox";

export default Vue.extend({
  name: "Map",

  props: {
    id: {
      default: "map",
      type: String,
    },

    accessToken: {
      default: "",
      type: String,
    },

    center: {
      default: () => MAPBOX_CENTER,
      type: Array,
    },

    theme: {
      default: MAPBOX_THEME,
      type: String,
    },

    zoom: {
      default: MAPBOX_ZOOM,
      type: Number,
    },
  },

  computed: {
    ...mapGetters("mapbox", ["map"]),

    cursor(): UserCursor | undefined {
      return this.$children.find(
        (child): child is UserCursor => child.$options.name === "UserCursor"
      );
    },
  },

  methods: {
    renderCursor() {
      const { $el, lat, lng } = this.cursor as UserCursor;
      const element = $el as HTMLElement;
      new Mapbox.Marker({ element }).setLngLat([lng, lat]).addTo(this.map);
    },
  },

  mounted() {
    const map = new Mapbox.Map({
      container: this.id,
      accessToken: this.accessToken,
      center: this.center as Mapbox.LngLatLike,
      style: this.theme,
      zoom: this.zoom,
    });

    this.$store.commit("mapbox/setMap", map);

    this.map.on("load", () => {
      if (this.cursor) this.renderCursor();
    });
  },
});
</script>

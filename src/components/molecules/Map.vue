<template>
  <div :id="id" style="width: 100%; height: 100vh">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { MAPBOX_CENTER, MAPBOX_THEME, MAPBOX_ZOOM } from '@/constants/mapbox'
import { MapChild } from '@/models/MapChild'
import * as Mapbox from 'mapbox-gl'

const Map = Vue.extend({
  name: 'Map',

  props: {
    id: {
      default: 'map',
      type: String
    },
    accessToken: {
      default: '',
      type: String
    },
    center: {
      default: () => MAPBOX_CENTER,
      type: Array
    },
    theme: {
      default: MAPBOX_THEME,
      type: String
    },
    zoom: {
      default: MAPBOX_ZOOM,
      type: Number
    }
  },

  computed: { ...mapGetters('mapbox', ['map']) },

  methods: {
    ...mapMutations('mapbox', ['setMap']),

    renderChildComponent<A extends MapChild>(childComponent: A | undefined) {
      if (childComponent) {
        const { $el, lat, lng } = childComponent
        const element = $el as HTMLElement
        new Mapbox.Marker({ element }).setLngLat([lng, lat]).addTo(this.map)
      }
    },

    updateMarkers() {
      this.$children.forEach(child => this.renderChildComponent(child as MapChild))
    },

    onMapLoad() {
      this.updateMarkers()
      this.$emit('load')
    }
  },

  mounted() {
    const map = new Mapbox.Map({
      container: this.id,
      accessToken: this.accessToken,
      center: this.center as Mapbox.LngLatLike,
      style: this.theme,
      zoom: this.zoom
    })

    this.setMap(map)
    map.on('load', this.onMapLoad)
  }
})

export type MapComponent = Vue & { updateMarkers(): void }

export default Map
</script>

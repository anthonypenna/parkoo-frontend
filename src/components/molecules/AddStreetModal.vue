<template>
  <PromptModal @close="onCancel" @confirm="onAdd">
    <h2>Add new street</h2>
    <p>
      <slot name="street-name" />
    </p>
    <h3 class="add-street-modal__subsection">Cleaning days</h3>
    <div class="add-street-modal__cleaning-days">
      <div
        v-for="(day, index) of cleaningDays"
        :key="day.id"
        class="add-street-modal__cleaning-day"
      >
        <Checkbox
          :name="day.id.toString()"
          v-model="cleaningDays[index].cleaned"
        >
          <template #label>{{ day.label }}</template>
        </Checkbox>
      </div>
    </div>
    <template #close>Cancel</template>
    <template #confirm>Add</template>
  </PromptModal>
</template>

<script lang="ts">
import Vue from "vue";
import PromptModal from "@/components/molecules/PromptModal.vue";
import Checkbox from "@/components/atoms/Checkbox.vue";
import { Day } from "@/constants/date";
import { Street } from "@/models/Street";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "AddStreetModal",
  components: { PromptModal, Checkbox },
  data() {
    return {
      cleaningDays: [
        { id: Day.Monday, label: Day[Day.Monday], cleaned: false },
        { id: Day.Tuesday, label: Day[Day.Tuesday], cleaned: false },
        { id: Day.Wednesday, label: Day[Day.Wednesday], cleaned: false },
        { id: Day.Thursday, label: Day[Day.Thursday], cleaned: false },
        { id: Day.Friday, label: Day[Day.Friday], cleaned: false },
        { id: Day.Saturday, label: Day[Day.Saturday], cleaned: false },
        { id: Day.Sunday, label: Day[Day.Sunday], cleaned: false },
      ],
    };
  },
  computed: {
    ...mapGetters("user", ["lat", "lng"]),
  },
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onAdd() {
      const street: Street = {
        id: "",
        lat: this.lat,
        lng: this.lng,
        cleaningDays: this.cleaningDays.reduce<Record<number, boolean>>(
          (days, day) => {
            days[day.id] = day.cleaned;
            return days;
          },
          {}
        ),
      };

      this.$emit("add", street);
    },
  },
});
</script>

<style lang="scss" scoped>
.add-street-modal {
  &__subsection {
    text-align: start;
  }

  &__cleaning-days {
    display: flex;
    flex-flow: column wrap;
    height: 150px;
  }

  &__cleaning-day {
    width: 50%;
  }
}
</style>

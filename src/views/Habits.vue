<template>
    <div>
  <AddButton></AddButton>
  <TestButton label="Open Habit Modal" :onClick="openHabitModal" />
  
  <HabitModal :isOpen="showHabitModal" @close="showHabitModal = false">
  </HabitModal>

  <TestButton label="Open Generic Modal" :onClick="openGenericModal" />
  
  <GenericModal :isOpen="showGenericModal" @close="showGenericModal = false">
    <h2>Generic Modal Content</h2>
    <p>This is a test modal.</p>
  </GenericModal>

</div>
</template>

<script>
import Habit from "@/components/HabitComponents/Habit.vue";
import AddButton from "@/components/HabitComponents/AddButton.vue";
import TestButton from "@/components/GeneralComponents/TestButton.vue";
import GenericModal from "@/components/GeneralComponents/GenericModal.vue";
import HabitModal from "@/components/HabitComponents/HabitModal.vue";

export default {
  name: "HabitsPage",
  components: {
    Habit,
    AddButton,
    TestButton,
    GenericModal,
    HabitModal,
  },
  data() {
    return {
      showGenericModal: false,
      showHabitModal: false,
    };
  },
  methods: {
    openHabitModal() {
      console.log("Opening Habit Modal...");
      this.showHabitModal = true;
    },
    openGenericModal() {
      console.log("Opening Generic Modal...");
      this.showGenericModal = true;
    },
  },
};
</script>

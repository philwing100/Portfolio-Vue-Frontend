<template>
    <GenericModal :isOpen="isOpen" @close="$emit('close')">
        <template v-slot:header>
            <h2>Habit Modal</h2>
        </template>

        <template v-slot:body>
            <BooleanSlider v-model="DailyBool" label="Daily" />
            <DaysOfTheWeek v-if="!DailyBool" v-model="selectedDays" />
            <p>Selected Days (Bitmask): {{ selectedDays }}</p>
            <p>Track your habits here!</p>
            <TextField v-model="inputText" label="Description" :maxLength="20" />
            <p>Entered: {{ inputText }}</p>

            <slot></slot> <!-- Allow additional content from parent -->
        </template>

        <template v-slot:footer>
            <button @click="saveHabit">Save Habit</button>
        </template>
    </GenericModal>
</template>

<script>
import GenericModal from "@/components/GeneralComponents/GenericModal.vue";
import BooleanSlider from "../ListItems/BooleanSlider.vue";
import DaysOfTheWeek from "../GeneralComponents/DaysOfTheWeek.vue";
import TextField from "../GeneralComponents/TextField.vue";

export default {
    components: {
        GenericModal,
        BooleanSlider,
        DaysOfTheWeek,
        TextField
    },
    data() {
        return {
            selectedDays: 0,
            DailyBool: false,
            inputText: "bruh",
        }
    },
    props: {
        isOpen: Boolean, // Control visibility from parent
    },
    methods: {
        saveHabit() {
            console.log("Saving habit...");
            this.$emit("close");
        },
        loadHabit() {

        }
    },
};
</script>
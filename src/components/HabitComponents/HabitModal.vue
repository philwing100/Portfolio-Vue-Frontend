<template>
    <GenericModal :isOpen="isOpen" @close="$emit('close')">
        <template v-slot:header>
        </template>

        <template v-slot:body>
            <TextField v-model="inputTitle" label="Title" :maxLength="200" />
            <TextField v-model="inputText" label="Notes" :maxLength="200" />
            <BooleanSlider v-model="DailyBool" label="Daily Habit?" />

            <DaysOfTheWeek v-if="!DailyBool" v-model="selectedDays" />

            <!-- Tags Dropdown -->
            <label>Tags:</label>
            <Dropdown :options="availableTags" v-model="selectedTag" />

            <div class="type-toggle">
                <button class="toggle-circle" :class="{ active: habit.type === 1 }" @click="habit.type = 1">
                    +
                </button>
                <button class="toggle-circle" :class="{ active: habit.type === 0 }" @click="habit.type = 0">
                    –
                </button>
            </div>


            <!-- Streak Display -->
            <div class="streak-display">
                <p>Current Streak: {{ currentStreak }}</p>
                <p>Highest Streak: {{ highestStreak }}</p>
            </div>

            <slot></slot>
        </template>

        <template v-slot:footer>
            <button @click="saveHabit">Save Habit</button>
            <button @click="$emit('close')">Cancel</button>
        </template>
    </GenericModal>
</template>


<script>
import GenericModal from "@/components/GeneralComponents/GenericModal.vue";
import BooleanSlider from "../ListItems/BooleanSlider.vue";
import DaysOfTheWeek from "../GeneralComponents/DaysOfTheWeek.vue";
import TextField from "../GeneralComponents/TextField.vue";
import Dropdown from "../GeneralComponents/Dropdown.vue"; // Assuming your dropdown

export default {
    components: {
        GenericModal,
        BooleanSlider,
        DaysOfTheWeek,
        TextField,
        Dropdown,
    },
    props: {
        isOpen: Boolean,
        habit: Object, // passed from parent (editable habit)
    },

    data() {
        return {
            inputTitle: "",
            inputText: "",
            DailyBool: false,
            selectedDays: 0,
            availableTags: ["Health", "Productivity", "Mindset", "Fitness"],
            selectedTag: "",
            habitType: "positive", // or "negative"
            currentStreak: 0,
            highestStreak: 0,
        };
    },
    methods: {
        saveHabit() {
            console.log("Saving habit:", {
                title: this.inputTitle,
                notes: this.inputText,
                daily: this.DailyBool,
                days: this.selectedDays,
                tag: this.selectedTag,
                type: this.habitType,
            });
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
.toggle-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: black;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.toggle-circle.active {
    background-color: #007bff;
    /* blue */
}
</style>

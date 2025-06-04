//HabitModal.vue
<template>
    <GenericModal :isOpen="isOpen" @close="$emit('close')">
        <template v-slot:header>
        </template>

        <template v-slot:body>
            <TextField v-model="editableHabit.title" label="Title" />
            <TextField v-model="editableHabit.notes" label="Notes" />
            <BooleanSlider v-model="editableHabit.daily" label="Daily Habit?" />
            <DaysOfTheWeek v-if="!editableHabit.daily" v-model="editableHabit.days" />

            <!-- Tags Dropdown -->
            <label>Tags:</label>
            <Dropdown :options="availableTags" v-model="editableHabit.tag" />

            <div class="type-toggle">
                <button :class="{ active: editableHabit.type === 1 }" @click="editableHabit.type = 1">+</button>
                <button :class="{ active: editableHabit.type === 0 }" @click="editableHabit.type = 0">–</button>
            </div>


            <!-- Streak Display -->
            <div class="streak-display">
                <p>Current Streak: {{ editableHabit.currentStreak }}</p>
                <p>Highest Streak: {{ editableHabit.highestStreak }}</p>
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
        habit: Object,
    },
    data() {
        return {
            editableHabit: {}, // local copy of habit
            availableTags: ["Health", "Productivity", "Mindset", "Fitness", "Other", "Daily"],
        };
    },
    watch: {
        habit: {
            handler(newVal) {
                this.editableHabit = JSON.parse(JSON.stringify(newVal));
            },
            immediate: true,
            deep: true,
        },
        'editableHabit.daily'(newVal) {
            if (newVal) {
                this.editableHabit.days = 0b1111111;
            }
        }
    },

    methods: {
        saveHabit() {
            this.$emit("update", this.editableHabit); // emit updated habit to parent
            this.$emit("close");
        }
    }
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

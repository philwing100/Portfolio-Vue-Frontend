//HabitModal.vue
<template class="all">
    <GenericModal :isOpen="isOpen" @close="$emit('close')">
        <template v-slot:header>
            Create Habit
        </template>

        <template v-slot:body>
            <TextField v-model="editableHabit.title" label="Title" />
            <TextField v-model="editableHabit.notes" label="Notes" />
            <label class="section-label">Complete every day or only some days?</label>
            <div class="side-by-side">
                <BooleanSlider v-model="editableHabit.daily" label="" />
                <div :class="{ 'disabled-days': editableHabit.daily }">
                    <DaysOfTheWeek v-model="editableHabit.days" :disabled="editableHabit.daily" />
                </div>
            </div>

            <!-- Tags Dropdown -->
            <div class="side-by-side">
                <IntInput v-model="editableHabit.goal" label="Goal" :min="0" :max="999" />
                <div>
                    <label style="font-weight: bold;">Tags: </label>
                    <Dropdown :options="availableTags" v-model="editableHabit.tag" />
                </div>
            </div>


            <DownwardExpandContent label="Habit Color">
                <ColorPicker v-model="editableHabit.color" />
            </DownwardExpandContent>

            <!-- Streak Display -->
            <div class="side-by-side">
                <div> Current Streak: {{ editableHabit.currentStreak }} &nbsp;&nbsp;&nbsp;</div>
                <div> Highest Streak: {{ editableHabit.highestStreak }}</div>
            </div>

            <slot></slot>
        </template>

        <template v-slot:footer>
            <button @click="saveHabit">Save Habit</button>
            <button @click="$emit('close')">Cancel</button>
            <div style="float:right;">
                <button v-if="!showDeleteConfirm" @click="showDeleteConfirm = true">Delete?</button>
                <div v-else>
                    <button class="confirm-btn yes" @click="deleteHabit">Yes</button>
                    <button class="confirm-btn no" @click="showDeleteConfirm = false">No</button>
                </div>
            </div>
        </template>
    </GenericModal>
</template>


<script>
import GenericModal from "@/components/GeneralComponents/GenericModal.vue";
import BooleanSlider from "../ListItems/BooleanSlider.vue";
import DaysOfTheWeek from "../GeneralComponents/DaysOfTheWeek.vue";
import TextField from "../GeneralComponents/TextField.vue";
import Dropdown from "../GeneralComponents/Dropdown.vue";
import IntInput from "../GeneralComponents/IntInput.vue";
import DownwardExpandContent from '@/components/GeneralComponents/DownwardExpandContent.vue';
import ColorPicker from "../SettingsComponents/ColorPicker.vue";

export default {
    components: {
        GenericModal,
        BooleanSlider,
        DaysOfTheWeek,
        TextField,
        Dropdown,
        IntInput,
        DownwardExpandContent,
        ColorPicker
    },
    props: {
        isOpen: Boolean,
        habit: Object,
    },
    data() {
        return {
            editableHabit: {}, // local copy of habit
            availableTags: ["Health", "Productivity", "Mindset", "Fitness", "Other", "Daily"],
            showDeleteConfirm: false,
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
        },
        deleteHabit() {
            this.showDeleteConfirm = false,
                this.$emit("delete", this.editableHabit.id);
            this.$emit("close");
        },
    }
};
</script>

<style scoped>
.all {
    overflow: scroll;
}

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

.side-by-side {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.75rem;
    gap: 0.75rem;
    align-items: center;
}

.section-label {
    display: block;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.disabled-days {
    opacity: 0.5;
    pointer-events: none;
}
</style>

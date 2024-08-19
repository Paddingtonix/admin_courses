<template>
    <div class="oil-textarea">
        <label
            class="oil-textarea__label"
            :class="[
                'oil-textarea__label',
                { _fill: textarea_value && textarea_value.length },
            ]"
            >{{ label }}</label
        >
        <textarea
            :maxlength="max_length"
            v-model="textarea_value"
            :type="type"
            @input="setValue"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        label: {
            type: String,
            default: "label",
        },
        error: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "",
        },
        modelValue: {
            type: String,
            default: "",
        },
        max_length: {
            type: Number,
            default: 150,
        },
    },
    emits: ["set_textarea"],

    setup(props, { emit }) {
        const { modelValue } = toRefs(props);
        console.log(modelValue.value);
        const textarea_value = ref<string>(
            !modelValue.value?.length ? "" : modelValue.value
        );

        watch(modelValue, (newValue) => {
            textarea_value.value = newValue || "";
        });

        const setValue = () => {
            emit("set_textarea", textarea_value.value);
        };

        return {
            textarea_value,
            setValue,
        };
    },
});
</script>
<style lang="sass">
.oil-textarea
    border: rem(1) solid $light_gray
    border-radius: rem(8)
    height: rem(216)
    position: relative
    padding: rem(26) rem(16)

    &:focus-within
        label
            &:not(._fill)
                transform: translateY(rem(-8))

    textarea
        resize: none
        height: 100%
        width: 100%
        font-size: rem(16)

    &__label
        color: $light_gray
        position: absolute
        pointer-events: none
        user-select: none
        top: rem(16)
        transition: all .2s
        left: rem(16)

        &._fill
            top: rem(-8)
            background-color: white
            font-size: rem(16)
            color: $light_primary
</style>

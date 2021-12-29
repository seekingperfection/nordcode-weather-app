<template>
    <ValidationProvider :vid="name" :name="name" :rules="rules" v-slot="{ errors }" class="w-100">
        <div class="mb-4 position-relative d-flex flex-column w-100 align-items-baseline">
            <label
                class="label"
                :for="name"
                @click="$refs.input.focus()"
            >
                {{ label }}
            </label>
            <input
                :class="[errors[0] ? ['is-invalid'] : '', inputStyles]"
                :name="name"
                :type="type"
                :placeholder="placeholder"
                v-model="innerValue"
                @focus="detectInputFocus ? $emit('onFocus', true) : ''"
            />
            <p class="invalid-feedback mt-2 mb-0">{{ errors[0] }}</p>
            <span class="search-icon-placement">
               <slot name="search"></slot>
            </span>
            <span class="clear-icon-placement">
                <slot name="clear"></slot>
            </span>
        </div>
    </ValidationProvider>
</template>
<script>

export default {
    props: {
        detectInputFocus: {
            type: Boolean,
            default: false
        },
        inputStyles: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: "",
        },
        inputValue: {
            type: [String, Number],
            default: '',
        },
        placeholder: {
            type: String,
            default: "",
        },
        name: {
            type: String,
        },
        rules: {
            type: [Object, String],
            default: "",
        },
        type: {
            type: String,
            default: 'text',
            validator: value => [
                "url",
                "text",
                "password",
                "tel",
                "search",
                "number",
                "email",
                "submit"
            ].includes(value)
        },
        value: {
            type: null,
            default: ""
        }
    },
    data() {
        return {
            innerValue: '',
        }
    },
    watch: {
        innerValue(value) {
            this.$emit("input", value);
        },
        value(val) {
            if (val !== this.innerValue) {
                this.innerValue = val;
            }
        },
    },
    mounted() {
        if (this.inputValue !== '') {
            this.innerValue = this.inputValue
        }
    }
}
</script>

<style>

</style>

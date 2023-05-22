<template>
  <div class="form__group">
    <input
      v-bind="$attrs"
      :placeholder="label"
      class="field form__input"
      :class="[(isError > 0) ? 'input-error-style' : '']"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="form__label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    isError: {
      type: Number,
      default: 0
    }
  }
}
</script>

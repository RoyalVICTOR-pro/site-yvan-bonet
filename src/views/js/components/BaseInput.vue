<template>
  <div class="form__group">
    <input
      v-bind="$attrs"
      :placeholder="label"
      class="field form__input"
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
    }
  }
}
</script>

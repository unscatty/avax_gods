<script setup lang="ts">
const props = defineProps<{
  label: string
  placeholder: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const regex = /^[A-Za-z0-9]+$/

const data = useVModel(
  props,
  'modelValue',
  (_, newValue: string) => {
    if (newValue !== '' || regex.test(newValue)) {
      emit('update:modelValue', newValue)
    }
  }
)

</script>

<template>
  <label for="name" class="form-label">
    {{ label }}
  </label>
  <input
    v-model="data"
    type="text"
    class="form-input"
    :placeholder="placeholder"
  />
</template>

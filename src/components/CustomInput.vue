<script setup lang="ts">
defineProps<{
  label: string
  placeholder: string
  value: string
}>()

const emit = defineEmits<{
  (e: 'handleChange', newValue: string): void
}>()

const regex = /^[A-Za-z0-9]+$/

const onValueChange = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value

  if (value === '' || regex.test(value)) {
    emit('handleChange', value)
  }
}
</script>

<template>
  <label for="name" class="form-label">
    {{ label }}
  </label>
  <input
    type="text"
    class="form-input"
    :placeholder="placeholder"
    :value="value"
    @change="onValueChange"
  />
</template>

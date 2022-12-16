<script setup lang="ts">
import VanillaTilt, { HTMLVanillaTiltElement, TiltOptions } from 'vanilla-tilt'

const props = defineProps<
  Omit<TiltOptions, 'scale'> & {
    parallax?: boolean
    scaleSize?: TiltOptions['scale']
  }
>()

const wrapperRef = ref<HTMLVanillaTiltElement>()

onMounted(() =>
  VanillaTilt.init(wrapperRef.value!, { ...props, scale: props.scaleSize || 1 })
)

onUnmounted(() => wrapperRef.value!.vanillaTilt.destroy())
</script>

<template>
  <div ref="wrapperRef" :class="parallax ? 'preserve' : ''">
    <slot />
  </div>
</template>

<style scoped>
.preserve {
  transform-style: preserve-3d;
}
</style>

<template>
  <div :style="themeVars">
    <SlideFrame>
      <slot />
    </SlideFrame>
  </div>
</template>

<script setup lang="ts">
// This layout can be extended to apply per-proposal themes
const themeVars = ref<Record<string, string>>({})

// You can expose a method to update theme dynamically
const setTheme = (primary?: string, secondary?: string) => {
  if (primary) themeVars.value['--color-primary'] = primary
  if (secondary) themeVars.value['--color-secondary'] = secondary
}

defineExpose({ setTheme })
</script>

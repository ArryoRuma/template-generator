<template>
  <div class="slide-content flex-center text-center" :style="coverStyle">
    <div>
      <h1 style="font-size: 3rem; margin-bottom: 1rem;">{{ data.headline }}</h1>
      <p style="font-size: 1.5rem; color: var(--color-text-light);">{{ data.subhead }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    headline: string
    subhead: string
    backgroundColor?: string
  }
}

const props = defineProps<Props>()

const coverStyle = computed(() => ({
  backgroundColor: props.data.backgroundColor || 'var(--color-primary)',
  color: 'white'
}))
</script>

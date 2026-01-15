<template>
  <component 
    :is="slideComponent" 
    v-if="slideComponent"
    :data="slide.data"
  />
  <div v-else class="slide-content flex-center">
    <div class="text-center">
      <h1 style="color: #e74c3c;">Unknown slide type: {{ slide.type }}</h1>
      <p style="color: #666;">Please check your proposal configuration.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  slide: {
    type: string
    data: any
  }
}

const props = defineProps<Props>()

const slideComponent = computed(() => {
  const registry: Record<string, any> = {
    'cover': resolveComponent('CoverSlide'),
    'section': resolveComponent('SectionSlide'),
    'timeline': resolveComponent('TimelineSlide'),
    'investment': resolveComponent('InvestmentSlide'),
    'nextSteps': resolveComponent('NextStepsSlide'),
    'twoColumnBullets': resolveComponent('TwoColumnBulletsSlide'),
  }
  
  return registry[props.slide.type]
})
</script>

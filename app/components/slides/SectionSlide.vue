<template>
  <div class="slide-content">
    <h2 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 2rem;">{{ data.title }}</h2>
    <ul style="font-size: 1.25rem; line-height: 2;">
      <li v-for="(bullet, index) in data.bullets" :key="index">{{ bullet }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    title: string
    bullets: string[]
  }
}

defineProps<Props>()
</script>

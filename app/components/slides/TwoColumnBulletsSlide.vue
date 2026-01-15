<template>
  <div class="slide-content">
    <h2 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 2rem;">{{ data.title }}</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div>
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">{{ data.leftTitle }}</h3>
        <ul style="font-size: 1.125rem; line-height: 1.8;">
          <li v-for="(bullet, index) in data.leftBullets" :key="index">{{ bullet }}</li>
        </ul>
      </div>
      <div>
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">{{ data.rightTitle }}</h3>
        <ul style="font-size: 1.125rem; line-height: 1.8;">
          <li v-for="(bullet, index) in data.rightBullets" :key="index">{{ bullet }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    title: string
    leftTitle: string
    leftBullets: string[]
    rightTitle: string
    rightBullets: string[]
  }
}

defineProps<Props>()
</script>

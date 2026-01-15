<template>
  <div class="slide-nav">
    <NuxtLink v-if="prevUrl" :to="prevUrl">
      <button>← Prev</button>
    </NuxtLink>
    <NuxtLink :to="indexUrl">
      <button>Index</button>
    </NuxtLink>
    <NuxtLink v-if="nextUrl" :to="nextUrl">
      <button>Next →</button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  prevUrl?: string;
  indexUrl: string;
  nextUrl?: string;
}

defineProps<Props>();
</script>

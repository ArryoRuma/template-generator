<template>
  <div class="slide-content">
    <h2
      style="
        font-size: 2.5rem;
        color: var(--color-primary);
        margin-bottom: 2rem;
      "
    >
      {{ data.title }}
    </h2>
    <div style="display: flex; flex-direction: column; gap: 1.5rem">
      <div
        v-for="(item, index) in data.items"
        :key="index"
        style="display: flex; gap: 1.5rem; align-items: flex-start"
      >
        <div
          style="
            min-width: 120px;
            font-weight: 600;
            color: var(--color-primary);
          "
        >
          {{ item.phase }}
        </div>
        <div style="flex: 1">
          <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem">
            {{ item.title }}
          </h4>
          <p style="color: var(--color-text-light)">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    title: string;
    items: Array<{
      phase: string;
      title: string;
      description: string;
    }>;
  };
}

defineProps<Props>();
</script>

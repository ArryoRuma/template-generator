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
        v-for="(step, index) in data.steps"
        :key="index"
        style="
          padding: 1.5rem;
          background: var(--color-accent);
          border-radius: 8px;
        "
      >
        <div style="display: flex; gap: 1rem; align-items: flex-start">
          <div
            style="
              background: var(--color-primary);
              color: white;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              flex-shrink: 0;
            "
          >
            {{ index + 1 }}
          </div>
          <div style="flex: 1">
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem">
              {{ step.title }}
            </h3>
            <p style="color: var(--color-text-light)">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
}

defineProps<Props>();
</script>

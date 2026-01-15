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
    <div
      style="
        background: var(--color-accent);
        padding: 2rem;
        border-radius: 8px;
        margin-bottom: 2rem;
      "
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <h3 style="font-size: 2rem; margin-bottom: 0.5rem">
            {{ data.total }}
          </h3>
          <p style="color: var(--color-text-light)">Total Investment</p>
        </div>
        <div v-if="data.breakdown" style="text-align: right">
          <p
            v-for="(item, key) in data.breakdown"
            :key="key"
            style="margin: 0.25rem 0"
          >
            <strong>{{ key }}:</strong> {{ item }}
          </p>
        </div>
      </div>
    </div>
    <ul
      v-if="data.notes"
      style="font-size: 1rem; color: var(--color-text-light)"
    >
      <li v-for="(note, index) in data.notes" :key="index">{{ note }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    title: string;
    total: string;
    breakdown?: Record<string, string>;
    notes?: string[];
  };
}

defineProps<Props>();
</script>

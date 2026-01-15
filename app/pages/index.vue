<template>
  <div style="padding: 2rem; max-width: 1200px; margin: 0 auto">
    <h1 style="color: var(--color-primary); margin-bottom: 2rem">
      Proposal Decks
    </h1>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
      "
    >
      <NuxtLink
        v-for="proposal in proposals"
        :key="proposal.slug"
        :to="`/p/${proposal.slug}`"
        style="text-decoration: none; color: inherit"
      >
        <div
          style="
            border: 1px solid var(--color-border);
            border-radius: 8px;
            padding: 1.5rem;
            transition: box-shadow 0.2s;
            cursor: pointer;
          "
          @mouseover="
            (e: MouseEvent) =>
              ((e.currentTarget as HTMLElement).style.boxShadow =
                '0 4px 12px rgba(0,0,0,0.1)')
          "
          @mouseout="
            (e: MouseEvent) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = 'none')
          "
        >
          <h2
            style="
              color: var(--color-primary);
              margin-bottom: 0.5rem;
              font-size: 1.5rem;
            "
          >
            {{ proposal.title }}
          </h2>
          <p style="color: var(--color-text-light); margin-bottom: 0.5rem">
            {{ proposal.company.name }}
          </p>
          <p style="color: var(--color-text-light); font-size: 0.875rem">
            {{ proposal.date }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const proposals = useAllProposals();
</script>

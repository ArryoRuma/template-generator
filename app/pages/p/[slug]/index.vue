<template>
  <div style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
    <h1 style="color: var(--color-primary); margin-bottom: 1rem;">{{ proposal.title }}</h1>
    <p style="color: var(--color-text-light); margin-bottom: 2rem;">
      {{ proposal.company.name }} • {{ proposal.date }}
    </p>
    
    <div style="background: var(--color-accent); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
      <h3 style="margin-bottom: 1rem;">Prepared By</h3>
      <p><strong>{{ proposal.preparedBy.name }}</strong></p>
      <p>{{ proposal.preparedBy.email }} • {{ proposal.preparedBy.phone }}</p>
      <p>{{ proposal.preparedBy.website }}</p>
    </div>
    
    <h2 style="margin-bottom: 1rem;">Slides</h2>
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <NuxtLink 
        v-for="(slide, index) in slides" 
        :key="index"
        :to="`/p/${slug}/s/${index + 1}`"
        style="padding: 1rem 1.5rem; background: white; border: 1px solid var(--color-border); 
               border-radius: 4px; text-decoration: none; color: inherit; display: flex; 
               align-items: center; gap: 1rem; transition: background 0.2s;"
        @mouseover="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.background = 'var(--color-accent)'"
        @mouseout="(e: MouseEvent) => (e.currentTarget as HTMLElement).style.background = 'white'"
      >
        <span
style="background: var(--color-primary); color: white; width: 30px; height: 30px; 
                     border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                     font-size: 0.875rem; font-weight: 600;">
          {{ index + 1 }}
        </span>
        <span style="text-transform: capitalize; font-weight: 600;">
          {{ slide.type }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { proposal, slides } = useProposal(slug)
</script>

<template>
  <NuxtLayout name="slide">
    <div :style="themeStyle">
      <SlideRenderer :slide="currentSlide" />
      <SlideNav 
        :prev-url="prevUrl" 
        :index-url="indexUrl" 
        :next-url="nextUrl" 
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const slideNumber = parseInt(route.params.n as string)

// Load proposal first (may throw 404 if not found)
const { proposal, slides, slideCount } = useProposal(slug)

// Then validate slide number
if (slideNumber < 1 || slideNumber > slideCount) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Slide not found'
  })
}

const currentSlide = slides[slideNumber - 1]

if (!currentSlide) {
  // This should not happen if slideCount and slides are consistent, but we guard against it
  throw createError({
    statusCode: 404,
    statusMessage: 'Slide not found'
  })
}

const { prevUrl, nextUrl, indexUrl } = useSlideNav(slug, slideNumber, slideCount)

// Apply proposal theme
const themeStyle = computed(() => ({
  '--color-primary': proposal.theme.primary,
  '--color-secondary': proposal.theme.secondary,
  height: '100%'
}))
</script>

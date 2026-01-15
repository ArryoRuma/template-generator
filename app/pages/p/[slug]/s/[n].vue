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

const { proposal, slides, slideCount } = useProposal(slug)

// Validate slide number
if (slideNumber < 1 || slideNumber > slideCount) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Slide not found'
  })
}

const currentSlide = slides[slideNumber - 1]

const { prevUrl, nextUrl, indexUrl } = useSlideNav(slug, slideNumber, slideCount)

// Apply proposal theme
const themeStyle = computed(() => ({
  '--color-primary': proposal.theme.primary,
  '--color-secondary': proposal.theme.secondary,
  height: '100%'
}))
</script>

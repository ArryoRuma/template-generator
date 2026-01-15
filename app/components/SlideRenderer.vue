<template>
  <component :is="slideComponent" v-if="slideComponent" :data="slide.data" />
  <div v-else class="slide-content flex-center">
    <div class="text-center">
      <h1 style="color: #e74c3c">Unknown slide type: {{ slide.type }}</h1>
      <p style="color: #666">Please check your proposal configuration.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import CoverSlide from "./slides/CoverSlide.vue";
import SectionSlide from "./slides/SectionSlide.vue";
import TimelineSlide from "./slides/TimelineSlide.vue";
import InvestmentSlide from "./slides/InvestmentSlide.vue";
import NextStepsSlide from "./slides/NextStepsSlide.vue";
import TwoColumnBulletsSlide from "./slides/TwoColumnBulletsSlide.vue";

interface Props {
  slide: {
    type: string;
    data: Record<string, unknown>;
  };
}

const props = defineProps<Props>();

const slideComponent = computed<Component | undefined>(() => {
  const registry: Record<string, Component> = {
    cover: CoverSlide,
    section: SectionSlide,
    timeline: TimelineSlide,
    investment: InvestmentSlide,
    nextSteps: NextStepsSlide,
    twoColumnBullets: TwoColumnBulletsSlide,
  };

  return registry[props.slide.type];
});
</script>

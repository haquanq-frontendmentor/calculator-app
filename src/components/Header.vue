<script setup lang="ts">
import MoonIcon from "../assets/images/moon-star-icon.svg?component";
import SparkleIcon from "../assets/images/sparkles-icon.svg?component";
import SunIcon from "../assets/images/sun-icon.svg?component";
import { THEMES, useThemeStore } from "../stores/themeStore";

const themeStore = useThemeStore();
</script>

<template>
  <header class="text-foreground flex items-center justify-between pt-2 pb-7">
    <div class="pl-[0.375rem] text-[2rem]" aria-hidden="true">calc</div>
    <button
      class="text-foreground relative flex aspect-square w-10 items-center justify-center overflow-hidden rounded-lg transition-[scale] active:scale-[0.97]"
      type="button"
      @click="themeStore.cycleThemes()"
    >
      <span class="sr-only" aria-live="polite">{{ `Change theme (current: ${themeStore.theme})` }}</span>
      <SunIcon :class="themeStore.theme != THEMES.DARK && 'hidden'" />
      <SparkleIcon :class="themeStore.theme != THEMES.LIGHT && 'hidden'" />
      <MoonIcon :class="themeStore.theme != THEMES.PURPLE && 'hidden'" />
      <span class="bg-button-secondary-background absolute inset-0 rounded-[inherit] opacity-0 blur-sm"></span>
    </button>
  </header>
</template>

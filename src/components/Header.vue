<script setup lang="ts">
import MoonIcon from "../assets/images/moon-star-icon.svg?component";
import SkullIcon from "../assets/images/skull-icon.svg?component";
import SunIcon from "../assets/images/sun-icon.svg?component";
import { THEMES, useThemeStore } from "../stores/themeStore";

const themeStore = useThemeStore();
</script>

<template>
  <header class="text-foreground flex items-center justify-between pt-2 pr-1 pb-7 pl-[0.375rem]">
    <div class="text-[2rem]" aria-hidden="true">calc</div>
    <button
      class="text-foreground focus-visible:outline-foreground relative flex aspect-square w-10 items-center justify-center overflow-hidden rounded-lg transition-[scale] focus-visible:outline-3 active:scale-[0.97]"
      type="button"
      @click="themeStore.cycleThemes()"
    >
      <span class="sr-only" aria-live="polite">{{ `Change theme (current: ${themeStore.theme})` }}</span>
      <SunIcon :class="themeStore.theme != THEMES.LIGHT && 'hidden'" />
      <SkullIcon :class="themeStore.theme != THEMES.PURPLE && 'hidden'" />
      <MoonIcon :class="themeStore.theme != THEMES.DARK && 'hidden'" />
      <span class="bg-button-secondary-background absolute inset-0 rounded-[inherit] opacity-0 blur-sm"></span>
    </button>
  </header>
</template>

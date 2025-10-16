<script setup lang="ts">
import bgDark from "./assets/images/bg-dark.jpg";
import bgLight from "./assets/images/bg-light.jpg";
import bgPurple from "./assets/images/bg-purple.jpg";
import Header from "./components/Header.vue";
import { useThemeStore } from "./stores/themeStore";

const themeStore = useThemeStore();
</script>

<template>
  <div class="bg-background relative flex min-h-screen items-center justify-center">
    <div class="absolute inset-0 *:h-full *:w-full *:object-cover *:transition-opacity">
      <img
        :src="bgPurple"
        alt=""
        class="absolute inset-0 opacity-0"
        :class="themeStore.theme == 'purple' && 'opacity-100'"
      />
      <img
        :src="bgLight"
        alt=""
        class="absolute inset-0 opacity-0"
        :class="themeStore.theme == 'light' && 'opacity-100'"
      />
      <img
        :src="bgDark"
        alt=""
        class="absolute inset-0 opacity-0"
        :class="themeStore.theme == 'dark' && 'opacity-100'"
      />
    </div>
    <div class="relative z-50 w-[min(100vw-3rem,33.75rem)]">
      <Header />
    </div>
  </div>
</template>

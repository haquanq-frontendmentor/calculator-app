<script setup lang="ts">
import type { CSSProperties } from "vue";

const { colSpan = 1 } = defineProps<{ colSpan?: number }>();

const styles: CSSProperties = {
  gridColumn: "span " + colSpan,
};
</script>

<template>
  <div :style="styles" :data-col-span="colSpan" data-keypad-cell>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = defineProps<{ class?: string }>();

const classes = computed(() =>
  cn("grid grid-cols-[repeat(4,1fr)] gap-[clamp(0.8125rem,0.0969rem+3.0534vw,1.5625rem)]", props.class),
);
</script>

<template>
  <div :class="classes" data-keypad-row>
    <slot></slot>
  </div>
</template>

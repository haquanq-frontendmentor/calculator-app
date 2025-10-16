<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

type CalculatorKeyProps = {
  variant: "primary" | "secondary" | "accent";
  class?: string;
};

const props = defineProps<CalculatorKeyProps>();

const bottomShadowClass = computed(() =>
  cn("absolute inset-0 rounded-[inherit] mt-1", {
    "bg-button-primary-shadow": props.variant === "primary",
    "bg-button-secondary-shadow ": props.variant === "secondary",
    "bg-button-accent-shadow ": props.variant === "accent",
  }),
);

const surfaceClass = computed(() =>
  cn(
    "flex h-full relative group-active:translate-y-[3px] shadow-sm pt-[0.375rem] z-10 w-full items-center justify-center rounded-[inherit] transition-[color,background-color,translate]",
    {
      "bg-button-primary-background text-button-primary-text group-hover:bg-button-primary-hover-background":
        props.variant === "primary",
      "bg-button-secondary-background text-button-secondary-text group-hover:bg-button-secondary-hover-background":
        props.variant === "secondary",
      "bg-button-accent-background text-button-accent-text group-hover:bg-button-accent-hover-background":
        props.variant === "accent",
    },
    props.class,
  ),
);

const topShadowClass = computed(() =>
  cn("block border-t-2 opacity-50 rounded-[inherit] absolute top-0 h-full left-0 right-0", {
    "border-button-primary-hover-background": props.variant === "primary",
    "border-button-secondary-hover-background ": props.variant === "secondary",
    "border-button-accent-hover-background ": props.variant === "accent",
  }),
);
</script>

<template>
  <button
    class="group focus-visible:outline-foreground relative h-full w-full rounded-[clamp(0.375rem,0.1365rem+1.0178vw,0.625rem)] pb-1 focus-visible:outline-3 focus-visible:outline-offset-3"
    data-rv
  >
    <span :class="surfaceClass">
      <span :class="topShadowClass"></span>
      <slot></slot>
    </span>
    <span :class="bottomShadowClass"></span>
  </button>
</template>

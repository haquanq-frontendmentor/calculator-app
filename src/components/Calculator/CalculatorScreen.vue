<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { useCalculatorStore } from "../../stores/calculatorStore";

const screenRef = useTemplateRef("screen");
const resultRef = useTemplateRef("result");

const calculatorStore = useCalculatorStore();

onMounted(() => {
  const screen = screenRef.value as HTMLElement;
  const result = resultRef.value as HTMLElement;

  const resizeObserver = new ResizeObserver(() => {
    const screenComputedStyles = window.getComputedStyle(screen);
    const resultComputedStyles = window.getComputedStyle(screen);

    const maxWidth = () =>
      screen.clientWidth -
      parseFloat(screenComputedStyles.paddingLeft.replace("px", "")) -
      parseFloat(screenComputedStyles.paddingRight.replace("px", "")) -
      8;

    let resultFontSize = parseFloat(resultComputedStyles.fontSize.replace("px", "")) / 16;

    while (result.clientWidth >= maxWidth()) {
      resultFontSize -= 0.0625;
      result.style.fontSize = resultFontSize + "rem";
    }

    while (result.clientWidth < maxWidth()) {
      resultFontSize += 0.0625;
      result.style.fontSize = resultFontSize + "rem";
      if (resultFontSize > 3.5) {
        result.style.fontSize = "";
        break;
      }
    }
  });
  resizeObserver.observe(result);
  resizeObserver.observe(screen);
});
</script>

<template>
  <div class="text-foreground relative rounded-[0.625rem]">
    <div class="gradient-border absolute inset-0 rounded-[0.75rem] opacity-70"></div>
    <div class="bg-calculator-screen-background absolute inset-0 z-20 h-full rounded-[inherit] blur-sm"></div>
    <div
      class="relative z-50 flex min-h-32 flex-col items-end justify-center gap-2 py-7 pr-[clamp(1.5rem,1.0229rem+2.0356vw,2rem)] pl-[clamp(1.5rem,1.1422rem+1.5267vw,1.875rem)] tracking-tight"
      ref="screen"
    >
      <p class="block min-h-4 min-w-4 shrink-0">{{ calculatorStore.expression }}</p>
      <p class="text-[3.5rem] text-nowrap" ref="result">
        {{ calculatorStore.result }}
      </p>
    </div>
  </div>
</template>

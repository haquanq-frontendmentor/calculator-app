<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";

const containerRef = useTemplateRef("container-ref");

onMounted(() => {
  const grid = containerRef.value as HTMLDivElement;

  const focusables = [] as Array<Array<HTMLButtonElement>>;

  grid.querySelectorAll<HTMLElement>("[data-keypad-row]").forEach((row, rowIndex) => {
    row.querySelectorAll<HTMLElement>("[data-keypad-cell]").forEach((cell) => {
      if (rowIndex === focusables.length) focusables.push([]);
      const span = parseInt(cell.getAttribute("data-col-span") as string);
      const button = cell.querySelector("button") as HTMLButtonElement;
      button.tabIndex = -1;
      Array(span)
        .fill("")
        .forEach(() => {
          focusables[rowIndex]?.push(button);
        });
    });
  });

  if (focusables[0] && focusables[0][0]) {
    focusables[0][0].tabIndex = 0;
  }

  const rowSize = focusables.length;
  const colSize = focusables[0]?.length as number;
  let prevX = 0;
  let prevY = 0;

  const setFocus = (currX: number, currY: number): boolean => {
    if (currX < 0 || currX >= rowSize || currY < 0 || currY >= colSize) return true;

    const prevRow = focusables[prevX];
    const currRow = focusables[currX];
    if (!Array.isArray(prevRow) || !Array.isArray(currRow)) return true;

    let prev = prevRow[prevY] as HTMLButtonElement;
    let curr = currRow[currY] as HTMLButtonElement;
    prevX = currX;
    prevY = currY;

    if (prev.isEqualNode(curr)) return false;

    prev.tabIndex = -1;
    curr.tabIndex = 0;
    curr.focus();
    return true;
  };

  const moveUp = () => {
    let moved = false;
    while (!moved) moved = setFocus(prevX - 1, prevY);
  };

  const moveDown = () => {
    let moved = false;
    while (!moved) moved = setFocus(prevX + 1, prevY);
  };

  const moveLeft = () => {
    let moved = false;
    while (!moved) moved = setFocus(prevX, prevY - 1);
  };

  const moveRight = () => {
    let moved = false;
    while (!moved) moved = setFocus(prevX, prevY + 1);
  };

  grid.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.shiftKey) return;

    switch (e.key) {
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
    }
  });
});
</script>

<template>
  <div class="relative rounded-[0.625rem]">
    <div class="gradient-border absolute inset-0 rounded-[0.75rem] opacity-70"></div>
    <div class="bg-calculator-keypad-background absolute inset-0 z-20 rounded-[inherit] blur-sm"></div>
    <div
      role="group"
      class="relative z-50 grid h-[clamp(26.25rem,22.6718rem+15.2672vw,30rem)] grid-rows-5 gap-[clamp(0.8125rem,0.1565rem+2.799vw,1.5rem)] rounded-[inherit] py-[clamp(1.5rem,1.0229rem+2.0356vw,2rem)] pr-[clamp(1.5rem,1.0229rem+2.0356vw,2rem)] pl-[clamp(1.5rem,1.1422rem+1.5267vw,1.875rem)] text-[clamp(2rem,1.5229rem+2.0356vw,2.5rem)]"
      ref="container-ref"
    >
      <slot></slot>
    </div>
  </div>
</template>

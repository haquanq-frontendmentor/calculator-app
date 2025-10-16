<script setup lang="ts">
import CalculatorKeypad from "./CalculatorKeypad.vue";
import CalculatorScreen from "./CalculatorScreen.vue";
</script>

<template>
  <div class="flex flex-col gap-6">
    <CalculatorScreen />
    <CalculatorKeypad />
  </div>
</template>

<script setup lang="ts">
import { CALCULATION_OPERATORS, useCalculatorStore, type CalculationOperators } from "../../stores/calculatorStore";
import CalculatorKey from "./CalculatorKey.vue";
import CalculatorKeypadCell from "./CalculatorKeypadCell.vue";
import CalculatorKeypadGrid from "./CalculatorKeypadGrid.vue";
import CalculatorKeypadRow from "./CalculatorKeypadRow.vue";

window.addEventListener("keydown", (e) => {
  if (/^[0-9.]{1}$/.test(e.key)) {
    e.preventDefault();
    calculatorStore.addValue(e.key);
  } else if (Object.values(CALCULATION_OPERATORS).includes(e.key as CalculationOperators)) {
    e.preventDefault();
    calculatorStore.addOperator(e.key as CalculationOperators);
  } else if (e.key === "*") {
    e.preventDefault();
    calculatorStore.addOperator(CALCULATION_OPERATORS.MULTIPLY);
  } else if (e.key === "Enter") {
    calculatorStore.calculate();
    e.preventDefault();
  } else if (e.key === "Delete") {
    e.preventDefault();
    calculatorStore.clearEntry();
  } else if (e.key === "Escape") {
    e.preventDefault();
    calculatorStore.reset();
  } else if (e.key === "Backspace") {
    e.preventDefault();
    calculatorStore.removeLastDigit();
  }
});

const calculatorStore = useCalculatorStore();

const handleMultiplyClick = () => {
  calculatorStore.addOperator(CALCULATION_OPERATORS.MULTIPLY);
};

const handleDivideClick = () => {
  calculatorStore.addOperator(CALCULATION_OPERATORS.DIVIDE);
};

const handlePlusClick = () => {
  calculatorStore.addOperator(CALCULATION_OPERATORS.PLUS);
};

const handleMinusClick = () => {
  calculatorStore.addOperator(CALCULATION_OPERATORS.MINUS);
};

const handleResetClick = () => {
  calculatorStore.reset();
};

const handleDeleteClick = () => {
  calculatorStore.clearEntry();
};

const handleEqualClick = () => {
  calculatorStore.calculate();
};

const handleDotClick = () => {
  calculatorStore.addDecimalPoint();
};

const handleNumkeyClick = (value: number) => {
  calculatorStore.addValue(value.toString());
};
</script>
<template>
  <CalculatorKeypadGrid>
    <CalculatorKeypadRow>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(7)">7</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(8)">8</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(9)">9</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey
          variant="primary"
          class="pt-1 text-[clamp(1.25rem,0.7729rem+2.0356vw,1.75rem)] tracking-[-0.02em] uppercase"
          aria-label="Delete"
          @click="handleDeleteClick"
          >Del</CalculatorKey
        >
      </CalculatorKeypadCell>
    </CalculatorKeypadRow>
    <CalculatorKeypadRow>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(4)">4</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(5)">5</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(6)">6</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" aria-label="Plus" @click="handlePlusClick">+</CalculatorKey>
      </CalculatorKeypadCell>
    </CalculatorKeypadRow>
    <CalculatorKeypadRow>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(1)">1</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(2)">2</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(3)">3</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" aria-label="Minus" @click="handleMinusClick">-</CalculatorKey>
      </CalculatorKeypadCell>
    </CalculatorKeypadRow>
    <CalculatorKeypadRow>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" aria-label="Add decimal point" @click="handleDotClick">.</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" @click="handleNumkeyClick(0)">0</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" aria-label="Divide" @click="handleDivideClick">/</CalculatorKey>
      </CalculatorKeypadCell>
      <CalculatorKeypadCell>
        <CalculatorKey variant="secondary" aria-label="Multiply" @click="handleMultiplyClick">x</CalculatorKey>
      </CalculatorKeypadCell>
    </CalculatorKeypadRow>
    <CalculatorKeypadRow class="text-[clamp(1.25rem,0.7729rem+2.0356vw,1.75rem)]">
      <CalculatorKeypadCell :col-span="2">
        <CalculatorKey variant="primary" class="pt-1 tracking-[-0.02em] uppercase" @click="handleResetClick"
          >Reset</CalculatorKey
        >
      </CalculatorKeypadCell>
      <CalculatorKeypadCell :col-span="2">
        <CalculatorKey variant="accent" aria-label="Equal" @click="handleEqualClick">=</CalculatorKey>
      </CalculatorKeypadCell>
    </CalculatorKeypadRow>
  </CalculatorKeypadGrid>
</template>

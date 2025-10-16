import { Decimal } from "decimal.js";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

const MAX_INTEGER_DIGIT_COUNT = 16;
const MAX_FRACTION_DIGIT_COUNT = 16;
const INITIAL_PREVIOUS_VALUE = "";
const INITIAL_CURRENT_VALUE = "0";
const INITIAL_EXPRESSION_TEXT = " ";
const INITIAL_RESULT_TEXT = "0";
const DECIMAL_POINT = ".";

const CALCULATION_OPERATORS = {
    MULTIPLY: "x",
    MINUS: "-",
    DIVIDE: "/",
    PLUS: "+",
} as const;

type CalculationOperators = (typeof CALCULATION_OPERATORS)[keyof typeof CALCULATION_OPERATORS];

const useCalculatorStore = defineStore("calc", () => {
    const operator = ref<CalculationOperators | null>(null);
    const previousValue = ref<string>(INITIAL_PREVIOUS_VALUE);
    const currentValue = ref<string>(INITIAL_CURRENT_VALUE);
    const result = ref<string>(INITIAL_RESULT_TEXT);
    const expression = ref<string>(INITIAL_EXPRESSION_TEXT);

    let movedCurrentValueToPreviousValue = false;
    let calculating = false;

    const evaluate = (a: Decimal, b: Decimal, operator: CalculationOperators): Decimal => {
        switch (operator) {
            case CALCULATION_OPERATORS.DIVIDE:
                return a.dividedBy(b);
            case CALCULATION_OPERATORS.MULTIPLY:
                return a.times(b);
            case CALCULATION_OPERATORS.PLUS:
                return a.plus(b);
            case CALCULATION_OPERATORS.MINUS:
                return a.minus(b);
        }
    };

    const formatValue = (value: string) => {
        if (value.length > MAX_INTEGER_DIGIT_COUNT + 1) return new Decimal(value).toExponential();

        const { hasDecimalPoint, fractionDigits, integerDigits } = parseValue(value);
        const leadingZeroTrimRegex = /^0+(?!\.|$)/;
        const thousandSeparatorRegex = /(?<=\d)(?=(\d{3})+$)/g;

        return (
            (integerDigits || "0").replace(leadingZeroTrimRegex, "").replace(thousandSeparatorRegex, ",") +
            (hasDecimalPoint ? DECIMAL_POINT : "") +
            (fractionDigits || "")
        );
    };

    const parseValue = (value: string) => {
        let integerDigits = value.split(DECIMAL_POINT)[0];
        let fractionDigits = value.split(DECIMAL_POINT)[1];
        const hasDecimalPoint = value.indexOf(DECIMAL_POINT) != -1;

        return {
            integerDigitCount: integerDigits ? integerDigits.length : 0,
            fractionDigitCount: fractionDigits ? fractionDigits.length : 0,
            hasDecimalPoint,
            integerDigits,
            fractionDigits,
        };
    };

    const addOperator = (value: CalculationOperators) => {
        calculating = false;
        if (!movedCurrentValueToPreviousValue) {
            if (operator.value !== null && previousValue.value !== null) {
                const res = evaluate(new Decimal(previousValue.value), new Decimal(currentValue.value), operator.value);
                currentValue.value = res.toString();
            }
            previousValue.value = currentValue.value;
            movedCurrentValueToPreviousValue = true;
        }
        operator.value = value;
    };

    const addDecimalPoint = () => {
        calculating = false;
        if (!parseValue(currentValue.value).hasDecimalPoint) currentValue.value += DECIMAL_POINT;
    };

    const addValue = (value: string) => {
        calculating = false;
        if (movedCurrentValueToPreviousValue) {
            clearEntry();
            movedCurrentValueToPreviousValue = false;
        }

        const { fractionDigitCount, integerDigitCount } = parseValue(currentValue.value);

        if (fractionDigitCount > MAX_FRACTION_DIGIT_COUNT) return;
        if (integerDigitCount > MAX_INTEGER_DIGIT_COUNT) return;

        currentValue.value += value;
    };

    const clearEntry = () => {
        currentValue.value = INITIAL_CURRENT_VALUE;
    };

    const calculate = () => {
        console.log("awdawd");
        if (operator.value === null) return;
        calculating = true;
        const res = evaluate(new Decimal(previousValue.value), new Decimal(currentValue.value), operator.value);
        previousValue.value = res.toString();
        expression.value =
            formatValue(previousValue.value) + " " + operator.value + " " + formatValue(currentValue.value);
        result.value = formatValue(previousValue.value);
    };

    const reset = () => {
        calculating = false;
        currentValue.value = INITIAL_CURRENT_VALUE;
        previousValue.value = INITIAL_PREVIOUS_VALUE;
        operator.value = null;
    };

    const removeLastDigit = () => {
        currentValue.value = currentValue.value.slice(0, -1);
    };

    watch([previousValue, currentValue, operator], ([a, b, operator]) => {
        if (calculating) return;

        if (operator !== null && a !== null) {
            expression.value = formatValue(a) + " " + operator;
        } else {
            expression.value = INITIAL_EXPRESSION_TEXT;
        }
        result.value = formatValue(b);
    });

    return {
        result,
        expression,
        addValue,
        addOperator,
        addDecimalPoint,
        removeLastDigit,
        clearEntry,
        calculate,
        reset,
    };
});

export { CALCULATION_OPERATORS, useCalculatorStore, type CalculationOperators };

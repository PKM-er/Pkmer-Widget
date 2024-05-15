<template>
  <div class="container">
    <main id="app" class="flex-c">
      <div id="calculator-con" class="flex-c">
        <section id="display">
          <div id="screen">{{ display }}</div>
          <p id="tracker">{{ history || tracker }}</p>
        </section>
        <section id="keypad" class="flex-c">
          <ul id="operators" class="flex-r">
            <li
              v-for="operator in operators"
              :key="operator"
              class="operator"
              @click="operatorHandler(operator)"
            >
              {{ operator }}
            </li>
          </ul>
          <ul id="numbers" class="flex-r">
            <li
              v-for="number in numbers"
              :key="number"
              class="number"
              @click="numberHandler(number)"
            >
              {{ number }}
            </li>
            <li id="decimal" @click="decimalHandler">.</li>
            <li id="clear" @click="resetCalculator">C</li>
          </ul>
          <button id="equal" @click="calculate">=</button>
        </section>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

let display = ref("0");
let tracker = ref("Standard");
let operators = ref(["+", "-", "*", "/"]);
let numbers = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);

let memory: any[] = [];
let history = ref("");
let register = ref();
let operatorLocker = ref(true);
let resultChaining = ref(false);
// 在组件挂载时添加键盘事件监听器
onMounted(() => {
  resetCalculator();
  window.addEventListener("keydown", handleKeyDown);
});

// 在组件卸载时移除键盘事件监听器
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

function handleKeyDown(event) {
  const key = event.key;

  if (isNumberKey(key)) {
    numberHandler(key);
  } else if (isOperatorKey(key)) {
    operatorHandler(key);
  } else if (isDecimalKey(key)) {
    decimalHandler();
  } else if (isEqualKey(key)) {
    calculate();
  } else if (isClearKey(key)) {
    resetCalculator();
  }
}

function isNumberKey(key) {
  return numbers.value.includes(key);
}

function isOperatorKey(key) {
  return operators.value.includes(key);
}

function isDecimalKey(key) {
  return key === ".";
}

function isEqualKey(key) {
  return key === "=" || key === "Enter";
}

function isClearKey(key) {
  return key === "Delete" || key === "Backspace";
}

function numberHandler(number: string) {
  if (!resultChaining.value) {
    register.value =
      register.value !== null
        ? parseFloat(register.value + number)
        : parseFloat(number);
    history.value += number;
    operatorLocker.value = false;
  } else {
    resetCalculator();
  }
}

function operatorHandler(operator: string) {
  console.log(operator, "operator");
  console.log(register.value, "register");
  if (!operatorLocker.value) {
    switch (memory.length) {
      case 0:
        register.value = parseFloat(register.value.toString());
        memory.push(register.value);
        register.value = null;
        memory.push(operator);
        break;
      case 1:
        register.value = null;
        memory.push(operator);
        break;
      case 2:
        const result = math(
          memory[0],
          memory[1],
          parseFloat(register.value.toString())
        );
        memory = [result];
        register.value = null;
        memory.push(operator);
        display.value = resultDisplay(result);
        break;
      default:
        resetCalculator();
        display.value = "Operator Error";
    }
    history.value += operator;
    operatorLocker.value = true;
    resultChaining.value = false;
  }
}

function calculate() {
  console.log(memory, "memory");
  if (!operatorLocker.value && memory.length === 2) {
    const result = math(
      memory[0],
      memory[1],
      parseFloat(register.value.toString())
    );
    console.log("result:", result);
    register.value = null;
    resultChaining.value = true;
    memory = [result];
    display.value = resultDisplay(result);
  }
}

function decimalHandler() {
  if (register.value !== null && !register.value.toString().includes(".")) {
    register.value += ".";
    history.value += ".";
  }
}

function resetCalculator() {
  memory = [];
  history.value = "";
  register.value = null;
  operatorLocker.value = true;
  resultChaining.value = false;
  tracker.value = "Standard";
  display.value = "0";
}

function math(a: number, operator: any, b: number) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return null;
  }
}

function resultDisplay(num) {
  console.log(num, "num");
  if (num === null) {
    return "Error";
  }
  let display = num.toString();
  if (display.length > 10) {
    display = num.toExponential(6).toString();
  }
  return display;
}
</script>
<style>
/* Color Scheme
================================================================================
Main Colors:
#c5dec2 - #95a893
#3e5050 - #3a4949
#263331 - #333

Matching R&G:
#549042 - #8e0000
*/ /* App
==============================================================================*/

.container {
  font-family: "VT323", monospace;
  --key-width: 45px;
}
/* Calculator Container
==============================================================================*/
#calculator-con {
  width: calc(var(--key-width) * 4 + 30px);
  position: relative;
  justify-content: flex-start;
  padding: 10px 0;
  background-color: #739595;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4%;
}
.flex-c {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.flex-r {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}
/* Display Section
==============================================================================*/
#display {
  height: auto;
  width: calc(var(--key-width) * 4 + 10px);
  padding: 0 10px;
  margin-bottom: 5px;
  text-align: right;
  border-radius: 5%;
  border: solid rgba(0, 0, 0, 0.61) 2px;
  background-color: #cfe1d7;
  overflow: hidden;
}

/* Results Screen
============================================*/
#screen {
  font-size: calc(var(--key-width) - 15px);
  color: #364545;
}

/* Tracker Screen
============================================*/
#tracker {
  margin-top: -5px;
  font-size: calc(var(--key-width) - 25px);
  color: #3b4c4c;
  /**As there are no spacing between each formula,
  I had to break-word so they can be wrapped inisde the p**/
  text-align: left;
  word-wrap: break-word;
}

/* Keypad Layout
==============================================================================*/
#keypad {
  width: auto;
  text-align: center;
  position: relative;
}
#keypad ul li {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--key-width);
  height: var(--key-width);
  margin: 1px;
  font-weight: bold;
  font-size: calc(var(--key-width) - 15px);
  border-radius: 5%;
  list-style-type: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  cursor: pointer;
}

/* Operator Keys
============================================*/
#operators {
  width: auto;
  flex-wrap: wrap;
  margin-bottom: 5px;
  padding: 0;
}
#operators li {
  background: #3e5050;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all ease 0.2s;
}
#operators li:active {
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.2);
  background: #364747;
}

/* Number Keys
============================================*/
#numbers {
  flex-wrap: wrap;
}

.number {
  color: #3b4c4c;
  background: #c5dec2;
  transition: all ease 0.2s;
}
.number:active {
  box-shadow: inset 0px 1.5px 2px rgba(0, 0, 0, 0.5);
}

/* Clear Button
============================================*/
#clear {
  background-color: #ac2c2c;
  color: white;
}
#clear:active {
  box-shadow: inset 0px 4px 2px rgba(0, 0, 0, 0.3);
  background: #ac2c2c;
}

/* Decimal Button
============================================*/

#decimal {
  color: #3b4c4c;
  background: #c5dec2;
  transition: all ease 0.2s;
}
#decimal:active {
  box-shadow: inset 0px 1.5px 2px rgba(0, 0, 0, 0.5);
}

/* Equal Button
============================================*/
#equal {
  width: calc(var(--key-width) * 4 + 8px);
  height: calc(var(--key-width) - 7px);
  margin-top: 5px;
  text-align: center;
  font-size: calc(var(--key-width) - 10px);
  color: white;
  background: #416e36;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 3%;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  transition: all ease 0.2s;
}
#equal:active {
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.18);
  background: #3b6331;
}
</style>

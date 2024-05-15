<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import tinycolor from "tinycolor2";
interface Props {
  widgetConfig: {
    [index: string]: any;
  };
}
// 从父组件读取配置
const props = defineProps<Props>();
const breakLength = ref(5);
const sessionLength = ref(25);
const timeLeft = ref(sessionLength.value);
const fillHeight = ref("0%");
const sessionName = ref("Session");
const currentTotal = ref(0);
let runTimer = false;
let secs = 60 * sessionLength.value;
const originalTime = ref(sessionLength.value);
let currentLength = ref(sessionLength.value);
const fillColor = ref("var(--black)");
const themeColor = ref(""); //basic
const fontColor = ref(""); //basic
onMounted(() => {
  updateTimer();
});

onBeforeUnmount(() => {
  clearInterval(runTimer);
});
watchEffect(() => {
  themeColor.value = props.widgetConfig["theme-color"]
    ? props.widgetConfig["theme-color"]
    : "#99cc00cb";
  fontColor.value = tinycolor(themeColor.value).isLight()
    ? "#747474"
    : "#9b9b9b";
});
function secondsToHms(d: number) {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return (
    (h > 0 ? h + "⁚" + (m < 10 ? "0" : "") : "") +
    m +
    "⁚" +
    (s < 10 ? "0" : "") +
    s
  );
}

function sessionLengthChange(time: number) {
  if (!runTimer && sessionName.value === "Session") {
    sessionLength.value += time;
    if (sessionLength.value < 1) {
      sessionLength.value = 1;
    }
    timeLeft.value = sessionLength.value;
    originalTime.value = sessionLength.value;
    secs = 60 * sessionLength.value;
  }
}
function ResetSession() {
  clearInterval(runTimer);
  runTimer = false;
  fillColor.value = "var(--green)";
  sessionName.value = "Session";
  originalTime.value = sessionLength.value;
  timeLeft.value = secondsToHms(60 * sessionLength.value);
  fillHeight.value = "0%";
  secs = 60 * sessionLength.value;
}
function breakLengthChange(time: number) {
  if (!runTimer) {
    breakLength.value += time;
    if (breakLength.value < 1) {
      breakLength.value = 1;
    }
    if (sessionName.value === "Break!") {
      timeLeft.value = breakLength.value;
      originalTime.value = breakLength.value;
      secs = 60 * breakLength.value;
    }
  }
}

function toggleTimer() {
  if (!runTimer) {
    if (sessionName.value === "Session") {
      currentLength.value = sessionLength.value;
    } else {
      currentLength.value = breakLength.value;
    }

    updateTimer();
    runTimer = setInterval(updateTimer, 1000);
  } else {
    clearInterval(runTimer);
    runTimer = false;
  }
}

function updateTimer() {
  secs -= 1;
  if (secs < 0) {
    // countdown is finished

    // Play audio
    const wav = "/assets/alert.mp3";
    const audio = new Audio(wav);
    audio.play();

    // toggle break and session
    fillColor.value = "var(--black)";
    if (sessionName.value === "Break!") {
      sessionName.value = "Session";
      currentLength.value = sessionLength.value;
      timeLeft.value = 60 * sessionLength.value;
      originalTime.value = sessionLength.value;
      secs = 60 * sessionLength.value;
    } else {
      sessionName.value = "Break!";
      currentLength.value = breakLength.value;
      timeLeft.value = 60 * breakLength.value;
      originalTime.value = breakLength.value;
      secs = 60 * breakLength.value;
    }
  } else {
    if (sessionName.value === "Break!") {
      fillColor.value = "var(--red)";
    } else {
      fillColor.value = "var(--green)";
    }
    timeLeft.value = secondsToHms(secs);

    const denom = 60 * originalTime.value;
    const perc = Math.abs((secs / denom) * 100 - 100);
    fillHeight.value = perc + "%";
  }
}
</script>
<template>
  <div>
    <main>
      <section @click="toggleTimer()">
        <div class="timer">
          <p class="title">{{ sessionName }}</p>
          <p class="time">{{ timeLeft }}</p>
          <span
            class="fill"
            :style="{ height: fillHeight, background: fillColor }"
          ></span>
        </div>
      </section>
      <header>
        <div class="session">
          <div class="breakCtrl">
            <p>休息时长</p>
            <button @click="breakLengthChange(-1)">&minus;</button>
            <span class="time">{{ breakLength }}</span>
            <button @click="breakLengthChange(1)">+</button>
          </div>
          <div class="">
            <p>复位</p>
            <button @click="ResetSession()">○</button>
          </div>

          <div class="sessionCtrl">
            <p>专注时长</p>
            <button @click="sessionLengthChange(-1)">&minus;</button>
            <span class="time">{{ sessionLength }}</span>
            <button @click="sessionLengthChange(1)">+</button>
          </div>
        </div>
      </header>
    </main>
  </div>
</template>

<style>
/* variables */
:root {
  --font: Pacifico, "Open Sans", Arial;
}
@font-face {
  font-family: Pacifico, Open Sans;
  src: url(https://fonts.googleapis.com/css?family=Pacifico|Open+Sans:300);
}
* {
  margin: 0;
  font-family: var(--font);
}

main {
  --green: v-bind(themeColor);
  --red: #ff4444a1;
  --black: transparent;
  --white: v-bind(fontColor);
  height: 100%;
  overflow: hidden;
  background-color: var(--black);
}
main:hover header {
  visibility: visible;
}
header {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  color: var(--white);
  text-transform: uppercase;
  padding: 20px;
  visibility: hidden;
}

.session {
  font-size: 0.8em;
  display: flex;
  white-space: nowrap;
}

.session .breakCtrl,
.session .sessionCtrl {
  display: inline;
  padding-left: 15px;
  padding-right: 15px;
}

.session button {
  background-color: transparent;
  color: var(--white);
  border: none;
  cursor: pointer;
  font-size: 2em;
  outline: none;
}

.session .time {
  font-size: 1.5em;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: text-bottom;
}

section {
  background-color: var(--black);
  height: 100%;
  color: var(--white);
}

section .title {
  text-align: center;
  line-height: 100px;
  font-size: 0.5em;
  mix-blend-mode: color-burn;
}
section .time {
  text-align: center;
  font-size: 0.6em;
  mix-blend-mode: difference;
}
section .timer {
  margin: 0 auto;
  text-align: center;
  width: 200px;
  height: 200px;
  font-size: 4em;
  border: 2px solid var(--green);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 20;
  overflow: hidden;
}

section .timer:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  z-index: 2;
  border: 4px solid var(--black);
}

section .fill {
  content: "";
  position: absolute;
  background: var(--green);
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}
</style>

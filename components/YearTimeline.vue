<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-11-10 11:07:21
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-11-10 16:34:04
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref, watchEffect, onBeforeUnmount } from "vue";
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
  widgetConfig?: {
    [index: string]: any;
  };
}
// 从父组件读取配置
const props = defineProps<Props>();
const daysPassed = ref(0);
const today = new Date();
const startOfYear = new Date(today.getFullYear(), 0, 0);
const month = today.getMonth();

const day = today.getDate();
const week = getChineseWeekday();
const diff = today - startOfYear;
daysPassed.value = Math.floor(diff / (1000 * 60 * 60 * 24));

function getChineseWeekday() {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const today = new Date().getDay();
  return weekdays[today];
}
function getNonNumber(number) {
  if (number < 0) {
    return 0;
  }
  if (number >= 3630) {
    return 3600;
  } else {
    return number;
  }
}
</script>

<template>
  <div class="timeline">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -100 3760 200">
      <g class="bars">
        <rect fill="#cfe2f3" x="0" width="310" height="25"></rect>
        <rect fill="#a2b1c9" x="320" width="280" height="25"></rect>
        <rect fill="#76a5af" x="610" width="310" height="25"></rect>
        <rect fill="#93c47d" x="930" width="300" height="25"></rect>
        <rect fill="#6aa84f" x="1240" width="310" height="25"></rect>
        <rect fill="#8fce00" x="1560" width="300" height="25"></rect>
        <rect fill="#f4cccc" x="1870" width="310" height="25"></rect>
        <rect fill="#e06666" x="2190" width="310" height="25"></rect>
        <rect fill="#ffd966" x="2510" width="300" height="25"></rect>
        <rect fill="#f1c232" x="2820" width="310" height="25"></rect>
        <rect fill="#ce7e00" x="3140" width="300" height="25"></rect>
        <rect fill="#eeeeee" x="3450" width="310" height="25"></rect>
        <rect
          fill="red"
          :x="daysPassed * 10 + (month - 1) * 10"
          width="10"
          height="25"
        ></rect>
      </g>
      <g class="labels" style="font-size: 50px" text-anchor="start">
        <text
          fill="#adb5bd"
          :x="getNonNumber(daysPassed * 10 + (month - 1) * 10 - 60)"
          y="-20"
        >
          {{ day }}.{{ week }}
        </text>
        <text fill="#adb5bd" x="0" y="80">January</text>
        <text fill="#adb5bd" x="320" y="80">February</text>
        <text fill="#adb5bd" x="610" y="80">March</text>
        <text fill="#adb5bd" x="930" y="80">April</text>
        <text fill="#adb5bd" x="1240" y="80">May</text>
        <text fill="#adb5bd" x="1560" y="80">June</text>
        <text fill="#adb5bd" x="1870" y="80">July</text>
        <text fill="#adb5bd" x="2190" y="80">August</text>
        <text fill="#adb5bd" x="2510" y="80">September</text>
        <text fill="#adb5bd" x="2820" y="80">October</text>
        <text fill="#adb5bd" x="3140" y="80">November</text>
        <text fill="#adb5bd" x="3450" y="80">December</text>
      </g>
    </svg>
  </div>
</template>

<style>
.timeline {
  position: relative;
  display: block;

  height: 100vh;
}
</style>

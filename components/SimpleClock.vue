<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-13 18:10:06
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-11-14 12:44:46
 * @Description: 
-->
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, reactive } from "vue";
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
  widgetConfig?: {
    [index: string]: any;
  };
}
// 从父组件读取配置
const props = defineProps<Props>();

const now = ref(new Date());
const sec_deg = ref("");
const min_deg = ref("");
const hour_deg = ref("");
let seconds = now.value.getSeconds();
let minutes = now.value.getMinutes() + seconds / 60;
let hours = now.value.getHours() + minutes / 60;

sec_deg.value = "rotate(" + seconds * 6 + "deg)";
min_deg.value = "rotate(" + minutes * 6 + "deg)";
hour_deg.value = "rotate(" + hours * 30 + "deg)";

let timerId: any = null;
onMounted(() => {
  timerId = setInterval(() => {
    now.value = new Date();
    hours = now.value.getHours() % 12;
    minutes = now.value.getMinutes();
    seconds = now.value.getSeconds();
    sec_deg.value = "rotate(" + seconds * 6 + "deg)";
    min_deg.value = "rotate(" + minutes * 6 + "deg)";
    hour_deg.value = "rotate(" + hours * 30 + "deg)";
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timerId);
});
</script>
<template>
  <div class="sub-container">
    <div class="wrap">
      <ul id="list">
        <li style="transform: rotate(0deg)"></li>
        <li></li>
        <li style="transform: rotate(6deg)"></li>
        <li></li>
        <li style="transform: rotate(12deg)"></li>
        <li></li>
        <li style="transform: rotate(18deg)"></li>
        <li></li>
        <li style="transform: rotate(24deg)"></li>
        <li></li>
        <li style="transform: rotate(30deg)"></li>
        <li></li>
        <li style="transform: rotate(36deg)"></li>
        <li></li>
        <li style="transform: rotate(42deg)"></li>
        <li></li>
        <li style="transform: rotate(48deg)"></li>
        <li></li>
        <li style="transform: rotate(54deg)"></li>
        <li></li>
        <li style="transform: rotate(60deg)"></li>
        <li></li>
        <li style="transform: rotate(66deg)"></li>
        <li></li>
        <li style="transform: rotate(72deg)"></li>
        <li></li>
        <li style="transform: rotate(78deg)"></li>
        <li></li>
        <li style="transform: rotate(84deg)"></li>
        <li></li>
        <li style="transform: rotate(90deg)"></li>
        <li></li>
        <li style="transform: rotate(96deg)"></li>
        <li></li>
        <li style="transform: rotate(102deg)"></li>
        <li></li>
        <li style="transform: rotate(108deg)"></li>
        <li></li>
        <li style="transform: rotate(114deg)"></li>
        <li></li>
        <li style="transform: rotate(120deg)"></li>
        <li></li>
        <li style="transform: rotate(126deg)"></li>
        <li></li>
        <li style="transform: rotate(132deg)"></li>
        <li></li>
        <li style="transform: rotate(138deg)"></li>
        <li></li>
        <li style="transform: rotate(144deg)"></li>
        <li></li>
        <li style="transform: rotate(150deg)"></li>
        <li></li>
        <li style="transform: rotate(156deg)"></li>
        <li></li>
        <li style="transform: rotate(162deg)"></li>
        <li></li>
        <li style="transform: rotate(168deg)"></li>
        <li></li>
        <li style="transform: rotate(174deg)"></li>
        <li></li>
        <li style="transform: rotate(180deg)"></li>
        <li></li>
        <li style="transform: rotate(186deg)"></li>
        <li></li>
        <li style="transform: rotate(192deg)"></li>
        <li></li>
        <li style="transform: rotate(198deg)"></li>
        <li></li>
        <li style="transform: rotate(204deg)"></li>
        <li></li>
        <li style="transform: rotate(210deg)"></li>
        <li></li>
        <li style="transform: rotate(216deg)"></li>
        <li></li>
        <li style="transform: rotate(222deg)"></li>
        <li></li>
        <li style="transform: rotate(228deg)"></li>
        <li></li>
        <li style="transform: rotate(234deg)"></li>
        <li></li>
        <li style="transform: rotate(240deg)"></li>
        <li></li>
        <li style="transform: rotate(246deg)"></li>
        <li></li>
        <li style="transform: rotate(252deg)"></li>
        <li></li>
        <li style="transform: rotate(258deg)"></li>
        <li></li>
        <li style="transform: rotate(264deg)"></li>
        <li></li>
        <li style="transform: rotate(270deg)"></li>
        <li></li>
        <li style="transform: rotate(276deg)"></li>
        <li></li>
        <li style="transform: rotate(282deg)"></li>
        <li></li>
        <li style="transform: rotate(288deg)"></li>
        <li></li>
        <li style="transform: rotate(294deg)"></li>
        <li></li>
        <li style="transform: rotate(300deg)"></li>
        <li></li>
        <li style="transform: rotate(306deg)"></li>
        <li></li>
        <li style="transform: rotate(312deg)"></li>
        <li></li>
        <li style="transform: rotate(318deg)"></li>
        <li></li>
        <li style="transform: rotate(324deg)"></li>
        <li></li>
        <li style="transform: rotate(330deg)"></li>
        <li></li>
        <li style="transform: rotate(336deg)"></li>
        <li></li>
        <li style="transform: rotate(342deg)"></li>
        <li></li>
        <li style="transform: rotate(348deg)"></li>
        <li></li>
        <li style="transform: rotate(354deg)"></li>
        <li></li>
      </ul>
      <!-- 刻度容器 -->
      <ul id="nub">
        <li style="transform: rotate(0deg)">
          <span style="transform: rotate(0deg)"> 12 </span>
        </li>
        <li style="transform: rotate(30deg)">
          <span style="transform: rotate(-30deg)"> 1 </span>
        </li>
        <li style="transform: rotate(60deg)">
          <span style="transform: rotate(-60deg)"> 2 </span>
        </li>
        <li style="transform: rotate(90deg)">
          <span style="transform: rotate(-90deg)"> 3 </span>
        </li>
        <li style="transform: rotate(120deg)">
          <span style="transform: rotate(-120deg)"> 4 </span>
        </li>
        <li style="transform: rotate(150deg)">
          <span style="transform: rotate(-150deg)"> 5 </span>
        </li>
        <li style="transform: rotate(180deg)">
          <span style="transform: rotate(-180deg)"> 6 </span>
        </li>
        <li style="transform: rotate(210deg)">
          <span style="transform: rotate(-210deg)"> 7 </span>
        </li>
        <li style="transform: rotate(240deg)">
          <span style="transform: rotate(-240deg)"> 8 </span>
        </li>
        <li style="transform: rotate(270deg)">
          <span style="transform: rotate(-270deg)"> 9 </span>
        </li>
        <li style="transform: rotate(300deg)">
          <span style="transform: rotate(-300deg)"> 10 </span>
        </li>
        <li style="transform: rotate(330deg)">
          <span style="transform: rotate(-330deg)"> 11 </span>
        </li>
      </ul>
      <!-- 数字容器 -->
      <div class="dot"></div>
      <!-- 中心圆点 -->
      <div class="hour-hand hand" :style="{ transform: hour_deg }"></div>
      <!-- 时针 -->
      <div class="min-hand hand" :style="{ transform: min_deg }"></div>
      <!-- 分针 -->
      <div class="sec-hand hand" :style="{ transform: sec_deg }"></div>
      <!-- 秒针 -->
    </div>
  </div>
</template>
<style scoped>
.wrap {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}
#list li {
  width: 2px;
  height: 8px;
  background-color: #747474;
  position: absolute;
  left: 99px;
  top: 0;
  transform-origin: center 100px;
}
#list li:nth-child(5n + 1) {
  height: 16px;
}
.dot {
  width: 6px;
  height: 6px;
  background-color: #747474;
  border-radius: 50%;
  position: absolute;
  left: 97px;
  top: 97px;
}
.hand {
  width: 4px;
  position: absolute;
  left: 98px;
  border-radius: 20px;
  transform-origin: bottom;
}
.hour-hand {
  height: 30px;
  top: 70px;
  background-color: #747474;
}
.min-hand {
  height: 45px;
  top: 55px;
  background-color: #747474;
}
.sec-hand {
  width: 2px;
  height: 65px;
  left: 99px;
  top: 35px;
  background-color: #747474;
}
#nub li {
  position: absolute;
  left: 96px;
  top: 16px;
  transform-origin: center 84px;
  color: #9b9b9b;
}
#nub li span {
  display: block;
  transform-origin: center center;
}
</style>

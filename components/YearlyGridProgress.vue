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
const _now = ref(new Date());

const days = ref(0);
const passdays = ref(0);

let Days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let now_date = _now.value;
let cur_month = now_date.getMonth() + 1;
let cur_d = now_date.getDate();
//月
let now_year = now_date.getFullYear();
let year_days = 365;
if (now_year % 4 === 0 && now_year % 100 != 0) {
  // 闰年
  Days[2] = 29;
  year_days = 366;
}
let sum = 0;
const startOfYear = new Date(now_date.getFullYear(), 0, 1); // 当前年份的第一天
const diffInMs = now_date.getTime() - startOfYear.getTime(); // 计算毫秒数差值
const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1; // 转换为天数并取整

let percent = ((diffInDays * 100) / year_days).toFixed(1);
</script>
<template>
  <div class="sub-container">
    <div class="left" id="ceils">
      <div
        v-for="(month, index) in 12"
        :key="index"
        class="row"
        :class="'row-' + month"
      >
        <span
          v-for="n in Days[month]"
          :key="n"
          :class="{
            ceil: true,
            past: cur_month > month || (cur_month === month && n < cur_d),
            today: n === cur_d && month === cur_month,
            future: cur_month < month,
          }"
        ></span>
      </div>
    </div>
    <div class="right">
      <p id="date">{{ `${now_year}/${cur_month}/${cur_d}` }}</p>
      <h2 id="percent">{{ percent }}<em>%</em></h2>
      <p id="days">{{ `${diffInDays}/${year_days}` }}</p>
    </div>
  </div>
</template>
<style scoped>
p {
  font-size: 16px; /* 0.32rem * 54px */
  margin: 0;
  line-height: 1.2;
}

.sub-container {
  font-size: 12px;

  box-sizing: border-box;
  padding: 1.92vw; /* 0.266667rem * 54px */
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.right {
  text-align: right;
  color: #747474;
}

.row {
  height: auto;
  line-height: 1;
}

.ceil {
  display: inline-block;
  width: 8px; /* 0.2rem * 54px */
  height: 8px; /* 0.2rem * 54px */
  background: #b0b0b0;
  margin-right: 0.28vw; /* 0.04rem * 54px */
  cursor: pointer;
  opacity: 0.2;
}

.ceil.past {
  background: #747474;
  opacity: 1;
}

.ceil.today {
  background: teal;
  opacity: 1;
}

#percent {
  font-size: 25.92px; /* 0.48rem * 54px */
  margin: 7.2px 0; /* 0.133333rem * 54px */
}

#percent em {
  font-style: normal;
  font-size: 17.28px; /* 0.32rem * 54px */
}

#container.dark .ceil {
  background-color: rgba(255, 255, 255, 0.03);
}
#container.dark .ceil.past {
  background-color: rgb(255, 255, 255, 1);
}
#container.dark .ceil.today {
  background-color: teal;
}
#container.dark #percent {
  color: rgb(255, 255, 255, 1);
}
</style>

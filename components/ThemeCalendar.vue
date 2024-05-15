<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-13 18:10:06
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-11-08 20:56:43
 * @Description: 
-->
<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";

import tinycolor from "tinycolor2";
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
  widgetConfig: {
    [index: string]: any;
  };
}
// 从父组件读取配置
const props = defineProps<Props>();
const themeColor_B = ref(""); //basic
const themeColor_L = ref(""); //light
const themeColor_D = ref(""); //dark
const themeStyle = ref("");
const daysArr = ref();

const WEEKS_F = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKS_zh = ["一", "二", "三", "四", "五", "六", "日"];
//const NUMBERS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_zh = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const weekDayLabels = WEEKS_zh;
const nums = NUMBERS;
const months = MONTHS_zh;

const startSunday = ref(false); // 是否以周日为每周第一天

const reorderedWeekDayLabels = computed(() => {
  const startIndex = startSunday.value ? 6 : 0;
  const firstPart = weekDayLabels.slice(startIndex);
  const secondPart = weekDayLabels.slice(0, startIndex);
  return firstPart.concat(secondPart);
});
const yearHtml = ref(""); // 年份 HTML
const term = ref(""); // 节气
const lunar = ref(""); // 农历日期
const month = computed(() => months[curMonth.value - 1]); // 当前月份名称
const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const curDate = new Date();
let _year = curDate.getFullYear();
if (_year % 4 === 0 && _year % 100 != 0) {
  // 闰年
  days[2] = 29;
}
const curMonth = ref(curDate.getMonth() + 1);
const curDay = ref(curDate.getDate());

let lunarDate: unknown;

let monthFirstDay;
let firstDay;
watchEffect(() => {
  props.widgetConfig["is-sunday"] == "True"
    ? (startSunday.value = true)
    : (startSunday.value = false);
  const themeColor = props.widgetConfig["theme-color"];
  themeColor_B.value = themeColor;
  themeColor_L.value = tinycolor(themeColor_B.value)
    .lighten(35)
    .brighten(10)
    .toString();
  themeColor_D.value = tinycolor(themeColor_B.value)
    .brighten(25)
    .setAlpha(0.3)
    .toString();
  themeStyle.value = props.widgetConfig["select-theme"]
    ? props.widgetConfig["select-theme"]
    : "fruit";

  lunarDate = calendar.solar2lunar(_year, curMonth.value, curDay.value);

  monthFirstDay = new Date(_year, curMonth.value - 1, 1);
  firstDay = startSunday.value
    ? monthFirstDay.getDay() + 1
    : monthFirstDay.getDay() || 7;
  console.log(firstDay, "firstDay");
  daysArr.value = getDaysArr(firstDay, days[curMonth.value], themeStyle.value);
});
function getRandNum(n: number, m: number) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function getDaysArr(firstDay: number, daysCount: number, themeStyle: string) {
  const arr = [];
  let curDateNum = 1;
  let dayId = 0;
  for (let i = 0; i < 6; i++) {
    const weekDays = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay - 1) {
        weekDays.push({ num: "", id: dayId++ });
      } else if (curDateNum <= daysCount) {
        const curWeekDay = (j + (startSunday.value ? 0 : 1)) % 7;
        weekDays.push({
          num: getNum(curDateNum),
          id: dayId++,
          isToday: curDateNum === curDay.value,
          isWeekend: curWeekDay === 0 || curWeekDay === 6,
          isPastDay: curDateNum < curDay.value,
          passClass: `pass`,
          background: `url(/assets/${themeStyle}/${themeStyle}-${getRandNum(
            1,
            20
          )}.png) center center / 80% 80% no-repeat`,
        });

        curDateNum++;
      } else {
        weekDays.push({ num: "", id: dayId++ });
      }
    }
    arr.push(weekDays);
    if (curDateNum > daysCount) break;
  }
  return arr;
}

function getNum(num: number, format = true) {
  num = parseInt(num.toString());
  let num1,
    num2 = [];
  if (num === 0) {
    num2.push("0");
  }
  while (num) {
    num1 = num % 10;
    num2.push(nums[num1]);
    num = parseInt((num / 10).toString());
  }

  //if (format && num2.length === 1) num2.push(nums[0]); 个位数是否补零
  num2.reverse();
  return num2.join("");
}

function dayClass(day: {
  num: string;
  id: number;
  isToday: boolean;
  isWeekend: boolean;
  isPastDay: boolean;
  passClass: string;
  background: string;
}) {
  const classes = [];
  if (day.isToday) {
    classes.push("active");
  } else if (day.isPastDay) {
    classes.push("pass", day.passClass);
  }
  if (day.isWeekend) {
    classes.push("weekend");
  }
  return classes.join(" ");
}

onMounted(() => {
  yearHtml.value = _year
    .toString()
    .split("")
    .map((num) => `<span>${getNum(Number(num), false)}</span>`)
    .join("");

  term.value = lunarDate.isTerm ? lunarDate.Term : "";
  lunar.value = `${lunarDate.gzYear}${lunarDate.IMonthCn}${lunarDate.IDayCn}`;
});
</script>
<template>
  <div class="sub-container">
    <div class="inner">
      <div class="header">
        <div id="year" v-html="yearHtml"></div>
        <div>
          <h2 id="month">{{ month }}</h2>
          <p class="extra">
            <span id="term">{{ term }}</span
            ><span id="lunar">{{ lunar }}</span>
          </p>
        </div>
      </div>
      <div class="days"></div>
      <div class="week-days head" id="week-head">
        <span v-for="(label, index) in reorderedWeekDayLabels" :key="index">{{
          label
        }}</span>
      </div>
      <div id="content">
        <div
          class="week-days"
          v-for="(weekDays, index) in daysArr"
          :key="index"
          :id="`week-days_${index}`"
        >
          <span
            v-for="(day, dayIndex) in weekDays"
            :key="dayIndex"
            :id="`d-${day.id}`"
            :class="dayClass(day)"
            :style="{ background: day.isPastDay ? day.background : '' }"
          >
            {{ day.isPastDay ? "" : day.num }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container .sub-container {
  width: 100%;
}
@media (max-width: 320px) {
  div.sub-container {
    width: 220px;
    transform: scale3d(0.82, 0.82, 1);
    transform-origin: 25% 10%;
  }
}
.sub-container {
  position: relative;
  width: 250px;
  padding: 10px 20px;
  margin: 0 auto;
  text-align: center;
  /* border: 1px solid #333333; */
  border-radius: 10px;
  background-color: v-bind(themeColor_L);
  color: v-bind(themeColor_B);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

#month {
  font-weight: bold;
  font-size: 28px;
  color: v-bind(themeColor_B);
  text-align: right;
  margin: 0;
  /* display: flex;
        align-items: center;
        justify-content: space-between; */
}

.week-days {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
.week-days.head {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}
.week-days.week {
  margin-bottom: 3px;
}
.week-days span {
  line-height: 30px;
  font-size: 14px;
  width: 30px;
  height: 30px;
  display: inline-block;
  text-align: center;
}
.pass {
  /* background-color: rgba(0, 0, 0, 0.7); */
  border-radius: 50%;
  color: #ffffff;
  background-size: 80% 80%;
}
.pass.pass-1 {
  background: v-bind(themeStyle) no-repeat center;
  background-size: 80% 80%;
}

.active {
  background-color: v-bind(themeColor_B);
  border-radius: 50%;
  color: v-bind(themeColor_L);
  /* background: url(../assets/flowus/pink.png); */
  background-size: 100% 100%;
}

.week-days .active {
  font-size: 18px;
}

.weekend {
  background-color: v-bind(themeColor_D);
  border-radius: 50%;
}
.weekend.pass {
  background-color: unset;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
#lunar {
  margin: 0;
  border-radius: 2px;
  background-color: v-bind(themeColor_D);
  padding: 0 6px;
  border-radius: 30px;
}
#year {
  font-weight: bold;
  font-size: 22px;
  color: v-bind(themeColor_L);
  margin-left: 10px;
  line-height: 30px;
}
:deep(#year > span) {
  display: inline-block;
  background-color: v-bind(themeColor_B);
  width: 30px;
  height: 30px;
  border-radius: 30px;
  list-style: 30px;
  margin-left: -10px;
}
.extra {
  margin: 0;
  font-size: 14px;
}
.extra #term {
  margin-right: 10px;
}
.mark {
  position: absolute;
  opacity: 0.05;
  bottom: 0;
  right: 10px;
}
</style>

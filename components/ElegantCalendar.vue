<script setup lang="ts">
import { onMounted, ref, watchEffect, computed } from "vue";
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
  widgetConfig?: {
    [index: string]: any;
  };
}
// 从父组件读取配置
const props = defineProps<Props>();

const grid = ref([]);

const curDate = new Date();
const _year = ref(curDate.getFullYear());
const month = ref(curDate.getMonth() + 1);
const day = ref(curDate.getDate());
const selectedDay = ref();

function drawHeader(e) {
  if (e) {
    day.value = e;
  }
}

function clickDay(day) {
  day.selected = true;
  selectedDay.value = day.date;
  console.log(selectedDay.value);
  localStorage.setItem("ElegantCalendar-selectedDay", selectedDay.value);
  drawHeader(selectedDay.value.getDate());

  lunarDate.value = calendar.solar2lunar(
    day.date.getFullYear(),
    String(month.value),
    day.num
  );
}

function preMonth() {
  if (month.value < 2) {
    month.value = 12;
    _year.value = _year.value - 1;
  } else {
    month.value = month.value - 1;
  }
  drawHeader(day.value);
  drawHeader(1);
  daysArr.value = getDaysArr(firstDay.value, days[month.value]);
}

function nextMonth() {
  if (month.value >= 12) {
    month.value = 1;
    _year.value = _year.value + 1;
  } else {
    month.value = month.value + 1;
  }
  drawHeader(1);
  daysArr.value = getDaysArr(firstDay.value, days[month.value]);
}

function reset() {
  month.value = curDate.getMonth() + 1;
  _year.value = curDate.getFullYear();
  day.value = curDate.getDate();
}

function isSelected(cell) {
  const selected = localStorage.getItem("ElegantCalendar-selectedDay");

  if (selected) {
    selectedDay.value = new Date(selected);
  }

  if (cell.date && selectedDay.value) {
    return (
      month.value === selectedDay.value.getMonth() + 1 &&
      _year.value === selectedDay.value.getFullYear() &&
      cell.date.getTime() === selectedDay.value.getTime()
    );
  }
  return false;
}
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

const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

if (_year.value % 4 === 0 && _year.value % 100 != 0) {
  // 闰年
  days[2] = 29;
}
const curMonth = ref(curDate.getMonth() + 1);
const curDay = ref(curDate.getDate());

const lunarDate = ref();

const daysArr = ref();
const monthFirstDay = ref();
const firstDay = ref();
watchEffect(() => {
  props.widgetConfig["is-sunday"] == "True"
    ? (startSunday.value = true)
    : (startSunday.value = false);

  lunarDate.value = calendar.solar2lunar(
    String(_year.value),
    String(curMonth.value),
    String(curDay.value)
  );

  monthFirstDay.value = new Date(_year.value, month.value - 1, 1);
  firstDay.value = startSunday.value
    ? monthFirstDay.value.getDay() + 1
    : monthFirstDay.value.getDay() || 7;

  daysArr.value = getDaysArr(firstDay.value, days[curMonth.value]);
});

function getDaysArr(firstDay: number, daysCount: number) {
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
          iscurDate:
            curDate.getFullYear() == _year.value &&
            curMonth.value == month.value &&
            curDateNum === curDay.value,
          isWeekend: curWeekDay === 0 || curWeekDay === 6,
          isPastDay:
            curDateNum < curDay.value &&
            curDate.getFullYear() == _year.value &&
            curMonth.value == month.value,
          passClass: `pass`,
          selected: false,
          date: new Date(_year.value, month.value - 1, curDateNum),
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

function dayClass(day) {
  const classes = [];

  if (day.iscurDate) {
    classes.push("active");
  } else if (day.isPastDay) {
    classes.push("pass", day.passClass);
  }
  if (day.isWeekend) {
    classes.push("weekend");
  }
  if (isSelected(day)) {
    classes.push("selected");
  }
  return classes.join(" ");
}

onMounted(() => {
  yearHtml.value = _year.value
    .toString()
    .split("")
    .map((num) => `<span>${getNum(Number(num), false)}</span>`)
    .join("");
});
const term = computed(() =>
  lunarDate.value.isTerm ? lunarDate.value.Term : ""
); //节气
const lunar = computed(
  () =>
    `${lunarDate.value.gzYear} ${lunarDate.value.IMonthCn}${lunarDate.value.IDayCn}`
); //农历日期
</script>
<template>
  <div class="elegant-calencar">
    <p id="reset" @click="reset">今天</p>
    <div id="header" class="clearfix">
      <div class="pre-button" @click="preMonth">&lt;</div>
      <div class="head-info">
        <div class="head-day">{{ day }}</div>
        <div class="head-lunar">{{ term }} {{ lunar }}</div>

        <div class="head-month">{{ months[month - 1] }} - {{ _year }}</div>
      </div>
      <div class="next-button" @click="nextMonth">&gt;</div>
    </div>
    <table id="calendar">
      <thead>
        <tr>
          <th v-for="(label, index) in reorderedWeekDayLabels" :key="index">
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(weekDays, index) in daysArr" :key="index">
          <td
            v-for="(day, dayIndex) in weekDays"
            :key="dayIndex"
            @click="clickDay(day)"
            :class="dayClass(day)"
          >
            {{ day.num }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
body {
  font-size: 100%;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1.5;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-spacing: 2px;
}
.clearfix:before,
.clearfix:after {
  content: " "; /* 1 */
  display: table; /* 2 */
}

.clearfix:after {
  clear: both;
}
/**
 * For IE 6/7 only
 * Include this rule to trigger hasLayout and contain floats.
 */
.clearfix {
  *zoom: 1;
}
a,
a:hover {
  text-decoration: none;
}
.img-responsive {
  max-width: 100%;
  height: auto;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  --calendar-width: 15em;
}

.elegant-calencar {
  width: var(--calendar-width);
  height: calc(var(--calendar-width) / 0.65);

  -webkit-box-shadow: 0 0 5px #8d8d8d;
  box-shadow: 0 0 5px #8d8d8d;
  text-align: center;
  margin: 4em auto;
  position: relative;
  background: aliceblue;
}

#header {
  font-family: "HelveticaNeue-UltraLight", "Helvetica Neue UltraLight",
    "Helvetica Neue", Arial, Helvetica, sans-serif;
  height: calc(var(--calendar-width) / 5 * 3);
  background-color: #2a3246;
  margin-bottom: calc(var(--calendar-width) / 25);
}

.pre-button,
.next-button {
  margin-top: 50px;

  font-size: calc(var(--calendar-width) / 8.2);
  -webkit-transition: -webkit-transform 0.5s;
  transition: transform 0.5s;
  cursor: pointer;
  width: 1em;
  height: 1em;
  line-height: calc(var(--calendar-width) / 25);
  color: #e66b6b;
  border-radius: 50%;
}

.pre-button:hover,
.next-button:hover {
  -webkit-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  transform: rotate(360deg);
}

.pre-button:active,
.next-button:active {
  -webkit-transform: scale(0.7);
  -ms-transform: scale(0.7);
  transform: scale(0.7);
}

.pre-button {
  float: left;
  margin-left: 0.5em;
}

.next-button {
  float: right;
  margin-right: 0.5em;
}

.head-info {
  float: left;
  width: calc(var(--calendar-width) / 5 * 3);
}

.head-day {
  margin-top: 30px;
  font-size: calc(var(--calendar-width) / 4.2);
  line-height: 1;
  color: #fff;
}

.head-month {
  margin-top: 2.5px;

  font-size: calc(var(--calendar-width) / 12.5);
  line-height: 1;
  color: #fff;
}
.head-lunar {
  color: #747474;
}
#calendar {
  width: 90%;
  margin: 0 auto;
}

#calendar tr {
  height: auto;
  line-height: 1.8em;
}

thead tr {
  color: #e66b6b;
  font-weight: 700;
  text-transform: uppercase;
}

tbody tr {
  color: #252a25;
}

tbody td {
  width: 14%;
  border-radius: 50%;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

tbody td:hover,
.selected,
.weekend.selected {
  color: #fff;
  background-color: #2a3246;
  border: none;
}

tbody td:active {
  -webkit-transform: scale(0.7);
  -ms-transform: scale(0.7);
  transform: scale(0.7);
}

.active,
.active.weekend {
  background-color: #e66b6b;
  color: #fff;
  font-family: serif;
  border-radius: 50%;
}
.weekend {
  background-color: #fd9f9f24;
}
.weekend.pass:not(.selected) {
  background-color: unset;
}
#disabled {
  cursor: default;
  background: #fff;
}

#disabled:hover {
  background: #fff;
  color: #c9c9c9;
}

#reset {
  display: block;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  z-index: 999;
  color: #959595;
  font-family: serif;
  cursor: pointer;
  padding: 0 0.5em;
  height: 1.5em;
  border: 0.1em solid #606060;
  border-radius: 4px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#reset:hover {
  color: #e66b6b;
  border-color: #e66b6b;
}

#reset:active {
  -webkit-transform: scale(0.8);
  -ms-transform: scale(0.8);
  transform: scale(0.8);
}
</style>

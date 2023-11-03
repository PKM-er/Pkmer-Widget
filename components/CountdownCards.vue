<script setup lang="ts">
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
import { onMounted, ref, watchEffect, onBeforeUnmount, nextTick } from "vue";
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
const week_ZN = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

const start_p = ref(props.widgetConfig?.["date-picker"]);

const days = ref(0);

const _now = ref(new Date().getTime());
const dateString = ref("");
const weekdayString = ref("");
const displayValue = ref("");
const textValue = ref("");
const isEditing = ref(false);
const inputRef = ref<HTMLElement | null>(null);
const inputDateRef = ref<HTMLElement | null>(null);
const selectedDate = ref("");
const showPicker = ref(false);
const themeColor_B = ref(""); //basic
const themeColor_L = ref(""); //light
const themeColor_D = ref(""); //dark

const handleClickDate = () => {
  showPicker.value = true;
  nextTick(function () {
    inputDateRef.value?.focus();
  });
};
const handleClick = () => {
  isEditing.value = true;
  nextTick(function () {
    inputRef.value?.focus();
  });
};

const handleBlur = () => {
  localStorage.setItem("CountdownCards-textValue", textValue.value);
  isEditing.value = false;
};
const handleBlurDate = () => {
  localStorage.setItem("CountdownCards-selectedDate", selectedDate.value);
  showPicker.value = false;
};

watchEffect(() => {
  const themeColor = props.widgetConfig["theme-color"];
  themeColor_B.value = themeColor;

  themeColor_L.value = tinycolor(themeColor_B.value).lighten(20).toString();
  themeColor_D.value = tinycolor(themeColor_B.value).darken(15).toString();
  displayValue.value = props.widgetConfig["input-text"];

  if (textValue.value) {
    displayValue.value = textValue.value;
  }

  start_p.value = props.widgetConfig?.["date-picker"];

  // 设置时间

  let myDate;
  if (selectedDate.value) {
    myDate = new Date(selectedDate.value);
  } else myDate = new Date(start_p.value);

  let times = myDate.getTime() - _now.value;
  days.value = Math.floor(times / 1000 / 60 / 60 / 24);

  const dayOfWeek = myDate.getDay();
  weekdayString.value = week_ZN[dayOfWeek];
  dateString.value = myDate
    .toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace("/", "-")
    .replace("/", "-");
});
let timerId: any = null;
onMounted(() => {
  const storedValue = localStorage.getItem("CountdownCards-textValue");
  if (storedValue) {
    textValue.value = storedValue;
  }
  const storedSelectedDate = localStorage.getItem(
    "CountdownCards-selectedDate"
  );
  if (storedSelectedDate) {
    selectedDate.value = storedSelectedDate;
  }
  timerId = setInterval(() => {
    _now.value = new Date().getTime();
  }, 86400000);
});

onBeforeUnmount(() => {
  clearInterval(timerId);
});
</script>
<template>
  <div class="sub-container">
    <div class="days-box">
      <div
        class="head"
        id="title"
        :style="{
          backgroundColor: themeColor_B,
        }"
      >
        <input
          ref="inputRef"
          v-if="isEditing"
          v-model="textValue"
          @blur="handleBlur"
        />
        <span v-if="!isEditing && days > 0" @click="handleClick">
          {{ displayValue }}还剩</span
        >
        <span v-if="!isEditing && days <= 0" @click="handleClick">
          {{ displayValue }}已过</span
        >
      </div>
      <div class="content" id="number">{{ Math.abs(days) }}</div>

      <div
        v-if="!showPicker && days > 0"
        class="bottom"
        id="date"
        @click="handleClickDate"
      >
        目标日：{{ dateString }} {{ weekdayString }}
      </div>
      <div
        v-if="!showPicker && days <= 0"
        class="bottom"
        id="date"
        @click="handleClickDate"
      >
        起始日：{{ dateString }} {{ weekdayString }}
      </div>
      <input
        ref="inputDateRef"
        type="date"
        v-if="showPicker"
        id="date-input"
        @blur="handleBlurDate"
        v-model="selectedDate"
      />
    </div>
  </div>
</template>
<style scoped>
input {
  width: 80%;
  padding-left: 4px;
  margin: auto;
  border: 1px solid #8b8b8b;
  border-radius: 8px;
  line-height: 24px;
  font-size: 14px;
  color: #f9f9f9;
  background: #747474;
}
.sub-container {
  width: min(95vw, 280px);

  margin: auto;
}

.days-box {
  margin: 0 auto;
  border-radius: 0 0 10px 10px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;
  background-color: #ffffff;
  text-align: center;
  position: relative;
}
.days-box:before {
  left: 13px;
}
.days-box:after {
  right: 13px;
}
.days-box:before,
.days-box:after {
  content: "";
  position: absolute;
  top: -7px;
  width: 4px;
  height: 14px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#f1f1f1),
    to(rgb(177, 172, 172))
  );
}
.head {
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: #333333;
  color: #ffffff;
  font-size: 18px;
  line-height: 50px;
}
.content {
  width: 100%;

  font-size: 72px;
  color: #333333;
  font-weight: bold;
  font-family: monospace;
  text-align: center;

  border-bottom: 1px dashed #eeeeee;
}
.bottom {
  background-color: #f9f9f9;
  color: #999999;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
</style>

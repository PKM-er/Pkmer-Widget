<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-13 18:10:06
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-11-03 22:03:52
 * @Description: 
-->
<script setup lang="ts">
import axios from "axios";
import tinycolor from "tinycolor2";
import { ref, watchEffect } from "vue";
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
interface ListItem {
  year: string;
  title: string;
  festival: string;
  link: string;
  type: string;
  desc: string;
  cover: boolean;
  recommend: boolean;
}
watchEffect(() => {
  const themeColor = props.widgetConfig["theme-color"];
  themeColor_B.value = themeColor;
  themeColor_L.value = tinycolor(themeColor_B.value)
    .darken(15)
    .greyscale()
    .toString();
  themeColor_D.value = tinycolor(themeColor_B.value)
    .darken(35)
    .brighten(20)
    .toString();
});
const list = ref<ListItem[]>([]);
const today = new Date();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");
const year = today.getFullYear();

const currentDate = `${year}/${month}/${day}`;

const getHisToday = async (month: string, day: string) => {
  const dateStr = `${month}${day}`;
  const todayList = localStorage.getItem(`his_${dateStr}`);
  if (todayList) {
    list.value = JSON.parse(todayList);
    return;
  }
  try {
    const res = await axios.get(
      `https://baike.baidu.com/cms/home/eventsOnHistory/${month}.json`
    );
    formatData(res.data[month]);
  } catch (error) {
    console.error(error);
  }
};

const formatData = (data: { [x: string]: any }) => {
  const dateStr = `${month}${day}`;
  const historyList = data[dateStr];
  list.value = historyList.reverse();
  localStorage.setItem(`his_${dateStr}`, JSON.stringify(historyList));
};

getHisToday(month, day);
</script>
<template>
  <div class="sub-container" id="root" v-cloak>
    <h2>
      <em>-</em><span id="date">{{ currentDate }}</span
      ><em>-</em>
    </h2>
    <ul class="inner" id="list">
      <div class="item" v-for="item in list" :key="item.year">
        <p>{{ item.year }}</p>
        <div class="content" v-html="item.title"></div>
      </div>
    </ul>
  </div>
</template>
<style scoped>
.sub-container {
  padding: 4.8vw;
}

h2 {
  color: v-bind(themeColor_B);
  text-align: center;
  margin: 0;
  margin-bottom: 4.8vw;
  font-family: cursive;
  font-size: min(20px, 6vw);
}

h2 em {
  margin: 14.4px;
}

.inner {
  font-size: min(14px, 4vw);
  color: v-bind(themeColor_L);
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

.item {
  padding-left: 32px;
  padding-bottom: 10px;
  position: relative;
  z-index: 1;
}

.item p {
  color: v-bind(themeColor_D);
  font-size: min(18px, 4vw);
  line-height: min(18px, 4vw);
  margin: 0;
  margin-bottom: 5px;
}

.item::before {
  content: "";
  background-color: #d3d3d3;
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  left: 0;
  top: 1px;
}

.item:nth-child(2n + 1)::before {
  background: v-bind(themeColor_D);
}

.item::after {
  content: "";
  width: 2px;
  height: 100%;
  background: #e4e7ed;
  position: absolute;
  left: 6px;
  top: 0.767vw;
  z-index: -1;
}

.item:last-child::after {
  display: none;
}

.item a {
  color: unset;
  text-decoration: none;
}
</style>

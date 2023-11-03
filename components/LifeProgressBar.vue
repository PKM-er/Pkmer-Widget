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
const days = ref(0);
const birthday = ref(0);
watchEffect(() => {
  birthday.value = props.widgetConfig?.["date-picker"];

  let cur_date = new Date();
  let s_times = cur_date.getTime() - birthday.value; //
  days.value = Math.floor(s_times / (24 * 60 * 60 * 1000));
});
</script>
<template>
  <div class="sub-container">
    <div class="inner">
      <div class="left">
        <div class="hi">Hi</div>
        <div class="info">
          <h3 id="name">{{ props.widgetConfig["input-text"] }}</h3>
          <p id="msg">你来到这个世界已经</p>
        </div>
      </div>
      <div class="right">
        <h1 id="days">{{ days }}</h1>
        <span>天</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1,
h2,
p {
  margin: 0;
  padding: 0;
}

.sub-container {
  width: min(420px, 100%); /* 9.2rem = 497.28px */
  margin: 21.33px auto; /* 0.4rem = 21.33px */
  border-radius: 112px; /* 1.866667rem = 112px */
  background: #f3f3f3;
  box-sizing: border-box;
  padding: 4.27px; /* 0.266667rem = 4.27px */
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left {
  display: inline-flex;
  align-items: center;
}

.hi {
  color: #333333;
  width: min(72px, 15vw); /* 1.333333rem = 72px */
  height: min(72px, 15vw);
  border-radius: 50%;
  background-color: #ffffff;
  text-align: center;
  line-height: min(72px, 15vw);
  font-size: min(28px, 6vw);
  border-radius: 72px; /* 1.333333rem = 72px */
  background: #f3f3f3;

  box-shadow: 0px 4px 4px #e0e0e0, 0px 0px 4px #ffffff;
}

.info {
  margin-left: 21.33px; /* 0.4rem = 21.33px */
  font-size: min(20px, 5vw);
}

.info #name {
  margin: 0;
  color: #333333;
}

.info p {
  color: #999999;
  margin: 0;
  font-size: min(18px, 4vw);
}

.right {
  color: #999999;
  opacity: 0.3;
}

#days {
  display: inline-block;
  font-size: min(64px, 7vw); /* 0.96rem = 51.84px */
  color: #2377a4;
}

#container.dark .sub-container {
  box-shadow: unset;
}
</style>

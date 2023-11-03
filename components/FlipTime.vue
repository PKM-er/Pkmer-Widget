<script setup lang="ts">
import { onMounted, ref, watchEffect, onBeforeUnmount } from "vue";
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
const flip = ref(false);
const hours_ones = ref(0);
const hours_tens = ref(0);
const minute_ones = ref(0);
const second_ones = ref(0);
const minute_tens = ref(0);
const second_tens = ref(0);
// 从父组件读取配置

const themeColor_C = ref(""); //basic
const themeColor_BG = ref(""); //light
const themeColor_B_C = ref(""); //gray
const themeColor_B_BG = ref(""); //dark
const themeColor_Border = ref(""); //dark
const layout = ref("Light"); //
watchEffect(() => {
  layout.value = props.widgetConfig["layout-style"];
  if (layout.value == "Light") {
    //亮色模式
    themeColor_C.value = tinycolor(themeColor_C.value).darken(72).toString();
    themeColor_BG.value = props.widgetConfig["theme-color"];
    themeColor_B_C.value = tinycolor(themeColor_C.value)
      .darken(69)
      .brighten(6)
      .toHexString();
    themeColor_B_BG.value = tinycolor(themeColor_BG.value)
      .brighten(3)
      .toString();
    themeColor_Border.value = "none";
  } else {
    //暗色模式
    themeColor_C.value = props.widgetConfig["theme-color"];
    themeColor_BG.value = tinycolor(themeColor_C.value).darken(72).toString();
    themeColor_B_C.value = tinycolor(themeColor_C.value).brighten(3).toString();
    themeColor_B_BG.value = tinycolor(themeColor_C.value)
      .darken(69)
      .brighten(6)
      .toHexString();
    themeColor_Border.value = "solid 1px " + themeColor_B_BG.value;
  }
});
// 更新时间函数
function updateTime() {
  const now = new Date();
  const hour = now.getHours() % 24 || 12;
  hours_ones.value = hour % 10; // 取个位数
  hours_tens.value = Math.floor(hour / 10); // 取十位数
  const minute = now.getMinutes();
  minute_ones.value = minute % 10; // 取个位数
  minute_tens.value = Math.floor(minute / 10); // 取十位数
  const second = now.getSeconds();

  second_ones.value = second % 10; // 取个位数
  second_tens.value = Math.floor(second / 10); // 取十位数

  flip.value = true; // 每秒切换 flip 类
  setTimeout(() => {
    flip.value = false;
  }, 900);
}
// 在组件挂载时启动计时器
onMounted(() => {
  updateTime(); // 先手动更新一次
  setInterval(updateTime, 1000);
});
</script>
<template>
  <div class="sub-container">
    <div class="row">
      <div class="flipTimemodulesboxes">
        <div class="flipTimebox">
          <div
            class="flipclock1 flip-clock-wrapper"
            :class="props.widgetConfig['select-theme']"
          >
            <span class="flip-clock-divider hours"
              ><span class="flip-clock-label">Hours</span
              ><span class="flip-clock-dot top"></span
              ><span class="flip-clock-dot bottom"></span
            ></span>
            <ul class="flip play">
              <li :class="hours_ones == 0 ? 'flip-clock-before' : ''">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        hours_ones == 0
                          ? Math.max(hours_tens - 1, 0)
                          : hours_tens
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        hours_ones == 0
                          ? Math.max(hours_tens - 1, 0)
                          : hours_tens
                      }}
                    </div>
                  </div></a
                >
              </li>
              <li :class="hours_ones == 0 ? 'flip-clock-active' : ''">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        hours_ones == 0
                          ? hours_tens
                          : Math.max(hours_tens - 1, 0)
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        hours_ones == 0
                          ? hours_tens
                          : Math.max(hours_tens - 1, 0)
                      }}
                    </div>
                  </div></a
                >
              </li>
            </ul>
            <ul class="flip play">
              <li :class="minute_tens == 0 ? 'flip-clock-before' : ' '">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        minute_tens == 0
                          ? Math.max(hours_ones - 1, 0)
                          : hours_ones
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        minute_tens == 0
                          ? Math.max(hours_ones - 1, 0)
                          : hours_ones
                      }}
                    </div>
                  </div></a
                >
              </li>
              <li :class="minute_tens == 0 ? 'flip-clock-active' : ' '">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        minute_tens == 0
                          ? hours_ones
                          : Math.max(hours_ones - 1, 0)
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        minute_tens == 0
                          ? hours_ones
                          : Math.max(hours_ones - 1, 0)
                      }}
                    </div>
                  </div></a
                >
              </li>
            </ul>
            <span class="flip-clock-divider minutes"
              ><span class="flip-clock-label">Minutes</span
              ><span class="flip-clock-dot top"></span
              ><span class="flip-clock-dot bottom"></span
            ></span>
            <ul class="flip play">
              <li :class="minute_ones == 0 ? 'flip-clock-before' : ''">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        minute_ones == 0
                          ? Math.max(minute_tens - 1, 0)
                          : minute_tens
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        minute_ones == 0
                          ? Math.max(minute_tens - 1, 0)
                          : minute_tens
                      }}
                    </div>
                  </div></a
                >
              </li>
              <li :class="minute_ones == 0 ? 'flip-clock-active' : ''">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        minute_ones == 0
                          ? minute_tens
                          : Math.max(minute_tens - 1, 0)
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        minute_ones == 0
                          ? minute_tens
                          : Math.max(minute_tens - 1, 0)
                      }}
                    </div>
                  </div></a
                >
              </li>
            </ul>
            <ul class="flip play">
              <li :class="second_tens == 0 ? 'flip-clock-before' : ' '">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        second_tens == 0
                          ? Math.max(minute_ones - 1, 0)
                          : minute_ones
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        second_tens == 0
                          ? Math.max(minute_ones - 1, 0)
                          : minute_ones
                      }}
                    </div>
                  </div></a
                >
              </li>
              <li :class="second_tens == 0 ? 'flip-clock-active' : ' '">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        second_tens == 0
                          ? minute_ones
                          : Math.max(minute_ones - 1, 0)
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        second_tens == 0
                          ? minute_ones
                          : Math.max(minute_ones - 1, 0)
                      }}
                    </div>
                  </div></a
                >
              </li>
            </ul>
            <span class="flip-clock-divider seconds"
              ><span class="flip-clock-label">Seconds</span
              ><span class="flip-clock-dot top"></span
              ><span class="flip-clock-dot bottom"></span
            ></span>
            <ul class="flip play">
              <li :class="second_ones == 0 ? 'flip-clock-before' : ''">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        second_ones == 0
                          ? Math.max(second_tens - 1, 0)
                          : second_tens
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        second_ones == 0
                          ? Math.max(second_tens - 1, 0)
                          : second_tens
                      }}
                    </div>
                  </div></a
                >
              </li>
              <li :class="second_ones == 0 ? 'flip-clock-active' : ''">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        second_ones == 0
                          ? second_tens
                          : Math.max(second_tens - 1, 0)
                      }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{
                        second_ones == 0
                          ? second_tens
                          : Math.max(second_tens - 1, 0)
                      }}
                    </div>
                  </div></a
                >
              </li>
            </ul>
            <ul class="flip play">
              <li :class="flip ? 'flip-clock-before' : ' '">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{ flip ? Math.max(second_ones - 1, 0) : second_ones }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{ flip ? Math.max(second_ones - 1, 0) : second_ones }}
                    </div>
                  </div></a
                >
              </li>
              <li :class="flip ? 'flip-clock-active' : ' '">
                <a href="#"
                  ><div class="up">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{ flip ? second_ones : Math.max(second_ones - 1, 0) }}
                    </div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">
                      {{ flip ? second_ones : Math.max(second_ones - 1, 0) }}
                    </div>
                  </div></a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- end col -->
  </div>
</template>
<style scoped>
p {
  font-size: 13px;
}

.headingcaption {
  color: #202569;
  text-align: center;
  font-size: 2.3em;
  text-transform: uppercase;
  padding: 40px 20px;
}

.boxtitle {
  width: 100%;
  color: #202569;
  margin: 0;
  text-align: center;
  position: absolute;
  top: -20px;
  z-index: 1;
  font-size: 2em;
}

.boxtitle span {
  background-color: #fff;
  padding-left: 10px;
  padding-right: 10px;
}

.savonatrim {
  background-color: #a10000;
  padding-left: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  margin-top: 20px;
}

.savonabox {
  background-color: #fff;
  color: #000;
  margin-top: 3px;
  padding: 20px;
  font-size: 1.2em;
}

.wyndhamtrim {
  background-color: #a10000;
  padding-left: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  margin-top: 20px;
}

.wyndhambox {
  background-color: #fff;
  color: #000;
  margin-top: 3px;
  padding: 20px;
  font-size: 1.2em;
}

.logocenter {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  padding: 20px 0;
}

.limitfooter {
  font-size: 1.5em;
  color: #000;
  text-align: center;
  padding: 30px 0;
}

#quantity {
  font-size: 1.2em;
  color: #202569;
  font-weight: 600;
  text-align: center;
  padding: 10px 0;
}

#storenearyou {
  font-size: 1.1em;
  color: #202569;
  font-weight: 600;
  text-align: center;
  padding: 10px 0 20px 0;
  text-transform: uppercase;
}

.flip-clock-wrapper * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-clock-wrapper a {
  cursor: pointer;
  text-decoration: none;
  color: #ccc;
}

.flip-clock-wrapper a:hover {
  color: #fff;
}

.flip-clock-wrapper ul {
  list-style: none;
}

.flip-clock-wrapper.clearfix:before,
.flip-clock-wrapper.clearfix:after {
  content: " ";
  display: table;
}

.flip-clock-wrapper.clearfix:after {
  clear: both;
}

.flip-clock-wrapper.clearfix {
  zoom: 1;
}

/* Main */
.flip-clock-wrapper {
  font: normal 10px "Helvetica Neue", Helvetica, sans-serif;
  -webkit-user-select: none;
}

.flip-clock-meridium {
  background: none !important;
  box-shadow: 0 0 0 !important;
  font-size: 36px !important;
}

.flip-clock-meridium a {
  color: #313333;
}

.flip-clock-wrapper {
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
}

.flip-clock-wrapper:before,
.flip-clock-wrapper:after {
  content: " "; /* 1 */
  display: table; /* 2 */
}
.flip-clock-wrapper:after {
  clear: both;
}

/* Skeleton */
.flip-clock-wrapper ul {
  position: relative;
  float: left;
  margin: 5px;
  width: 60px;
  height: 90px;
  font-size: 80px;
  font-weight: bold;
  line-height: 87px;
  border-radius: 6px;
  background: #000;
}

.flip-clock-wrapper ul li {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 87px;
  text-decoration: none !important;
}

.flip-clock-wrapper ul li:first-child {
  z-index: 2;
}

.flip-clock-wrapper ul li a {
  display: block;
  height: 100%;
  -webkit-perspective: 200px;
  -moz-perspective: 200px;
  perspective: 200px;
  margin: 0 !important;
  overflow: visible !important;
  cursor: default !important;
}

.flip-clock-wrapper ul li a div {
  z-index: 1;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  font-size: 80px;
  overflow: hidden;
  outline: 1px solid transparent;
}

.flip-clock-wrapper ul li a div .shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.flip-clock-wrapper ul li a div.up {
  -webkit-transform-origin: 50% 100%;
  -moz-transform-origin: 50% 100%;
  -ms-transform-origin: 50% 100%;
  -o-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  top: 0;
}

.flip-clock-wrapper ul li a div.up:after {
  content: "";
  position: absolute;
  top: 44px;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 3px;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.4);
}

.flip-clock-wrapper ul li a div.down {
  -webkit-transform-origin: 50% 0;
  -moz-transform-origin: 50% 0;
  -ms-transform-origin: 50% 0;
  -o-transform-origin: 50% 0;
  transform-origin: 50% 0;
  bottom: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.flip-clock-wrapper ul li a div div.inn {
  position: absolute;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 200%;
  color: v-bind(themeColor_C);
  text-shadow: 0 1px 2px #000;
  text-align: center;
  background-color: v-bind(themeColor_BG);
  border-radius: 6px;
  font-size: 70px;
}

.flip-clock-wrapper ul li a div.up div.inn {
  top: 0;
}

.flip-clock-wrapper ul li a div.down div.inn {
  bottom: 0;
}

/* PLAY */
.flip-clock-wrapper ul.play li.flip-clock-before {
  z-index: 3;
}

.flip-clock-wrapper .flip {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
}

.flip-clock-wrapper ul.play li.flip-clock-active {
  -webkit-animation: asd 0.01s 0.49s linear both;
  -moz-animation: asd 0.01s 0.49s linear both;
  animation: asd 0.01s 0.49s linear both;
  z-index: 5;
}

.flip-clock-divider {
  float: left;
  display: inline-block;
  position: relative;
  width: 20px;
  height: 100px;
}

.flip-clock-divider:first-child {
  width: 0;
}

.flip-clock-dot {
  display: block;
  background: #323434;
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  left: 5px;
}

.flip-clock-divider .flip-clock-label {
  position: absolute;
  top: -1.5em;
  right: -85px;
  color: v-bind(themeColor_B_C);
  text-shadow: none;
}

.flip-clock-divider.hours .flip-clock-label {
  right: -89px;
}

.flip-clock-divider.minutes .flip-clock-label {
  right: -93px;
}

.flip-clock-divider.seconds .flip-clock-label {
  right: -94px;
}

.flip-clock-dot.top {
  top: 30px;
}

.flip-clock-dot.bottom {
  bottom: 30px;
}

@-webkit-keyframes asd {
  0% {
    z-index: 2;
  }

  100% {
    z-index: 4;
  }
}

@-moz-keyframes asd {
  0% {
    z-index: 2;
  }

  100% {
    z-index: 4;
  }
}

@-o-keyframes asd {
  0% {
    z-index: 2;
  }

  100% {
    z-index: 4;
  }
}

@keyframes asd {
  0% {
    z-index: 2;
  }

  100% {
    z-index: 4;
  }
}

.flip-clock-wrapper ul.play li.flip-clock-active .down {
  z-index: 2;
  -webkit-animation: turn 0.5s 0.5s linear both;
  -moz-animation: turn 0.5s 0.5s linear both;
  animation: turn 0.5s 0.5s linear both;
}

@-webkit-keyframes turn {
  0% {
    -webkit-transform: rotateX(90deg);
  }

  100% {
    -webkit-transform: rotateX(0deg);
  }
}

@-moz-keyframes turn {
  0% {
    -moz-transform: rotateX(90deg);
  }

  100% {
    -moz-transform: rotateX(0deg);
  }
}

@-o-keyframes turn {
  0% {
    -o-transform: rotateX(90deg);
  }

  100% {
    -o-transform: rotateX(0deg);
  }
}

@keyframes turn {
  0% {
    transform: rotateX(90deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}

.flip-clock-wrapper ul.play li.flip-clock-before .up {
  z-index: 2;
  -webkit-animation: turn2 0.5s linear both;
  -moz-animation: turn2 0.5s linear both;
  animation: turn2 0.5s linear both;
}

@-webkit-keyframes turn2 {
  0% {
    -webkit-transform: rotateX(0deg);
  }

  100% {
    -webkit-transform: rotateX(-90deg);
  }
}

@-moz-keyframes turn2 {
  0% {
    -moz-transform: rotateX(0deg);
  }

  100% {
    -moz-transform: rotateX(-90deg);
  }
}

@-o-keyframes turn2 {
  0% {
    -o-transform: rotateX(0deg);
  }

  100% {
    -o-transform: rotateX(-90deg);
  }
}

@keyframes turn2 {
  0% {
    transform: rotateX(0deg);
  }

  100% {
    transform: rotateX(-90deg);
  }
}

.flip-clock-wrapper ul li.flip-clock-active {
  z-index: 3;
}

/* SHADOW */
.flip-clock-wrapper ul.play li.flip-clock-before .up .shadow {
  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(0, 0, 0, 0.1)),
    color-stop(100%, black)
  );
  background: linear, top, rgba(0, 0, 0, 0.1) 0%, black 100%;
  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: -ms-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: linear, to bottom, rgba(0, 0, 0, 0.1) 0%, black 100%;
  -webkit-animation: show 0.5s linear both;
  -moz-animation: show 0.5s linear both;
  animation: show 0.5s linear both;
}

.flip-clock-wrapper ul.play li.flip-clock-active .up .shadow {
  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(0, 0, 0, 0.1)),
    color-stop(100%, black)
  );
  background: linear, top, rgba(0, 0, 0, 0.1) 0%, black 100%;
  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: -ms-linear-gradient(top, rgba(0, 0, 0, 0.1) 0%, black 100%);
  background: linear, to bottom, rgba(0, 0, 0, 0.1) 0%, black 100%;
  -webkit-animation: hide 0.5s 0.3s linear both;
  -moz-animation: hide 0.5s 0.3s linear both;
  animation: hide 0.5s 0.3s linear both;
}

/*DOWN*/
.flip-clock-wrapper ul.play li.flip-clock-before .down .shadow {
  background: -moz-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, black),
    color-stop(100%, rgba(0, 0, 0, 0.1))
  );
  background: linear, top, black 0%, rgba(0, 0, 0, 0.1) 100%;
  background: -o-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: -ms-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: linear, to bottom, black 0%, rgba(0, 0, 0, 0.1) 100%;
  -webkit-animation: show 0.5s linear both;
  -moz-animation: show 0.5s linear both;
  animation: show 0.5s linear both;
}

.flip-clock-wrapper ul.play li.flip-clock-active .down .shadow {
  background: -moz-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, black),
    color-stop(100%, rgba(0, 0, 0, 0.1))
  );
  background: linear, top, black 0%, rgba(0, 0, 0, 0.1) 100%;
  background: -o-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: -ms-linear-gradient(top, black 0%, rgba(0, 0, 0, 0.1) 100%);
  background: linear, to bottom, black 0%, rgba(0, 0, 0, 0.1) 100%;
  -webkit-animation: hide 0.5s 0.3s linear both;
  -moz-animation: hide 0.5s 0.3s linear both;
  animation: hide 0.5s 0.2s linear both;
}

@-webkit-keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-moz-keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-o-keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-webkit-keyframes hide {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-moz-keyframes hide {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-o-keyframes hide {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.count-up-section {
  color: #222;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  line-height: 1.48;
  padding: 5vh 0 0 0;
}
.copyright.text-center {
  text-align: center;
}
.count-up-section .style-point {
  color: #000;
  font-size: 38px;
}
.count-up-section .style-point span {
  background-color: #3e4b99;
  background-image: -moz-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -webkit-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -o-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -ms-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  color: #fff;
  border-radius: 50%;
  display: block;
  width: 80px;
  height: 80px;
  text-align: center;
  font-size: 54px;
}
.count-up-section .colorfont {
  color: #0147fe;
}
#count-up-section6.count-up-section {
  background-color: #000;
  max-width: 100%;
}
.flipTimemodulesboxes {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 15px;
}
.darkbgFlip h2.style-point {
  color: #fff;
}
.flipTimebox {
  margin: 20px auto 0px;
}

/*days, hours, minutes, seconds styling*/
.flipTimebox .flip-clock-divider .flip-clock-label {
  font-size: 1em;
  font-weight: bold;
  text-transform: uppercase;
  font-family: arial;
}
.flipTimebox .flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(128, 128, 128, 0.5);
}
.flipTimebox .flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #333333;
  border-radius: 6px;
}
.flipclock1message,
.flipclock2message,
.flipclock3message,
.flipclock4message,
.flipclock5message,
.flipclock6message,
.flipclock14message {
  padding-left: 15px;
  color: #ff0000;
}
.darkbgFlip .flip-clock-divider .flip-clock-label {
  color: #fff;
}
.flipTimebox .orangetheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #fb9902;
}
.flipTimebox .orangetheme .flip-clock-dot {
  background-color: #fb9902;
  box-shadow: none;
}
.flipTimebox .orangetheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #fb9902;
  border-radius: 6px;
}
.flipTimebox .orangetheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .darkorangetheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #fd5308;
}
.flipTimebox .darkorangetheme .flip-clock-dot {
  background-color: #fd5308;
  box-shadow: none;
}
.flipTimebox .darkorangetheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #fd5308;
  border-radius: 6px;
}
.flipTimebox .darkorangetheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .bluetheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #5d7db3;
}
.flipTimebox .bluetheme .flip-clock-dot {
  background-color: #466aa9;
  box-shadow: none;
}
.flipTimebox .bluetheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #5d7db3;
  border-radius: 6px;
}
.flipTimebox .bluetheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .greentheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #a2c09b;
}
.flipTimebox .greentheme .flip-clock-dot {
  background-color: #a2c09b;
  box-shadow: none;
}
.flipTimebox .greentheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #23a929;
  border-radius: 6px;
}
.flipTimebox .greentheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .redtheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #df4c5b;
}
.flipTimebox .redtheme .flip-clock-dot {
  background-color: #df4c5b;
  box-shadow: none;
}
.flipTimebox .redtheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #df4c5b;
  border-radius: 6px;
}
.flipTimebox .redtheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .pinktheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #f47eab;
}
.flipTimebox .pinktheme .flip-clock-dot {
  background-color: #f6689f;
  box-shadow: none;
}
.flipTimebox .pinktheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #f47eab;
  border-radius: 6px;
}
.flipTimebox .pinktheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .purpletheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #84709b;
}
.flipTimebox .purpletheme .flip-clock-dot {
  background-color: #6d4798;
  box-shadow: none;
}
.flipTimebox .purpletheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #84709b;
  border-radius: 6px;
}
.flipTimebox .purpletheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .coffeetheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #7b5a26;
}
.flipTimebox .coffeetheme .flip-clock-dot {
  background-color: #7b5a26;
}
.flipTimebox .coffeetheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  background-color: #7b5a26;
  border-radius: 6px;
}
.flipTimebox .coffeetheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .gradienttheme.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #3e4b99;
  background-image: -moz-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -webkit-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -o-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -ms-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
}
.flipTimebox .gradienttheme .flip-clock-dot {
  box-shadow: none;
  background-color: #3e4b99;
  background-image: -moz-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -webkit-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -o-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -ms-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
}
.flipTimebox .gradienttheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  border-radius: 6px;
  background-color: #3e4b99;
  background-image: -moz-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -webkit-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -o-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: -ms-linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
  background-image: linear-gradient(90deg, #3e4b99 10%, #d81e1e 100%);
}
.flipTimebox .gradienttheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .gradienttheme2.flip-clock-wrapper ul li a div div.inn {
  color: #fff;
  background-color: #0147fe;
  background-image: -moz-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -webkit-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -o-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -ms-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: linear-gradient(270deg, #0147fe 0%, #23a929 100%);
}
.flipTimebox .gradienttheme2 .flip-clock-dot {
  box-shadow: none;
  background-color: #0147fe;
  background-image: -moz-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -webkit-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -o-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -ms-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: linear-gradient(270deg, #0147fe 0%, #23a929 100%);
}
.flipTimebox .gradienttheme2.flip-clock-wrapper .flip-clock-meridium a {
  color: #fff;
  border-radius: 6px;
  background-color: #0147fe;
  background-image: -moz-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -webkit-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -o-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: -ms-linear-gradient(270deg, #0147fe 0%, #23a929 100%);
  background-image: linear-gradient(270deg, #0147fe 0%, #23a929 100%);
}
.flipTimebox .gradienttheme2.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(250, 250, 250, 0.5);
}
.flipTimebox .whitetheme.flip-clock-wrapper ul li a div div.inn {
  color: #333;
  background-color: #fff;
}
.flipTimebox .whitetheme .flip-clock-dot {
  background-color: #fff;
  box-shadow: none;
}
.flipTimebox .whitetheme.flip-clock-wrapper .flip-clock-meridium a {
  color: #333;
  background-color: #fff;
  border-radius: 6px;
}
.flipTimebox .whitetheme.flip-clock-wrapper ul li a div.up:after {
  background-color: rgba(128, 128, 128, 0.5);
}
@media screen and (max-width: 767px) {
  .flipTimebox .flip-clock-wrapper ul {
    height: 50px;
    line-height: 50px;
  }
  .flipTimebox .flip-clock-wrapper ul li {
    line-height: 50px;
  }
  .flipTimebox .flip-clock-wrapper ul li a div.up:after {
    top: 24px;
  }
  .flipTimebox .flip-clock-divider {
    height: 50px;
  }
  .flipTimebox .flip-clock-dot {
    height: 6px;
    width: 6px;
    left: 7px;
  }
  .flipTimebox .flip-clock-dot.top {
    top: 17px;
  }
  .flipTimebox .flip-clock-dot.bottom {
    bottom: 8px;
  }
  .flipTimebox .flip-clock-divider.days .flip-clock-label {
    right: -58px;
  }
  .flipTimebox .flip-clock-divider.hours .flip-clock-label {
    right: -62px;
  }
  .flipTimebox .flip-clock-divider.minutes .flip-clock-label {
    right: -68px;
  }
  .flipTimebox .flip-clock-divider.seconds .flip-clock-label {
    right: -69px;
  }
  .flipTimebox .flip-clock-wrapper ul {
    width: 4.933vw;
    margin: 2px;
  }
  .flipTimebox .flip-clock-wrapper ul li a div div.inn {
    font-size: 38px;
  }
  .flipTimebox .flip-clock-meridium {
    font-size: 20px !important;
  }
}
@media screen and (max-width: 568px) {
  .flipTimebox .flip-clock-wrapper ul {
    margin: 2px;
  }
  .flipTimebox .flip-clock-divider {
    width: 5px;
  }
  .flipTimebox .flip-clock-dot {
    height: 5px;
    width: 5px;
  }
  .flipTimebox .flip-clock-divider.days .flip-clock-label {
    right: -58px;
  }
  .flipTimebox .flip-clock-divider.hours .flip-clock-label {
    right: -62px;
  }
  .flipTimebox .flip-clock-divider.minutes .flip-clock-label {
    right: -68px;
  }
  .flipTimebox .flip-clock-divider.seconds .flip-clock-label {
    right: -69px;
  }
  .flipTimebox .flip-clock-meridium {
    font-size: 18px !important;
  }
}
@media screen and (max-width: 480px) {
  .flipTimemodulesboxes {
    /* padding: 0; */
  }
  .flipTimebox .flip-clock-divider .flip-clock-label {
    font-size: 1em;
  }
  .flipTimebox .flip-clock-divider.days .flip-clock-label {
    right: -33px;
  }
  .flipTimebox .flip-clock-divider.hours .flip-clock-label {
    right: -37px;
  }
  .flipTimebox .flip-clock-divider.minutes .flip-clock-label {
    right: -43px;
  }
  .flipTimebox .flip-clock-divider.seconds .flip-clock-label {
    right: -45px;
  }
  .flipTimebox .flip-clock-wrapper ul li a div div.inn {
    font-size: 28px;
  }
  .flipTimebox .flip-clock-meridium {
    font-size: 14px !important;
  }
  .flipTimebox .flip-clock-wrapper ul.flip {
    width: 27px;
    background-color: transparent;
    box-shadow: none;
    margin-left: -8px;
  }
  .flipTimebox .flip-clock-wrapper ul li {
    width: 30px;
  }
  .flipTimebox .flip-clock-dot {
    margin-left: -10px;
  }
  .flipTimebox {
    margin: 50px 0 100px 20px;
  }
}
@media screen and (max-width: 360px) {
  .flipTimebox .flip-clock-divider .flip-clock-label {
    font-size: 1em;
    width: 3px;
  }
  .flipTimebox .flip-clock-divider.days .flip-clock-label {
    right: -1px;
  }
  .flipTimebox .flip-clock-divider.hours .flip-clock-label {
    right: 2px;
  }
  .flipTimebox .flip-clock-divider.minutes .flip-clock-label {
    right: 6px;
  }
  .flipTimebox .flip-clock-divider.seconds .flip-clock-label {
    right: 9px;
  }
  .flipTimebox .flip-clock-wrapper ul.flip {
    width: 25px;
    margin-left: -14px;
  }
  .flipTimebox .flip-clock-wrapper {
    padding-left: 5px;
  }
  .flipTimebox .flip-clock-wrapper ul li {
    width: 25px;
  }
  .flipTimebox .flip-clock-dot {
    margin-left: -16px;
  }
  .flipTimebox {
    margin: 50px 0 10px 15px;
  }
}
@media screen and (max-width: 320px) {
  .flipTimebox .flip-clock-wrapper {
    /* padding-left: 15px; */
    scale: 1.2;
    padding-left: 0px;
    transform-origin: 25% center;
  }
  .flipTimebox .flip-clock-wrapper ul.flip {
    margin-left: -16px;
  }
  .flipTimebox .flip-clock-wrapper ul li {
  }
  .flipTimebox .flip-clock-dot {
    margin-left: -18px;
  }
  .flipTimebox .flip-clock-divider.days .flip-clock-label {
    right: 3px;
  }
  .flipTimebox .flip-clock-divider.hours .flip-clock-label {
    right: 6px;
  }
  .flipTimebox .flip-clock-divider.minutes .flip-clock-label {
    right: 11px;
  }
  .flipTimebox .flip-clock-divider.seconds .flip-clock-label {
    right: 14px;
  }
}
</style>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from "vue";
import tinycolor from "tinycolor2";
import axios from "axios";
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
const themeColor_G = ref(""); //gray
const themeColor_D = ref(""); //dark
const layout = ref(""); //
watchEffect(() => {
  themeColor_B.value = props.widgetConfig["theme-color"];
  themeColor_G.value = tinycolor(themeColor_B.value).lighten(50).toString();
  themeColor_D.value = tinycolor(themeColor_B.value).darken(5).toString();
  if (props.widgetConfig["layout-style"] == "Vertical") {
    themeColor_G.value = tinycolor(themeColor_B.value)
      .lighten(50)
      .setAlpha(0.1)
      .toString();
    themeColor_D.value = tinycolor(themeColor_B.value)
      .darken(15)
      .desaturate(10)
      .toString();
  }
  themeColor_L.value = tinycolor(themeColor_B.value)
    .lighten(20)
    .setAlpha(0.5)
    .toString();

  layout.value = props.widgetConfig["layout-style"];
});
const music = ref({
  name: "",
  url: "",
  picurl: "",
  artistsname: "",
});

const duration = ref(0);
const current_time = ref(0);
const time_rate = ref(0);
const _audio = ref({
  currentTime: "0",
  duration: "0",
  loop: false,
  paused: true,
  volume: 1,
  src: "",
  play: () => {},
  pause: () => {},
  ended: false,
});

const status = ref(0);

const getMusic = () => {
  let left = checkMusic();
  if (!left) {
    music.value = JSON.parse(localStorage.left).music[
      Math.floor(Math.random() * 10)
    ];
    return setAudio();
  }
  axios
    .get(
      `https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=json`
    )
    .then((res) => {
      let data = res.data.data;
      music.value = data;
      setAudio();
      if (!localStorage.left) {
        localStorage.left = JSON.stringify({
          time: new Date().getTime(),
          music: [data],
        });
      } else {
        let l = JSON.parse(localStorage.left);
        l.music.push(data);
        localStorage.left = JSON.stringify({
          time: l.time,
          music: l.music,
        });
      }
    });
};

const setAudio = () => {
  _audio.value = new Audio();
  _audio.value.src = music.value.url;
  _audio.value.loop = true;
  _audio.value.volume = 0.6;
  _audio.value.addEventListener("loadedmetadata", function () {
    duration.value = parseInt(_audio.value.duration);
  });
  _audio.value.addEventListener("timeupdate", function () {
    current_time.value = parseInt(_audio.value.currentTime);
    time_rate.value = (current_time.value / duration.value) * 100;
  });
};

const setAudioStatus = () => {
  if (status.value === 0) {
    _audio.value.play();
    status.value = 1;
  } else {
    _audio.value.pause();
    status.value = 0;
  }
};

const checkMusic = () => {
  // true: 需要重新请求，false：读取缓存
  const left = localStorage.left ? JSON.parse(localStorage.left) : null;
  if (!left) return true;
  let _time = parseInt(left.time);
  const _now = new Date().getTime();
  if (_now - _time < 12 * 60 * 60 * 1000) {
    if (left.music.length < 10) {
      return true;
    } else {
      return false;
    }
  } else {
    localStorage.removeItem("left");
    return true;
  }
};
function formatSecond(s: number) {
  s = Math.round(s);
  let m = Math.floor(s / 60);
  s = s % 60;
  return `${m >= 10 ? m : "0" + m}:${s >= 10 ? s : "0" + s}`;
}

const currentTimeFormatted = computed(() => formatSecond(current_time.value));
const remainingTimeFormatted = computed(() =>
  formatSecond(duration.value - current_time.value)
);

onMounted(() => {
  getMusic();
});
</script>
<template>
  <div class="sub-container" id="root" v-cloak>
    <div class="music-pic Vertical" v-if="layout === 'Vertical'">
      <img
        :src="music && music.picurl"
        :class="{ listener: status }"
        id="music-cover"
        alt="音乐封面"
      />
    </div>
    <div class="music-box" :class="layout">
      <div class="music-pic" v-if="layout === 'Default'">
        <img
          :src="music && music.picurl"
          :class="{ listener: status }"
          id="music-cover"
          alt="音乐封面"
        />
      </div>
      <div class="music-info">
        <h4 id="name">{{ music.name }}</h4>
        <p id="author">{{ music.artistsname }}</p>
      </div>
      <div class="music-time">
        <div class="inner" id="time" :style="{ width: `${time_rate}%` }"></div>
      </div>
      <div class="music-timedata" v-if="layout === 'Vertical'">
        <span>{{ currentTimeFormatted }}</span>
        <span>{{ remainingTimeFormatted }}</span>
      </div>
      <div class="music-btn" id="btn" @click="setAudioStatus">
        <template v-if="!status">
          <svg
            width="35"
            height="35"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
              fill="none"
              stroke-width="3"
              stroke-linejoin="round"
            />
            <path
              d="M20 24V17.0718L26 20.5359L32 24L26 27.4641L20 30.9282V24Z"
              fill="none"
              stroke-width="4"
              stroke-linejoin="round"
            />
          </svg>
        </template>
        <template v-else>
          <svg
            width="35"
            height="35"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
              fill="none"
              stroke-width="3"
              stroke-linejoin="round"
            />
            <path
              d="M19 18V30"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29 18V30"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}
.sub-container {
}
#container .sub-container {
  max-width: unset;
  scale: 0.8;
}
.music-pic {
  width: 15vw;
  height: 15vw;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1vw solid v-bind(themeColor_B);
  /* margin: 0 auto; */
  overflow: hidden;
  position: relative;
  margin-right: 3vw;
}
.music-pic img {
  display: block;
  width: 100%;
  height: 100%;
  /* background-color: #f3f3f3; */
}
.music-pic img.listener {
  animation: rotating 10s linear infinite forwards;
}
.music-box.Default {
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: v-bind(themeColor_G);

  /* height: 20vw; */
  margin: 0 auto 0;
  border-radius: 3vw;
  box-shadow: 0 0 5vw 0 rgb(0 0 0 / 10%);
  position: relative;
  z-index: 10;
  padding: 2vw 3vw;
  box-sizing: border-box;
}
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.Default .music-time {
  width: 30vw;
  height: 1.5vw;
  border-radius: 1.5vw;
  background-color: v-bind(themeColor_L);
  margin: 1vw auto;
  overflow: hidden;
}
.music-time .inner {
  width: 0;
  height: 1.5vw;
  border-radius: 1.5vw;
  background-color: v-bind(themeColor_D);
  transition: width 0.2s ease-in-out;
}
.music-btn {
  cursor: pointer;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  /* background-color: #333333; */
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  line-height: 10vw;
  stroke: v-bind(themeColor_D);
}
.Default .music-info {
  text-align: left;
  padding-bottom: 1vw;
  width: 15vw;
}
.music-info h4 {
  font-size: min(12px, 8vw);
  font-weight: bold;
}
.music-info h4,
.music-info p {
  margin: 1vw 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.music-info p {
  font-size: min(12px, 6vw);
}
.music-timedata {
  display: flex;
  justify-content: space-between;
}
html[theme="dark"],
html[theme="dark"] body {
  background-color: #191919;
  color: #fff;
}
html[theme="dark"] .music-box {
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5vw);
}

.Vertical.music-pic {
  width: 40vw;
  height: 40vw;
  box-sizing: border-box;
  border-radius: 50%;
  border: 3vw solid v-bind(themeColor_B);
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.Vertical.music-pic img {
  display: block;
  width: 100%;
  height: 100%;
  /* background-color: #f3f3f3; */
}
.Vertical.music-pic img.listener {
  animation: rotating 10s linear infinite forwards;
}
.Vertical.music-box {
  background-color: rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(8px) brightness(1.2);

  width: 80vw;
  /* height: 20vw; */
  margin: -18vw auto 0;
  border-radius: 3vw;
  box-shadow: 0 0 5vw 0 rgb(0 0 0 / 10%);
  position: relative;
  z-index: 10;
  padding: 2vw 3vw 5vw 3vw;
  box-sizing: border-box;
}

.Vertical .music-time {
  width: 70vw;
  height: 1.5vw;
  border-radius: 1.5vw;
  background-color: v-bind(themeColor_L);
  margin: 1vw auto;
  overflow: hidden;
}
.Vertical .music-time .inner {
  width: 0;
  height: 1.5vw;
  border-radius: 1.5vw;
  background-color: v-bind(themeColor_D);
  transition: width 0.2s ease-in-out;
}
.Vertical .music-btn {
  cursor: pointer;
  width: 8vw;
  height: 8vw;
  border-radius: 50%;
  /* background-color: #333333; */
  margin: 0 auto 0;
  text-align: center;
  line-height: 10vw;
  color: v-bind(themeColor_D);
  stroke: v-bind(themeColor_D);
}
.Vertical .music-btn svg {
  width: 100%;
  height: 100%;
}
.Vertical .music-info {
  text-align: center;
  padding-bottom: 1vw;
}
.Vertical .music-info h4 {
  font-size: 4vw;
  text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;
}
.Vertical .music-info h4,
.Vertical .music-info p {
  margin: 1vw 0;
  color: #fff;
}

.Vertical .music-timedata {
  color: v-bind(themeColor_D);
  font-size: 2vw;
  display: flex;
  justify-content: space-between;
}
</style>

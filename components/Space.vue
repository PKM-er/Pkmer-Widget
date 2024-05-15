<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";

//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
  widgetConfig: {
    [index: string]: any;
  };
}

const props = defineProps<Props>();
</script>
<template>
  <div class="sub-container">
    <section class="clearfix">
      <ul class="solarsystem">
        <li class="sun">
          <a href="#sun"><span>Sun</span></a>
        </li>
        <li class="mercury">
          <a href="#mercury"><span>Mercury</span></a>
        </li>
        <li class="venus">
          <a href="#venus"><span>Venus</span></a>
        </li>
        <li class="earth">
          <a href="#earth"
            ><span>Earth<span class="moon"> &amp; Moon</span></span></a
          >
        </li>
        <li class="mars">
          <a href="#mars"><span>Mars</span></a>
        </li>
        <li class="asteroids_meteorids">
          <span>Asteroids &amp; Meteorids</span>
        </li>
        <li class="jupiter">
          <a href="#jupiter"><span>Jupiter</span></a>
        </li>
        <li class="saturn">
          <a href="#saturn"
            ><span>Saturn &amp; <span class="ring">Ring</span></span></a
          >
        </li>
        <li class="uranus">
          <a href="#uranus"><span>Uranus</span></a>
        </li>
        <li class="neptune">
          <a href="#neptune"><span>Neptune</span></a>
        </li>
        <li class="pluto">
          <a href="#pluto"><span>Pluto</span></a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style>
body {
  font: 14px/1.5 "PT Sans Narrow", sans-serif;

  background: transparent;

  color: #626668;
  --sun-left: min(50vw, 320px);
}

/* Solar System Styles */
ul.solarsystem {
  --solarsystem-width: 40px; /* 添加相对变量 */
  --solarsystem-height: 640px; /* 添加相对变量 */
  height: var(--solarsystem-height); /* 使用相对变量 */
  position: relative;
  list-style: none;
  transition: all 0.09s ease-in;
  -moz-transition: all 0.09s ease-in;
  -o-transition: all 0.09s ease-in;
  transition: all 0.09s ease-in;
  overflow: hidden;
}
ul.solarsystem li {
  text-indent: -9999px;
  display: block;
  position: absolute;
  border: 2px solid #8989891f;
  /*    opacity: 0.7;*/
}
ul.solarsystem li span {
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
ul.solarsystem li.active {
  border-color: #aa4200;
}
ul.solarsystem li.active.sun,
ul.solarsystem li.active span {
  transform: scale(1.3);
  -moz-transform: scale(1.3);
  -o-transform: scale(1.3);
  transform: scale(1.3);
}
ul.solarsystem li.active.sun span,
ul.solarsystem li.active.earth .moon {
  border: none;
  box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
ul.solarsystem li.sun {
  width: var(--solarsystem-width);
  height: var(--solarsystem-width);
  border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  background: #fc3;
  background-image: linear-gradient(
    to top,
    rgb(204, 153, 0) 22%,
    rgb(255, 219, 112) 100%
  );

  background-image: -moz-linear-gradient(
    rgb(204, 153, 0) 22%,
    rgb(255, 219, 112) 100%
  );
  top: 302px;
  left: var(--sun-left);
  border: none;
  box-shadow: 0 0 50px #c90;
  -moz-box-shadow: 0 0 50px #c90;
  box-shadow: 0 0 50px #c90;
  z-index: 100;
  transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
ul.solarsystem li.sun span {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
}
ul.solarsystem li.mercury {
  width: calc(var(--solarsystem-width) * 2.5);
  height: calc(var(--solarsystem-width) * 2.5);
  border-radius: 52px;
  -moz-border-radius: 52px;
  border-radius: 52px;
  top: 270px;
  left: calc(var(--sun-left) - 32px);
  z-index: 99;
}
ul.solarsystem li.mercury span {
  background: #b6bac5;
  top: 10px;
  left: 10px;
}
ul.solarsystem li.venus {
  width: calc(var(--solarsystem-width) * 4);
  height: calc(var(--solarsystem-width) * 4);
  border-radius: 82px;
  -moz-border-radius: 82px;
  border-radius: 82px;
  top: 240px;
  left: calc(var(--sun-left) - 64px);
  z-index: 98;
}
ul.solarsystem li.venus span {
  background: #bf8639;
  top: 118px;
  left: 5px;
}
ul.solarsystem li.earth {
  width: calc(var(--solarsystem-width) * 5.5);
  height: calc(var(--solarsystem-width) * 5.5);
  border-radius: 112px;
  -moz-border-radius: 112px;
  border-radius: 112px;
  top: 210px;
  left: calc(var(--sun-left) - 96px);
  z-index: 97;
}
ul.solarsystem li.earth span {
  background: #06c;
  top: 56px;
  left: 5px;
}
ul.solarsystem li.earth span.moon {
  width: 4px;
  height: 4px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  background: #ccc;
  top: 12px;
  left: 12px;
}
ul.solarsystem li.mars {
  width: calc(var(--solarsystem-width) * 7);
  height: calc(var(--solarsystem-width) * 7);
  border-radius: 142px;
  -moz-border-radius: 142px;
  border-radius: 142px;
  top: 180px;
  left: calc(var(--sun-left) - 128px);
  z-index: 96;
}
ul.solarsystem li.mars span {
  background: #aa4200;
  top: 0px;
  left: 175px;
}
ul.solarsystem li.asteroids_meteorids {
  top: 155px;
  left: calc(var(--sun-left) - 147px);
  z-index: 1;
  background: url(data:image/png;base64,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)
    no-repeat 0 0;

  width: calc(var(--solarsystem-width) * 8.25);
  height: calc(var(--solarsystem-width) * 8.25);
  border-radius: 165px;
  -moz-border-radius: 165px;
  border-radius: 165px;
  border: none;
}
ul.solarsystem li.jupiter {
  width: calc(var(--solarsystem-width) * 8.5);
  height: calc(var(--solarsystem-width) * 8.5);
  border-radius: 172px;
  -moz-border-radius: 172px;
  border-radius: 172px;
  top: 150px;
  left: calc(var(--sun-left) - 152px);
  z-index: 95;
}
ul.solarsystem li.jupiter span {
  background: #e0ae6f;
  top: 67px;
  left: 24px;
}
ul.solarsystem li.saturn {
  width: calc(var(--solarsystem-width) * 10);
  height: calc(var(--solarsystem-width) * 10);
  border-radius: 202px;
  -moz-border-radius: 202px;
  border-radius: 202px;
  top: 120px;
  left: calc(var(--sun-left) - 182px);
  z-index: 94;
}
ul.solarsystem li.saturn span {
  background: #dfd3a9;
  top: 24px;
  left: 300px;
}
ul.solarsystem li.saturn span.ring {
  width: 12px;
  height: 12px;
  border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  background: none;
  border: 2px solid #5a4e34;
  left: -3px;
  top: -3px;
  transform: skewY(50deg);
  -moz-transform: skewY(50deg);
  -o-transform: skewY(50deg);
  transform: skewY(50deg);
}
ul.solarsystem li.uranus {
  width: calc(var(--solarsystem-width) * 11.5);
  height: calc(var(--solarsystem-width) * 11.5);
  border-radius: 232px;
  -moz-border-radius: 232px;
  border-radius: 232px;
  top: 90px;
  left: calc(var(--sun-left) - 212px);
  z-index: 93;
}
ul.solarsystem li.uranus span {
  background: #82b3d1;
  top: 7px;
  left: 300px;
}
ul.solarsystem li.neptune {
  width: calc(var(--solarsystem-width) * 13);
  height: calc(var(--solarsystem-width) * 13);
  border-radius: 262px;
  -moz-border-radius: 262px;
  border-radius: 262px;
  top: 60px;
  left: calc(var(--sun-left) - 242px);
  z-index: 92;
}
ul.solarsystem li.neptune span {
  background: #77c2ec;
  top: 0px;
  left: 200px;
}
ul.solarsystem li.pluto {
  width: calc(var(--solarsystem-width) * 14.5);
  height: calc(var(--solarsystem-width) * 14.5);
  border-radius: 292px;
  -moz-border-radius: 292px;
  border-radius: 292px;
  top: 30px;
  left: calc(var(--sun-left) - 275px);
  z-index: 91;
}
ul.solarsystem li.pluto span {
  background: #7c6a5c;
  top: 79px;
  left: 79px;
}

ul#descriptions {
  position: absolute;
  top: 150px;
  right: 100px;
  list-style: none;
}
ul#descriptions h2 {
  cursor: pointer;
  color: #386077;
  transition: all 0.15s ease-in;
  -moz-transition: all 0.15s ease-in;
  -o-transition: all 0.15s ease-in;
  transition: all 0.15s ease-in;
  font-size: 20px;
  position: relative;
  z-index: 101;
  transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  margin-bottom: -15px;
}
ul#descriptions h2:hover {
  color: #aa4200;
  transform: scale(1.08);
  -moz-transform: scale(1.08);
  -o-transform: scale(1.08);
  transform: scale(1.08);
}
ul#descriptions li p {
  position: absolute;
  left: -250px;
  top: 0;
  width: 200px;
  display: inline;
  opacity: 0;
  visibility: hidden;
  font-size: 20px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  -o-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  background: #0f132c;
  padding: 30px;
  color: #767892;
  line-height: 1.7;
  z-index: 100;
  border: 1px solid #1c203c;
}
ul#descriptions h2:hover + p {
  visibility: visible;
  opacity: 0.9;
  left: -280px;
}

/* CSS3 Animations */
ul.solarsystem li {
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: orbit;

  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -moz-animation-name: orbit;
}
ul.solarsystem li.earth span {
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: moon;

  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -moz-animation-name: moon;
}
ul.solarsystem li.mercury {
  animation-duration: 5s;
  -moz-animation-duration: 5s;
}
ul.solarsystem li.venus {
  animation-duration: 8s;
  -moz-animation-duration: 8s;
}
ul.solarsystem li.earth {
  animation-duration: 12s;
  -moz-animation-duration: 12s;
}
ul.solarsystem li.earth span {
  animation-duration: 2s;
  -moz-animation-duration: 2s;
}
ul.solarsystem li.mars {
  animation-duration: 20s;
  -moz-animation-duration: 20s;
}
ul.solarsystem li.asteroids_meteorids {
  animation-duration: 50s;
  -moz-animation-duration: 50s;
}
ul.solarsystem li.jupiter {
  animation-duration: 30s;
  -moz-animation-duration: 30s;
}
ul.solarsystem li.saturn {
  animation-duration: 60s;
  -moz-animation-duration: 60s;
}
ul.solarsystem li.uranus {
  animation-duration: 70s;
  -moz-animation-duration: 70s;
}
ul.solarsystem li.neptune {
  animation-duration: 100s;
  -moz-animation-duration: 100s;
}
ul.solarsystem li.pluto {
  animation-duration: 120s;
  -moz-animation-duration: 120s;
}

@keyframes orbit {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes moon {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@-moz-keyframes orbit {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-moz-keyframes moon {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}

/*ul.solarsystem:hover li {animation-play-state: paused;} */
</style>

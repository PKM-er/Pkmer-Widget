<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
	widgetConfig?: {
		[index: string]: any;
	};
}
// 从父组件读取配置
const props = defineProps<Props>();

const secondHand = ref({ angle: 0 });
const minuteHand = ref({ angle: 0 });
const hourHand = ref({ angle: 0 });
const rotate = function (second: number) {
	return second * 6;
};
const tick = () => {
	const now = new Date();
	var time =
		now.getHours() * 3600 +
		now.getMinutes() * 60 +
		now.getSeconds() * 1 +
		now.getMilliseconds() / 1000;

	// update second hand
	secondHand.value.angle = rotate(time);

	// update minute hand
	const minuteAngle = rotate(time / 60);
	minuteHand.value.angle = minuteAngle;

	// update hour hand
	const hourAngle = rotate(time / 60 / 12);
	hourHand.value.angle = hourAngle;

	// schedule next tick
	setTimeout(tick, 60);
};

let intervalId: string | number | NodeJS.Timeout | undefined;
onMounted(() => {
	// initialize clock hands angles
	tick();

	// start the clock
	intervalId = setInterval(() => {
		tick();
	}, 60000);
});

onUnmounted(() => {
	clearInterval(intervalId);
});
</script>
<template>
	<div class="sub-container widget_clock">
		<div class="fill">
			<div class="clock" ref="clock">
				<div class="centre">
					<div class="dynamic">
						<div class="anchor" style="transform: rotate(6deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(12deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(18deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(24deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: -116.9px; left: 67.5px">05</div>
						<div class="anchor" style="transform: rotate(36deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(42deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(48deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(54deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: -67.5px; left: 116.9px">10</div>
						<div class="anchor" style="transform: rotate(66deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(72deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(78deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(84deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: 0px; left: 135px">15</div>
						<div class="anchor" style="transform: rotate(96deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(102deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(108deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(114deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: 67.5px; left: 116.9px">20</div>
						<div class="anchor" style="transform: rotate(126deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(132deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(138deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(144deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: 116.9px; left: 67.5px">25</div>
						<div class="anchor" style="transform: rotate(156deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(162deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(168deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(174deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: 135px; left: 0px">30</div>
						<div class="anchor" style="transform: rotate(186deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(192deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(198deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(204deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: 116.9px; left: -67.5px">35</div>
						<div class="anchor" style="transform: rotate(216deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(222deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(228deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(234deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: 67.5px; left: -116.9px">40</div>
						<div class="anchor" style="transform: rotate(246deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(252deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(258deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(264deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: 0px; left: -135px">45</div>
						<div class="anchor" style="transform: rotate(276deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(282deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(288deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(294deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: -67.5px; left: -116.9px">50</div>
						<div class="anchor" style="transform: rotate(306deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(312deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(318deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(324deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: -116.9px; left: -67.5px">55</div>
						<div class="anchor" style="transform: rotate(336deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(342deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(348deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="anchor" style="transform: rotate(354deg)">
							<div class="element minute-line"></div>
						</div>
						<div class="minute-text" style="top: -135px; left: 0px">60</div>
						<div class="hour-text hour-1" style="top: -90.9px; left: 52.5px">1</div>
						<div class="hour-text hour-2" style="top: -52.5px; left: 90.9px">2</div>
						<div class="hour-text hour-3" style="top: 0px; left: 105px">3</div>
						<div class="hour-text hour-4" style="top: 52.5px; left: 90.9px">4</div>
						<div class="hour-text hour-5" style="top: 90.9px; left: 52.5px">5</div>
						<div class="hour-text hour-6" style="top: 105px; left: 0px">6</div>
						<div class="hour-text hour-7" style="top: 90.9px; left: -52.5px">7</div>
						<div class="hour-text hour-8" style="top: 52.5px; left: -90.9px">8</div>
						<div class="hour-text hour-9" style="top: 0px; left: -105px">9</div>
						<div class="hour-text hour-10" style="top: -52.5px; left: -90.9px">10</div>
						<div class="hour-text hour-11" style="top: -90.9px; left: -52.5px">11</div>
						<div class="hour-text hour-12" style="top: -105px; left: 0px">12</div>
					</div>
					<div class="expand round circle-1"></div>
					<div class="anchor hour" :style="'transform: rotate(' + hourHand.angle + 'deg)'">
						<div class="element thin-hand"></div>
						<div class="element fat-hand"></div>
					</div>
					<div class="anchor minute" :style="'transform: rotate(' + minuteHand.angle + 'deg)'">
						<div class="element thin-hand"></div>
						<div class="element fat-hand minute-hand"></div>
					</div>
					<div class="anchor second" :style="'transform: rotate(' + secondHand.angle + 'deg)'">
						<div class="element second-hand"></div>
					</div>
					<div class="expand round circle-2"></div>
					<div class="expand round circle-3"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
@media (max-width: 320px) {
	div.sub-container {
		transform: scale3d(0.75, 0.75, 1);
		transform-origin: 45% top;
		padding: 0;
	}
	div.widget_clock .fill {
		width: 100%;
		height: 100%;
	}
}

.sub-container {
	position: relative;
	border: none;
}
.widget_clock {
	position: relative;
	padding: 10px 0;
}
.widget_clock .fill {
	background-color: #fff;
	width: 340px;
	height: 340px;
	position: relative;
	border-radius: 50%;
	margin: 0 auto;
}
.widget_clock .clock {
	position: absolute;
	opacity: 1;
	width: 100%;
	height: 340px;
}
.widget_clock .fill .clock {
	left: 0;
	top: 0;
	height: 340px;
}
.widget_clock .centre {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 0;
	height: 0;
}
.widget_clock .expand {
	position: absolute;
	top: 0;
	left: 0;
	transform: translate(-50%, -50%);
}
.widget_clock .anchor {
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
}
.widget_clock .element {
	position: absolute;
	top: 0;
	left: 0;
}
.widget_clock .round {
	border-radius: 296px;
}
.widget_clock .circle-1 {
	background: #2e3c49;
	width: 12px;
	height: 12px;
}
.widget_clock .circle-2 {
	background: #fa9f22;
	width: 8px;
	height: 8px;
}
.widget_clock .circle-3 {
	background: black;
	width: 4px;
	height: 4px;
}
.widget_clock .second {
	transform: rotate(180deg);
}
.widget_clock .minute {
	transform: rotate(54deg);
}
.widget_clock .second-hand {
	width: 2px;
	height: 164px;
	background: #fa9f22;
	transform: translate(-50%, -100%) translateY(24px);
}
.widget_clock .hour {
	transform: rotate(304.5deg);
}
.widget_clock .thin-hand {
	width: 4px;
	height: 50px;
	background: #293642;
	transform: translate(-50%, -100%);
}
.widget_clock .fat-hand {
	width: 10px;
	height: 57px;
	border-radius: 10px;
	background: #293642;
	transform: translate(-50%, -100%) translateY(-18px);
}
.widget_clock .minute-hand {
	height: 112px;
}
.widget_clock .hour-text {
	position: absolute;
	font: 40px Hei, Helvetica, Arial, sans-serif;
	color: #293642;
	transform: translate(-50%, -50%);
}
.widget_clock .hour-10 {
	padding-left: 0.4ex;
}
.widget_clock .hour-11 {
	padding-left: 0.25ex;
}
.widget_clock .minute-text {
	position: absolute;
	font: 12px Avenir Next, Helvetica, Arial, sans-serif;
	color: #293642;
	transform: translate(-50%, -50%);
}
.widget_clock .minute-line {
	background: #293642;
	width: 1px;
	height: 9px;
	transform: translate(-50%, -100%) translateY(-131px);
	opacity: 0.34;
}
</style>

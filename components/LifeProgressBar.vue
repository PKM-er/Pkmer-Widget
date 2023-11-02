<script setup lang="ts">
import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue';
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
	birthday.value = props.widgetConfig?.['date-picker'];

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
					<h3 id="name">{{ props.widgetConfig['input-text'] }}</h3>
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
	width: 420px !important; /* 9.2rem = 497.28px */
	margin: 21.33px auto; /* 0.4rem = 21.33px */
	border-radius: 112px; /* 1.866667rem = 112px */
	background: #f3f3f3;
	box-shadow: 9.28px 9.28px 17.78px #e0e0e0, -9.28px -9.28px 17.78px #ffffff;
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
	width: 72px; /* 1.333333rem = 72px */
	height: 72px; /* 1.333333rem = 72px */
	border-radius: 50%;
	background-color: #ffffff;
	text-align: center;
	line-height: 72px; /* 1.333333rem = 72px */
	font-size: 28.8px; /* 0.48rem = 28.8px */
	border-radius: 72px; /* 1.333333rem = 72px */
	background: #f3f3f3;
	box-shadow: 9.28px 9.28px 17.78px #e0e0e0, -9.28px -9.28px 17.78px #ffffff;
}

.info {
	margin-left: 21.33px; /* 0.4rem = 21.33px */
}

.info #name {
	font-size: 28.8px; /* 0.48rem = 28.8px */
	margin: 0;
	color: #333333;
}

.info p {
	color: #999999;
	margin: 0;
}

.right {
	color: #999999;
	opacity: 0.3;
}

#days {
	display: inline-block;
	font-size: 51.84px; /* 0.96rem = 51.84px */
	color: #2377a4;
}

#container.dark .sub-container {
	box-shadow: unset;
}
</style>

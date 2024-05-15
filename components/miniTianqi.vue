<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-11-14 16:18:16
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2024-05-13 17:15:13
 * @Description: 
-->
<template>
	<div>
		<!-- 其他组件内容 -->

		<iframe
			width="240"
			height="35"
			frameborder="0"
			scrolling="no"
			hspace="0"
			:src="weatherIframeUrl"
			sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
		></iframe>
	</div>
</template>

<script setup lang="ts">
// 引入需要的 Vue 3 特性
import { ref, onMounted, watchEffect } from 'vue';

// 设置的类型定义
interface Props {
	widgetConfig: {
		[index: string]: any;
	};
}
// 从父组件读取配置
const props = defineProps<Props>();
// 其他组件逻辑
const themeStyle = ref('ta');
const style = ref('pear');
const city = ref('');
const fontColor = ref('');
// 定义天气预报的 iframe URL
const weatherIframeUrl = ref<string>(
	`https://widget.tianqiapi.com?style=ta&skin=pear&fontsize=13&align=&paddingtop=-2&paddingleft=30&color=747474`
);
const debounce = (fn, delay) => {
	let timerId;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
};
// 创建防抖函数，将变量更新操作包装在其中
const updateFontColor = debounce((value) => {
	weatherIframeUrl.value = value;
}, 800); // 设置延迟时间为800毫秒

watchEffect(() => {
	themeStyle.value = props.widgetConfig['select-theme']
		? props.widgetConfig['select-theme']
		: 'ta';
	style.value = props.widgetConfig['select-icon'] ? props.widgetConfig['select-icon'] : 'pear';
	city.value = props.widgetConfig['input-text'] ? props.widgetConfig['input-text'] : '';
	fontColor.value = props.widgetConfig['theme-color']
		? props.widgetConfig['theme-color'].replace('#', '')
		: '747474';

	// 在组件中使用`updateFontColor`来更新`fontColor`变量
	updateFontColor(
		`https://widget.tianqiapi.com?style=${themeStyle.value}&skin=${style.value}&fontsize=13&align=&paddingtop=2&paddingleft=30&color=${fontColor.value}&city=${city.value}`
	);
});
// 在组件挂载后，可以进行一些初始化的操作
onMounted(() => {
	// 这里可以添加一些需要在组件挂载后执行的逻辑
});
</script>

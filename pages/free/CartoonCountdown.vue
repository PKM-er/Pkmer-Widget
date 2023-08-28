<script lang="ts" setup>
const initWidgetConfig = {
		'input-text': '今年剩余',
		'date-picker': new Date(`${new Date().getFullYear()}/12/31 23:59`).getTime(),
		'theme-color': '#f3cd8a',
	};
</script>

<template>
    <div>
        <CartoonCountdown :widgetConfig="initWidgetConfig"></CartoonCountdown>
    </div>
</template>

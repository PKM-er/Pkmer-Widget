<script lang="ts" setup>
const initWidgetConfig = {
    "input-text": "今年结束",
    "date-picker": new Date(
        `${new Date().getFullYear()}/12/31 23:59`
    ).getTime(),
};
</script>

<template>
    <div>
        <SimpleCountdown :widgetConfig="initWidgetConfig"></SimpleCountdown>
    </div>
</template>

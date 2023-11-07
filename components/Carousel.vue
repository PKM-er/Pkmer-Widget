<script setup lang="ts">
import { ref } from "vue";
import { NCarousel, NInput } from "naive-ui";

const isEditing = ref(false);
const currentIndex = ref(0);
const currentUrl = ref("");

const imageList = ref<string[]>([]);

const handleInputImage = (e: any) => {
    isEditing.value = true;
    const index = e.target.dataset.index;
    currentIndex.value = index;
    currentUrl.value = imageList.value[index];
    console.log(imageList.value);
};

const handleInputBlur = (e: any) => {
    isEditing.value = false;
    imageList.value[currentIndex.value] = currentUrl.value;
    saveToLocal();
};

const handleInputEnter = (e: any) => {
    if (e.key === "Enter") {
        isEditing.value = false;
        imageList.value[currentIndex.value] = currentUrl.value;
        saveToLocal();
    }
};

const saveToLocal = () => {
    localStorage.setItem("Carousel", JSON.stringify(imageList.value));
};

const getFromLocal = () => {
    const defaultContent = [
        "https://images.unsplash.com/photo-1698933801470-3342e52cf191?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1699306113718-72fe0f9dfb2c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1698933801470-3342e52cf191?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1699306113718-72fe0f9dfb2c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
    ];
    const content = JSON.parse(
        localStorage.getItem("Carousel") || JSON.stringify(defaultContent)
    );
    imageList.value = content;
};

onMounted(() => {
    getFromLocal();
});
</script>

<template>
    <div>
        <n-carousel autoplay>
            <template v-for="(img, index) in imageList" :key="img">
                <img
                    :src="img"
                    class="carousel-img"
                    @dblclick="handleInputImage"
                    :data-index="index"
                />
            </template>
        </n-carousel>
        <div class="input-box">
            <n-input
                type="text"
                v-show="isEditing"
                v-model:value="currentUrl"
                @keyup="handleInputEnter"
                placeholder="请输入在线图片地址"
                @blur="handleInputBlur"
            ></n-input>
        </div>
    </div>
</template>

<style scoped>
.carousel-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
}

.input-box {
    position: absolute;
    top: 4em;
    left: 4em;
    width: 40%;
    margin: auto;
}
</style>

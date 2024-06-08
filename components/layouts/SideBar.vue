<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{
    isExpand: boolean
}>()

const route = useRoute()

const menuList = [
    {
        id: 1,
        icon: 'https://assets.quillbot.com/images/theme/commonImages/paraphraser-new.svg',
        color: 'rgb(73, 149, 87)',
        title: 'Paraphraser',
        path: '/manager',
    },
    {
        id: 2,
        icon: 'https://assets.quillbot.com/images/theme/commonImages/grammar-checker-new.svg',
        color: 'rgb(239, 65, 76)',
        title: 'Grammar Checker',
        path: '/grammar-checker',
    },
    {
        id: 8,
        icon: 'https://assets.quillbot.com/images/theme/light/aiDetector/ai-detector-old.svg',
        color: 'rgb(239, 65, 76)',
        title: 'AI Detector',
        path: '/ai-detector',
    },
    {
        id: 3,
        icon: 'https://assets.quillbot.com/images/theme/commonImages/plag-checker-new.svg',
        color: 'rgb(242, 124, 14)',
        title: 'Plagiarism Checker',
        path: '/plagiarism-checker',
    },
    {
        id: 5,
        icon: 'https://assets.quillbot.com/images/theme/commonImages/summarizer-new.svg',
        color: 'rgb(128, 81, 255)',
        title: 'Summerizer',
        path: '/summerizer',
    },

    
]
const menuToolList = [
    {
        id: 1,
        icon: 'https://assets.quillbot.com/images/theme/commonImages/chrome.png',
        title: 'QuillBot for Chrome',
        path: '/',
    },
    {
        id: 2,
        icon: 'https://assets.quillbot.com/emojis/solid_msword.svg',
        title: 'QuillBot for Word',
        path: '/',
    },
    {
        id: 3,
        icon: 'https://assets.quillbot.com/emojis/mac_new.svg',
        title: 'QuillBot for macOs',
        path: '/',
    },
]
</script>

<template>
    <div :class=" $style.sidebarContainer ">
        <div :class=" [$style.sidebarItemBorder, $style.sidebarItemBox] ">
            <div v-for="item in menuList" :key=" item.id ">
                <RouterLink :to=" item.path " :class=" [$style.sidebarItem, isExpand && $style.sidebarItemExpand] ">
                    <div :style=" { backgroundColor: item.color } " :class=" [
                        $style.sidebarBorderItem,
                        route.path === item.path && $style.sidebarActiveItem,
                    ] " />
                    <div v-if="item.id < 6" :class=" $style.sidebarItemIconBox " :style=" { backgroundColor: item.color } ">
                        <img :src=" item.icon " alt="" width="20" height="20">
                    </div>
                    <img v-else :src=" item.icon " alt="" width="24" height="24">
                    <p v-show=" isExpand " :class=" [
                        $style.sidebarItemTitle,
                        route.path === item.path && $style.sidebarActiveItem,
                    ] ">
                        {{ item.title }}
                    </p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style module lang="scss">
.sidebarContainer {
    width: fit-content;
    border-right: 1px solid #dee1e3;
    // transition: all 0.3s ease;
    overflow: hidden;
}

.sidebarBorderItem {
    opacity: 0;
    position: relative;
    height: 24px;
    left: 0;
    width: 4px;
    border-radius: 0px 4px 4px 0px;

    &.sidebarActiveItem {
        opacity: 1;
    }
}

.sidebarItemBox {
    padding: 8px 0;
}

.sidebarItem {
    display: flex;
    align-items: center;
    padding: 12px 12px;
    gap: 8px;
    width: 100%;
    text-decoration: none;
    cursor: pointer;

    &.sidebarItemExpand {
        width: 240px;
    }

    &:hover {
        background-color: #f5f5f5;
    }
}

.sidebarItemIconBox {
    border-radius: 50%;
    overflow: hidden;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-items: center;

    img {
        object-fit: contain;
        margin: auto;
        width: 14px;
        height: 14px;
    }
}

.sidebarItemIcon {
    object-fit: contain;
    margin: auto;
    width: 30px;
    height: 30px;
    margin: 0;
}

.sidebarItemTitle {
    font-size: 13px;
    width: 65%;
    letter-spacing: 0.3px;
    @include text-style(16px,500,24px,var(--color-gray-dark));

    &.sidebarActiveItem {
        font-weight: 600;
    }
}

.sidebarItemBoxIcon {
    width: 16px;
    height: 16px;
}
</style>
